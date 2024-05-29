import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { getMonthlySampleDetails } from '../../Service/MLTService';
import { getGeneralCatagories } from '../../Service/GeneralInventoryService';
import { useAuth } from "../../Context/useAuth";
import { useDebounce } from '../../Util/useDebounce';
import { Button, Dropdown } from 'flowbite-react';
import { MdClose } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { Pie, getElementAtEvent } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

function MLTDashboard() {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const [geoData, setGeoData] = useState([]);
    const [selectedArea, setSelectedArea] = useState(null);
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [generalCatagories, setGeneralCatagories] = useState([]);
    const [generalCategoryId, setGeneralCategoryId] = useState('');
    const [generalItems, setGeneralItems] = useState('');
    const [placeholderText, setPlaceholderText] = useState('MOH Area Name...');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchParameter, setSearchParameter] = useState('MOHAreaName');
    const [searchParameterType] = useState('string');
    const [pageNumber] = useState(1);
    const [pageSize] = useState(1000);

    const { user } = useAuth();
    const debouncedSearch = useDebounce(searchTerm);
    const chartRef = useRef();

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

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    useEffect(() => {
        const fetchSampleDetails = async () => {
            try {
                const response = await getMonthlySampleDetails(user.userId, searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, selectedYear, selectedMonth);
                if (response.data) {
                    setGeoData(await fetchGeoData(response.data.items));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchSampleDetails();
    }, [selectedMonth, selectedYear, debouncedSearch]);

    useEffect(() => {
        const fetchGeneralCategories = async () => {
            try {
                const response = await getGeneralCatagories(user.userId);
                if (response.data) {
                    setGeneralCatagories(response.data.items);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchGeneralCategories();
    }, []);

    const fetchGeneralCatagoryItems = async () => {
        try {
            const response = getGeneralInventoryItems(user.userId, generalCategoryId)
            if (response.data) {
                setGeneralItems(response.data.items);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onClick = (event) => {
        const element = getElementAtEvent(chartRef.current, event);
        if (element.length > 0) {
            const index = element[0].index;
            const categoryID = generalCatagories[index].generalCategoryID;
            console.log(`Category ID: ${categoryID}`);
            // You can use the categoryID for any further actions you need
        }
      }

    const pieData = {
        labels: generalCatagories.map((category) => category.generalCategoryName),
        datasets: [
            {
                label: 'General Inventory',
                data: generalCatagories.map((category) => category.itemCount),
                backgroundColor: generalCatagories.map(() => getRandomColor())
            },
        ]
    };

    const fetchGeoData = async (areas) => {
        const geoDataPromises = areas.map(async (area) => {
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

    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    return (
        <>
            <div className="flex flex-col md:flex-col items-start justify-between">
                <div className="flex flex-col md:flex-col items-start justify-between">
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
                                        setSearchParameter('MOHAreaName');
                                        setPlaceholderText('MOH Area Name...');
                                    }}
                                >
                                    MOH Area Name
                                </Dropdown.Item>
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
                                        {month}
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
                    <div className="w-[500px] h-[700px] p-2">
                        <LoadScript googleMapsApiKey="AIzaSyAxV9mcy6QyakU_DYa59Ps4I-5bbHe3QBg">
                            <GoogleMap
                                mapContainerStyle={{
                                    width: '400px',
                                    height: '500px',
                                }}
                                center={center}
                                zoom={8}
                                options={{
                                    restriction: {
                                        latLngBounds: sriLankaBounds,
                                        strictBounds: false,
                                    },
                                }}
                            >
                                {geoData.map((area) => (
                                    <Marker
                                        key={area.phiAreaId}
                                        title={area.phiAreaName}
                                        position={{ lat: area.lat, lng: area.lon }}
                                        onClick={() => setSelectedArea(area)}
                                        icon={{
                                            path: window.google.maps.SymbolPath.CIRCLE, // Use any symbol path you want
                                            scale: 8, // Adjust the size of the marker
                                            fillColor: area.sampleCount > 0 ? 'darkgreen' : 'blue', // Change the color of the marker
                                            fillOpacity: 1, // Adjust the opacity of the marker color
                                            strokeColor: 'black', // Change the color of the marker border
                                            strokeWeight: 0.5, // Adjust the thickness of the marker border
                                        }}
                                    />
                                ))}

                                {selectedArea && (
                                    <InfoWindow
                                        position={{ lat: selectedArea.lat, lng: selectedArea.lon }}
                                        onCloseClick={() => setSelectedArea(null)}
                                    >
                                        <div>
                                            <h2>{selectedArea.phiAreaName}</h2>
                                            <p>MOH Area: {selectedArea.mohAreaName}</p>
                                            <p>Pending Sample Count: {selectedArea.pendingSampleCount}</p>
                                            <p>Accepted Sample Count: {selectedArea.acceptedSampleCount}</p>
                                            <p>Rejected Sample Count: {selectedArea.rejectedSampleCount}</p>
                                        </div>
                                    </InfoWindow>
                                )}
                            </GoogleMap>
                        </LoadScript>
                    </div>
                </div>

                <div>
                    <Pie data={pieData}
                        ref={chartRef}
                        onClick={onClick}
                    />
                </div>
            </div>
        </>
    );
}

export default MLTDashboard;
