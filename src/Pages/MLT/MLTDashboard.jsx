import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';

const containerStyle = {
    width: '100%',
    height: '600px',
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

const areas = [
    {
        name: 'Badulla',
        details: {
            sampleCount: 50,
            accepted: 40,
            rejected: 5,
            pending: 5,
        },
    },
    {
        name: 'Bandarawela',
        details: {
            sampleCount: 30,
            accepted: 25,
            rejected: 3,
            pending: 2,
        },
    },
    {
        name: 'kailagoda',
        details: {
            sampleCount: 30,
            accepted: 25,
            rejected: 3,
            pending: 2,
        },
    },
];

function MLTDashboard() {
    const [geoData, setGeoData] = useState([]);
    const [selectedArea, setSelectedArea] = useState(null);

    useEffect(() => {
        const fetchGeoData = async () => {
            const geoDataPromises = areas.map(async (area) => {
                const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
                    params: {
                        q: area.name,
                        format: 'json',
                        countrycodes: 'LK', // Limit to Sri Lanka
                        limit: 1,
                    },
                });
                const { lat, lon } = response.data[0];
                return {
                    ...area,
                    lat: parseFloat(lat),
                    lon: parseFloat(lon),
                };
            });

            const results = await Promise.all(geoDataPromises);
            setGeoData(results);
        };

        fetchGeoData();
    }, []);

    return (
        <>
            <div className="w-[450px] h-[800px]">
                <LoadScript googleMapsApiKey="AIzaSyAxV9mcy6QyakU_DYa59Ps4I-5bbHe3QBg">
                    <GoogleMap
                        mapContainerStyle={containerStyle}
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
                                key={area.name}
                                position={{ lat: area.lat, lng: area.lon }}
                                onClick={() => setSelectedArea(area)}
                            />
                        ))}

                        {selectedArea && (
                            <InfoWindow
                                position={{ lat: selectedArea.lat, lng: selectedArea.lon }}
                                onCloseClick={() => setSelectedArea(null)}
                            >
                                <div>
                                    <h2>{selectedArea.name}</h2>
                                    <p>Sample Count: {selectedArea.details.sampleCount}</p>
                                    <p>Accepted: {selectedArea.details.accepted}</p>
                                    <p>Rejected: {selectedArea.details.rejected}</p>
                                    <p>Pending: {selectedArea.details.pending}</p>
                                </div>
                            </InfoWindow>
                        )}
                    </GoogleMap>
                </LoadScript>
            </div>
        </>
    );
}

export default MLTDashboard;
