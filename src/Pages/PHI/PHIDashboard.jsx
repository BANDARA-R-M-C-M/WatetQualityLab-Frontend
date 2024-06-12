import React, { useState, useEffect } from 'react';
import { getSampleCount } from '../../Service/PHIService';
import { useAuth } from '../../Context/useAuth';
import { useDebounce } from '../../Util/useDebounce';
import { Card, Dropdown, Button } from "flowbite-react";
import { FaCheckCircle } from "react-icons/fa";
import { BsFillXCircleFill } from "react-icons/bs";
import { AiFillClockCircle } from "react-icons/ai";
import { RiDiscountPercentFill } from "react-icons/ri";
import { TbSum } from "react-icons/tb";

function PHIDashboard() {

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [sampleCount, setSampleCount] = useState([]);
    const [totalSampleCount, setTotalSampleCount] = useState(0);
    const [placeholderText, setPlaceholderText] = useState('Year...');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchParameter, setSearchParameter] = useState('Year');
    const [searchParameterType, setSearchParameterType] = useState('DateTime3');
    const [sortBy, setSortBy] = useState('ItemName');
    const [isAscending, setIsAscending] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);

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

    useEffect(() => {
        const fetchSampleCount = async () => {
            const response = await getSampleCount(user.userId, selectedYear, selectedMonth, token);
            setSampleCount(response.data.sampleCounts);
            setTotalSampleCount(response.data.totalSampleCount);
        }
        fetchSampleCount();
    }, [debouncedSearch, debouncedSearch, selectedYear, selectedMonth]);

    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    return (
        <>
            <div>
                <h1 className="text-3xl font-semibold text-center w-full">Sample Count Summary</h1>
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className='flex flex-col md:flex-row justify-end w-full'>
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
                <div className="flex flex-wrap justify-around p-5">
                    {sampleCount.length === 0 ? (
                        <Card className="w-80 p-5 m-5 text-center">
                            <p>No Data Available</p>
                        </Card>
                    ) : (
                        sampleCount.map((sample, index) => (
                            <div key={index} className="w-full md:w-full lg:w-full p-5 m-5">
                                <p className="text-xl font-semibold mb-3 text-center">{sample.phiAreaName}  </p>
                                <div className="flex flex-col md:flex-row justify-around">
                                    <Card className="flex flex-col items-center p-4 m-2 w-full md:w-1/3">
                                        <div className="flex items-center">
                                            <FaCheckCircle className="text-green-500 text-2xl mr-7" size={65} />
                                            <div className="text-center">
                                                <p className="text-xl font-semibold">Accepted</p>
                                                <p className="text-xl">{sample.acceptedsamples}</p>
                                            </div>
                                        </div>
                                    </Card>
                                    <Card className="flex flex-col items-center p-4 m-2 w-full md:w-1/3">
                                        <div className="flex items-center">
                                            <BsFillXCircleFill className="text-red-500 text-2xl mr-7" size={65} />
                                            <div className="text-center">
                                                <p className="text-xl font-semibold">Rejected</p>
                                                <p className="text-xl">{sample.rejectedsamples}</p>
                                            </div>
                                        </div>
                                    </Card>
                                    <Card className="flex flex-col items-center p-4 m-2 w-full md:w-1/3">
                                        <div className="flex items-center">
                                            <AiFillClockCircle className="text-2xl mr-7" size={65} />
                                            <div className="text-center">
                                                <p className="text-xl font-semibold">Pending</p>
                                                <p className="text-xl">{sample.pendingsamples}</p>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                                <div className="flex flex-col md:flex-row justify-around">
                                    <Card className="flex flex-col items-center p-4 m-2 w-full md:w-1/2">
                                        <div className="flex items-center">
                                            <RiDiscountPercentFill className="text-blue-500 text-2xl mr-7" size={75} />
                                            <div className="text-center">
                                                <p className="text-xl font-semibold mb-3 text-center"> Acceptance Rate</p>
                                                <p className="text-lg">{((sample.acceptedsamples / sample.totalsamples) * 100).toFixed(2)}%</p>
                                            </div>
                                        </div>
                                    </Card>
                                    <Card className="flex flex-col items-center p-4 m-2 w-full md:w-1/2">
                                        <div className="flex items-center">
                                            <TbSum className=" text-2xl mr-7" size={75} />
                                            <div className="text-center">
                                                <p className="text-xl font-semibold mb-3 text-center">Total Samples</p>
                                                <p className="text-lg">{sample.totalsamples}</p>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}

export default PHIDashboard