import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { getContaminationDetails } from '../Service/MOHService';
import { useAuth } from "../Context/useAuth";
import { useDebounce } from '../Util/useDebounce';
import { Button, Dropdown } from 'flowbite-react';
import { MdClose } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

function MapComponentMOH() {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const [geoData, setGeoData] = useState([]);
    const [selectedArea, setSelectedArea] = useState(null);
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [placeholderText, setPlaceholderText] = useState('PHI Area Name...');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchParameter, setSearchParameter] = useState('PHIAreaName');
    const [searchParameterType] = useState('string');
    const [pageNumber] = useState(1);
    const [pageSize] = useState(1000);

    const { user, token } = useAuth();
    const debouncedSearch = useDebounce(searchTerm);

    const monthNames = {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December"
    };

    const center = {
        lat: 7.8731,
        lng: 80.7718,
    };

    const sriLankaBounds = {
        north: 9.8311,
        south: 5.8816,
        west: 79.6525,
        east: 81.8783,
    };

    useEffect(() => {
        const fetchSampleDetails = async () => {
            try {
                const response = await getContaminationDetails(user.userId, searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, selectedYear, selectedMonth, token);
                if (response.data) {
                    setGeoData(await fetchGeoData(response.data.items));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchSampleDetails();
    }, [selectedMonth, selectedYear, debouncedSearch]);

    const fetchGeoData = async (phiAreas) => {
        const geoDataPromises = phiAreas.map(async (area) => {
            const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
                params: {
                    q: area.phiAreaName,
                    format: 'json',
                    countrycodes: 'LK',
                    limit: 1,
                },
            });

            if (response.data && response.data[0]) {
                const { lat, lon } = response.data[0];
                return {
                    ...area,
                    lat: parseFloat(lat),
                    lon: parseFloat(lon),
                };
            } else {
                return {
                    ...area,
                    lat: null,
                    lon: null,
                };
            }
        });

        const results = await Promise.all(geoDataPromises);
        return results.filter(area => area.lat && area.lon);
    };

    const getMarkerColor = (area) => {
        if (!area.reportAvailableForMonth) {
            return 'grey';
        }
        return area.contaminationDetails.some(detail => detail.contaminated) ? 'red' : 'green';
    };

    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    return (
        <>
            <div className="flex flex-col md:flex-col items-start justify-between">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="flex items-center justify-between">
                        <div className="flex bg-gray-200 items-center p-1 rounded-md">
                            <FaSearch className="mx-2 h-6 w-6 text-gray-400" />
                            <input
                                className="bg-gray-200 border-none ml-1 block focus:ring focus:ring-gray-200"
                                type="text"
                                placeholder={placeholderText}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {searchTerm && (
                                <MdClose
                                    className="ml-2 h-6 w-6 text-gray-400 cursor-pointer"
                                    onClick={() => setSearchTerm('')}
                                />
                            )}
                        </div>
                        <div className="flex items-center p-2 rounded-md">
                            <Dropdown label="Find">
                                <Dropdown.Item
                                    onClick={() => {
                                        setSearchParameter('PHIAreaName');
                                        setPlaceholderText('PHI Area Name...');
                                    }}
                                >
                                    PHI Area Name
                                </Dropdown.Item>
                            </Dropdown>
                        </div>
                    </div>
                    <div className='flex items-center justify-between'>
                        <div className='pr-2'>
                            <Dropdown label="Year">
                                {years.map((year) => (
                                    <Dropdown.Item key={year} onClick={() => setSelectedYear(year)}>
                                        {year}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown>
                        </div>
                        <div className='pr-2'>
                            <Dropdown label="Month" disabled={!selectedYear}>
                                {months.map((month) => (
                                    <Dropdown.Item key={month} onClick={() => setSelectedMonth(month)}>
                                        {monthNames[month]}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown>
                        </div>
                        <Button color="failure"
                            onClick={() => {
                                setSelectedYear(currentYear);
                                setSelectedMonth(currentMonth);
                                setSearchTerm('');
                            }}>
                            Reset
                        </Button>
                    </div>
                </div>
                <div className="w-full h-[700px] p-2">
                    <GoogleMap
                        mapContainerStyle={{
                            width: '100%',
                            height: '100%',
                        }}
                        center={center}
                        zoom={8}
                        options={{
                            restriction: {
                                latLngBounds: sriLankaBounds,
                                strictBounds: false,
                            },
                            minZoom: 8,
                            maxZoom: 11,
                        }}
                    >
                        {geoData.map((area) => (
                            <Marker
                                key={area.phiAreaID}
                                title={area.phiAreaName}
                                position={{ lat: area.lat, lng: area.lon }}
                                onClick={() => setSelectedArea(area)}
                                icon={{
                                    path: window.google.maps.SymbolPath.CIRCLE,
                                    scale: 8,
                                    fillColor: getMarkerColor(area),
                                    fillOpacity: 1,
                                    strokeColor: 'black',
                                    strokeWeight: 0.5,
                                }}
                            />
                        ))}

                        {selectedArea && (
                            <InfoWindow
                                position={{ lat: selectedArea.lat, lng: selectedArea.lon }}
                                onCloseClick={() => setSelectedArea(null)}
                            >
                                <div className="p-2 font-sans text-gray-800">
                                    <h2 className="text-lg text-center mb-2 text-blue-600 font-bold">{selectedArea.phiAreaName}</h2>
                                    <p className="my-1"><span className="font-bold">MOH Area:</span> <span className="font-bold text-gray-600">{selectedArea.mohAreaName}</span></p>
                                    <p className="my-1"><span className="font-bold">Contamination Details:</span></p>
                                    <ul className="list-disc pl-5">
                                        {selectedArea.contaminationDetails.length > 0 ? (
                                            selectedArea.contaminationDetails.map((detail, index) => (
                                                <li key={index}>
                                                    {detail.contaminated ? <span className="text-red-600 font-bold">Contaminated</span> :
                                                        <span className="text-green-500 font-bold">Not Contaminated</span>}
                                                </li>
                                            ))
                                        ) : (
                                            <li className="text-gray-500 font-bold">No contamination data available</li>
                                        )}
                                    </ul>
                                    <p className="my-1">
                                        <span className="font-bold">
                                            Report for {selectedMonth}/{selectedYear}:</span> {selectedArea.reportAvailableForMonth ? <span className="text-blue-600 font-bold">Available</span> :
                                                                                                                                      <span className="text-blue-600 font-bold">Not Available</span>}</p>
                                </div>
                            </InfoWindow>
                        )}
                    </GoogleMap>
                </div>
            </div>
        </>
    );
};

export default MapComponentMOH;
