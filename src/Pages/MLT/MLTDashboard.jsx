import React, { useState, useEffect } from 'react';
import { useAuth } from "../../Context/useAuth";
import { getNewSamples, updateStatus } from "../../Service/MLTService";
import { Button, Modal } from 'flowbite-react';

function MLTDashboard() {
    const [samples, setSamples] = useState([]);
    const [comment, setComment] = useState('');
    const [rejectedId, setRejectedId] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        const fetchSamples = async () => {
            try {
                const response = await getNewSamples(user.userId);
                if (response) {
                    const pendingSamples = response.data.filter(sample => sample.acceptance === 'Pending');
                    setSamples(pendingSamples);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchSamples();
    }, []);

    const handleAccept = async (sampleId) => {
        try {
            await updateStatus(sampleId, 'Accepted', comment);
            const updatedSamples = samples.filter(sample => sample.sampleId !== sampleId);
        setSamples(updatedSamples);
        } catch (error) {
            console.error('Error accepting sample:', error);
        }
    };

    // const handleReject = async (sampleId) => {
    //     try {
    //         await updateStatus(sampleId, 'Rejected', );
    //         const updatedSamples = samples.filter(sample => sample.sampleId !== sampleId);
    //         setSamples(updatedSamples);
    //     } catch (error) {
    //         console.error('Error rejecting sample:', error);
    //     }
    // };

    const handleReject = async () => {
        try {
            await updateStatus(rejectedId, 'Rejected', comment);
            const updatedSamples = samples.filter(sample => sample.sampleId !== rejectedId);
            setSamples(updatedSamples);
            setOpenModal(false);
        } catch (error) {
            console.error('Error rejecting sample:', error);
        }
    };

    return (
        <>
        <div className="bg-white rounded-md w-full">
            <div className="flex items-center justify-between pb-6">
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
                </div>
            </div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Sample Id
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Date of Collection
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Phi_Area
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Catagory of Source
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Collecting Source
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    State of Chlorination
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Acceptance
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {samples.map((sample, index) => (
                                <tr key={index}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <div className="flex items-center">
                                            <div className="ml-3">
                                                <p className="text-gray-900 whitespace-no-wrap">{sample.sampleId}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{sample.dateOfCollection}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{sample.phi_Area}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{sample.catagoryOfSource}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{sample.collectingSource}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{sample.stateOfChlorination}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                            <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                            <span className="relative">{sample.acceptance}</span>
                                        </span>
                                    </td>
                                    <td className="pl-7 py-5 border-b border-gray-200 bg-white text-sm ">
                                        <Button onClick = {() => handleAccept(sample.sampleId)}
                                        color="success">accept</Button>
                                    </td>
                                    <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
                                        <Button onClick={() => (setOpenModal(true), setRejectedId(sample.sampleId))}
                                        color="failure">reject</Button>

                                        <Modal show={openModal} onClose={() => setOpenModal(false)}>
                                            <div className="p-4">
                                            <Modal.Header>Add Comment</Modal.Header>
                                                <Modal.Body>
                                                    <form onSubmit={handleReject}>
                                                    <div className="mb-4">
                                                            <label htmlFor="rejectedReason" className="block text-gray-700 text-sm font-bold mb-2">
                                                                Reason for Rejection
                                                            </label>
                                                            <input
                                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                                name="rejectedReason" id="rejectedReason" type="text" placeholder="Reason for Rejection"
                                                                value={comment} onChange={(e) => setComment(e.target.value)} required />
                                                        </div>

                                                        <Button type='submit' color='failure'>Reject</Button>
                                                    </form>
                                                </Modal.Body>
                                            </div>
                                        </Modal>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
    );
}

export default MLTDashboard