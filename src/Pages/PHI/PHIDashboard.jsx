import React, { useState, useEffect } from 'react';
import { submitSample } from '../../Service/PHIService';
import { useAuth } from '../../Context/useAuth';

function PHIDashboard() {

    const [sampleId, setSampleId] = useState('');
    const [dateOfCollection, setDateOfCollection] = useState('');
    const [phiAreaOptions, setPhiAreaOptions] = useState([]);
    const [selectedPhiArea, setSelectedPhiArea] = useState('');
    const [catagoryOfSource, setCatagoryOfSource] = useState('');
    const [collectingSource, setCollectingSource] = useState('');
    const [stateOfChlorination, setStateOfChlorination] = useState('');

    const { user } = useAuth();

    // useEffect(() => {
    //     const fetchPhiAreas = async () => {
    //         try {
    //             const response = await getPHIs();
    //             setPhiAreaOptions(response.data);
    //             console.log(response.data);
    //         } catch (error) {
    //             console.error('Error fetching Phi_Areas:', error);
    //         }
    //     };

    //     fetchPhiAreas();
    // }, []);

    const handleSubmit = async (event) => {
        // event.preventDefault();

        // if(await submitSample(sampleId, dateOfCollection, catagoryOfSource, collectingSource, stateOfChlorination, user.userId, selectedPhiArea.phiAreaID, selectedPhiArea.phiArea_name)){
        //     alert('Sample added successfully');
        // } else {
        //     alert('Failed to add sample');
        // }
        
        // setSampleId('');
        // setDateOfCollection('');
        // setCatagoryOfSource('');
        // setCollectingSource('');
        // setStateOfChlorination('');
        // setSelectedPhiArea('');
    };

    return (
        <>
            <div className="flex items-center justify-center">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h1 className="block text-gray-700 font-bold mb-2 text-xl text-center">Add Sample</h1>

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
                        <button type="submit"
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default PHIDashboard