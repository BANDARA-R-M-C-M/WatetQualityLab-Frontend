import React from 'react';
import { FaFlask, FaHeartbeat, FaMicroscope } from 'react-icons/fa';

function Services() {
    return (
        <>
            <section id="services" className="bg-gray-100 text-center py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-gray-800">Our Services</h2>
                    <div className="mt-10 flex flex-wrap justify-center">
                        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-8">
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <FaFlask className="text-blue-600 text-4xl mb-4 mx-auto" />
                                <h3 className="text-2xl font-semibold mb-2">Water Quality Testing</h3>
                                <p className="text-gray-700">We provide comprehensive water quality testing services to ensure your water meets all safety and quality standards.</p>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-8">
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <FaHeartbeat className="text-blue-600 text-4xl mb-4 mx-auto" />
                                <h3 className="text-2xl font-semibold mb-2">Report Generation</h3>
                                <p className="text-gray-700">Our detailed reports provide clear and concise information on the quality of your water, helping you make informed decisions.</p>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-8">
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <FaMicroscope className="text-blue-600 text-4xl mb-4 mx-auto" />
                                <h3 className="text-2xl font-semibold mb-2">Research Services</h3>
                                <p className="text-gray-700">Advanced research services for innovative health solutions.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Services;
