import React, { useState, useEffect } from 'react';
import { Button, Modal } from "flowbite-react";
import { getPHIDetails, submitSample } from '../../Service/PHIService';
import { useAuth } from '../../Context/useAuth';

function Samples() {

    const [sampleId, setSampleId] = useState('');
    const [dateOfCollection, setDateOfCollection] = useState('');
    const [phiAreaId, setPhiAreaId] = useState('');
    const [phiAreaName, setPhiAreaName] = useState('');
    const [catagoryOfSource, setCatagoryOfSource] = useState('');
    const [collectingSource, setCollectingSource] = useState('');
    const [stateOfChlorination, setStateOfChlorination] = useState('');
    const [openModal, setOpenModal] = useState(false);

    const { user } = useAuth();

    useEffect(() => {
        getPHIDetails(user.userId).then((response) => {
            setPhiAreaId(response.data.phiAreaId);
            setPhiAreaName(response.data.phiAreaName);
        });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (await submitSample(sampleId, dateOfCollection, catagoryOfSource, collectingSource, stateOfChlorination, user.userId, phiAreaId, phiAreaName)) {
            alert('Sample added successfully');
        } else {
            alert('Failed to add sample');
        }

        setSampleId('');
        setDateOfCollection('');
        setCatagoryOfSource('');
        setCollectingSource('');
        setStateOfChlorination('');

        setOpenModal(false);
    };

    return (
        <>
            <div className="bg-white rounded-md w-full">
                <div>
                    <div className="flex items-center justify-between">
                        <div className="flex bg-gray-50 items-center p-2 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fillRule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clipRule="evenodd" />
                            </svg>
                            <input className="bg-gray-50 outline-none ml-1 block " type="text" name="" id="" placeholder="search..." />
                        </div>
                        <Button
                            onClick={() => { setOpenModal(true) }}
                        >Add Sample
                        </Button>
                        <Modal show={openModal} onClose={() => setOpenModal(false)}>
                            <Modal.Header>Add Sample</Modal.Header>
                            <Modal.Body>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="sampleId" className="block text-gray-700 text-sm font-bold mb-2">
                                            Sample ID
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            name="sampleId" id="sampleId" type="text" placeholder="Sample ID"
                                            value={sampleId} onChange={(e) => setSampleId(e.target.value)} required />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="dateOfCollection" className="block text-gray-700 text-sm font-bold mb-2">
                                            Date of Collection
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            name="dateOfCollection" id="dateOfCollection" type="date" placeholder="Date of Collection"
                                            value={dateOfCollection} onChange={(e) => setDateOfCollection(e.target.value)} required />
                                    </div>

                                    {/* <div className="mb-4">
                                        <label htmlFor="phiArea" className="block text-gray-700 text-sm font-bold mb-2">
                                            Phi Area
                                        </label>
                                        <select
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            name="phiArea" id="phiArea"
                                            onChange={(e) => setSelectedPhiArea(phiAreaOptions.find(phiArea => phiArea.phiAreaID === e.target.value))} required >
                                            <option value="">Select Phi Area</option>
                                            {phiAreaOptions.map((phiArea) => (
                                                <option key={phiArea.phiAreaID} value={phiArea.phiAreaID}>
                                                    {phiArea.phiArea_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div> */}

                                    <div className="mb-4">
                                        <label htmlFor="catagoryOfSource" className="block text-gray-700 text-sm font-bold mb-2">
                                            Category of Source
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            name="catagoryOfSource" id="catagoryOfSource" type="text" placeholder="Category of Source"
                                            value={catagoryOfSource} onChange={(e) => setCatagoryOfSource(e.target.value)} required />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="collectingSource" className="block text-gray-700 text-sm font-bold mb-2">
                                            Collecting Source
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            name="collectingSource" id="collectingSource" type="text" placeholder="Collecting Source"
                                            value={collectingSource} onChange={(e) => setCollectingSource(e.target.value)} required />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="stateOfChlorination" className="block text-gray-700 text-sm font-bold mb-2">
                                            State of Chlorination
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            name="stateOfChlorination" id="stateOfChlorination" type="text" placeholder="State of Chlorination"
                                            value={stateOfChlorination} onChange={(e) => setStateOfChlorination(e.target.value)} required />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <Button type="submit">Submit</Button>
                                    </div>
                                </form>
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">

                    </div>
                </div>
            </div>
        </>
    );
}

export default Samples