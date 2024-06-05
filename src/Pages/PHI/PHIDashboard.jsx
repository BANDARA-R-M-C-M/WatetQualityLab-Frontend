import React, { useState, useEffect } from 'react';
import { getSampleCount } from '../../Service/PHIService';
import { useAuth } from '../../Context/useAuth';
import { Card } from "flowbite-react";
import { FaCheckCircle } from "react-icons/fa";
import { BsFillXCircleFill } from "react-icons/bs";
import { AiFillClockCircle } from "react-icons/ai";
import { RiDiscountPercentFill } from "react-icons/ri";
import { TbSum } from "react-icons/tb";

function PHIDashboard() {

    const [sampleCount, setSampleCount] = useState([]);
    const [totalSampleCount, setTotalSampleCount] = useState(0);

    const { user, token } = useAuth();

    useEffect(() => {
        const fetchSampleCount = async () => {
            const response = await getSampleCount(user.userId, token);
            setSampleCount(response.data.sampleCounts);
            setTotalSampleCount(response.data.totalSampleCount);
        }
        fetchSampleCount();
    }, []);

    return (
        <>
            <h1 className="text-3xl font-semibold text-center w-full">Sample Count Summary</h1>
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
        </>
    );
}

export default PHIDashboard