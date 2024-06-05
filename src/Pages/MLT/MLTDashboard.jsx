import React, { useState, useEffect, useRef } from 'react';
import { getGeneralCatagories, getGeneralInventoryItems } from '../../Service/GeneralInventoryService';
import { getSurgicalCatagories, getSurgicalInventoryItems } from '../../Service/SurgicalInventoryService';
import { useAuth } from "../../Context/useAuth";
import { Pie, Bar, getElementAtEvent } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import MapComponent from '../../Components/MapComponentMLT';

function MLTDashboard() {
    const [generalCatagories, setGeneralCatagories] = useState([]);
    const [generalInventoryItems, setGeneralInventoryItems] = useState([]);
    const [surgicalCatagories, setSurgicalCatagories] = useState([]);
    const [surgicalInventoryItems, setSurgicalInventoryItems] = useState([]);
    const [pageNumber] = useState(1);
    const [pageSize] = useState(1000);

    const { user, token } = useAuth();
    const chartGeneralRef = useRef();
    const chartSurgicalRef = useRef();

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    useEffect(() => {
        const fetchGeneralCategories = async () => {
            try {
                const response = await getGeneralCatagories(user.userId, null, null, null, pageNumber, pageSize, null, null, token);
                if (response.data) {
                    setGeneralCatagories(response.data.items);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchGeneralCategories();
    }, []);

    const fetchGeneralCatagoryItems = async (mltId, generalCategoryId) => {
        try {
            const response = await getGeneralInventoryItems(mltId, generalCategoryId, null, null, null, pageNumber, pageSize, null, null, token);
            if (response.data) {
                setGeneralInventoryItems(response.data.items);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchSurgicalCategories = async () => {
            try {
                const response = await getSurgicalCatagories(user.userId, null, null, null, pageNumber, pageSize, null, null, token);
                if (response.data) {
                    setSurgicalCatagories(response.data.items);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchSurgicalCategories();
    }, []);

    const fetchSurgicalCatagoryItems = async (mltId, surgicalCategoryId) => {
        try {
            const response = await getSurgicalInventoryItems(mltId, surgicalCategoryId, null, null, null, pageNumber, pageSize, null, null, token);
            if (response.data) {
                setSurgicalInventoryItems(response.data.items);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onSliceClick = (event) => {
        const element = getElementAtEvent(chartGeneralRef.current, event);
        if (element.length > 0) {
            const index = element[0].index;
            const categoryID = generalCatagories[index].generalCategoryID;
            fetchGeneralCatagoryItems(user.userId, categoryID);
        }
    }

    const onSliceClick2 = (event) => {
        const element = getElementAtEvent(chartSurgicalRef.current, event);
        if (element.length > 0) {
            const index = element[0].index;
            const categoryID = surgicalCatagories[index].surgicalCategoryID;
            fetchSurgicalCatagoryItems(user.userId, categoryID);
        }
    }

    const pieData = {
        labels: generalCatagories.map((category) => category.generalCategoryName),
        datasets: [
            {
                label: 'Items',
                data: generalCatagories.map((category) => category.itemCount),
                backgroundColor: generalCatagories.map(() => getRandomColor())
            },
        ]
    };

    const pieData2 = {
        labels: surgicalCatagories.map((category) => category.surgicalCategoryName),
        datasets: [
            {
                label: 'Items',
                data: surgicalCatagories.map((category) => category.itemCount),
                backgroundColor: surgicalCatagories.map(() => getRandomColor())
            },
        ]
    };

    const barChartData = {
        labels: surgicalInventoryItems ? surgicalInventoryItems.map(item => item.itemName) : [],
        datasets: [
            {
                label: 'Quantity',
                data: surgicalInventoryItems ? surgicalInventoryItems.map(item => item.quantity) : [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <>
            <MapComponent />
            <div className="flex flex-col md:flex-col mt-20 items-start justify-between">
                <div className="flex flex-col md:flex-row w-full">
                    <div className="md:w-1/2 p-2">
                        <h2 className="text-xl font-bold mb-2 text-center">General Inventory Categories</h2>
                        <Pie data={pieData}
                            ref={chartGeneralRef}
                            onClick={onSliceClick}
                        />
                    </div>
                    {generalInventoryItems.length > 0 && <div className="md:w-1/2 p-2">
                        <h2 className="text-xl font-bold mb-2">General Inventory Items</h2>
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="py-2">Item Name</th>
                                    <th className="py-2">Issued Date</th>
                                    <th className="py-2">Duration (days)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {generalInventoryItems.map(item => (
                                    <tr key={item.generalInventoryID} className="bg-gray-100 border-b">
                                        <td className="py-2 px-4">{item.itemName}</td>
                                        <td className="py-2 px-4">{item.issuedDate}</td>
                                        <td className="py-2 px-4">{item.durationOfInventory}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>}
                </div>

                <div className="flex flex-col mt-20 md:flex-row w-full">
                    <div className="md:w-1/2 p-2">
                        <h2 className="text-xl font-bold mb-2 text-center">Surgical Inventory Categories</h2>
                        <Pie data={pieData2}
                            ref={chartSurgicalRef}
                            onClick={onSliceClick2}
                        />
                    </div>
                    <div className="md:w-1/2 p-2">
                        <h2 className="text-xl font-bold mb-2">Surgical Inventory Items</h2>
                        {surgicalInventoryItems.length > 0 && (
                            <Bar
                                data={barChartData}
                                options={{
                                    scales: {
                                        x: {
                                            beginAtZero: true,
                                        },
                                        y: {
                                            beginAtZero: true,
                                        },
                                    },
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default MLTDashboard;