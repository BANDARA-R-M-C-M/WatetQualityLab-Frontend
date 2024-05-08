import { useState, useEffect } from 'react';
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { getPHIAreas, addPHIArea, getMOHAreas, updatePHIAreas, deletePHIArea } from "../../Service/AdminService";

function PHIAreas() {

    const [phiAreas, setPHIAreas] = useState([]);
    const [mohAreas, setMohAreas] = useState([]);
    const [phiAreaName, setPhiAreaName] = useState('');
    const [mohAreaId, setMohAreaId] = useState('');
    const [updatedId, setUpdatedId] = useState(null);
    const [deletedId, setDeletedId] = useState(null);
    const [openNewModal, setOpenNewModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    useEffect(() => {
        const fetchPHIAreas = async () => {
            const response = await getPHIAreas();
            if (response) {
                setPHIAreas(response.data);
            } else {
                console.log("Error fetching PHI Areas");
            }
        }
        fetchPHIAreas();
    }, [openNewModal, openEditModal, openDeleteModal]);

    useEffect(() => {
        const fetchMOHAreas = async () => {
            const response = await getMOHAreas();
            if (response) {
                setMohAreas(response.data);
            } else {
                console.log("Error fetching PHI Area");
            }
        }
        fetchMOHAreas();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addPHIArea(phiAreaName, mohAreaId);
            alert('PHI Area added successfully');
        } catch (error) {
            console.error('Error adding PHI Area:', error);
            alert('Failed to add PHI Area');
        }

        setPhiAreaName('');
        setMohAreaId('');

        setOpenNewModal(false);
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (await updatePHIAreas(updatedId, phiAreaName, mohAreaId)) {
            alert('PHI Area updated successfully');
        } else {
            alert('Failed to update PHI Area');
        }

        setPhiAreaName('');
        setMohAreaId('');

        setOpenEditModal(false);
    }

    const handleDelete = async (deletedId) => {
        try {
            await deletePHIArea(deletedId);
            alert('PHI Area deleted successfully');
        } catch (error) {
            console.error('Error deleting sample:', error);
            alert('Failed to delete PHI Area');
        }

        setOpenDeleteModal(false);
    }

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
                            onClick={() => { setOpenNewModal(true) }}
                        >Add PHI Area
                        </Button>
                    </div>
                </div>

                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        PHI Area ID
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        PHI Area Name
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Assigned MOH Area
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {phiAreas.map((phiArea, index) => (
                                    <tr key={index}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{phiArea.phiAreaId}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{phiArea.phiAreaName}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{phiArea.mohAreaId}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <Button
                                                onClick={() => {
                                                    setOpenEditModal(true);
                                                    setUpdatedId(phiArea.phiAreaId);
                                                    setPhiAreaName(phiArea.phiAreaName);
                                                    setMohAreaId(phiArea.mohAreaId);
                                                }}
                                            >Edit
                                            </Button>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <Button
                                                onClick={() => { setOpenDeleteModal(true), setDeletedId(phiArea.phiAreaId) }}
                                            >Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal show={openNewModal} onClose={() => {
                setOpenNewModal(false);
                setPhiAreaName('');
                setMohAreaId('');
            }}>
                <Modal.Header>Add Lab</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="phiAreaName" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Phi Area Name
                            </label>
                            <input type="text" name="phiAreaName" id="phiAreaName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={phiAreaName} onChange={(e) => setPhiAreaName(e.target.value)} required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="mohAreaId" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                MOH Area
                            </label>
                            <select
                                id="mohAreaId"
                                name="mohAreaId"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={mohAreaId}
                                onChange={(e) => setMohAreaId(e.target.value)}
                                required
                            >
                                <option value="">Select MOH Area</option>
                                {mohAreas.map((mohArea) => (
                                    <option key={mohArea.mohAreaId} value={mohArea.mohAreaId}>
                                        {mohArea.mohAreaName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center justify-center">
                            <Button type="submit" size="xl">Submit</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal show={openEditModal} onClose={() => {
                setOpenEditModal(false);
                setPhiAreaName('');
                setMohAreaId('');
            }}>
                <Modal.Header>Edit Sample</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleUpdate}>
                        <div className="mb-4">
                            <label htmlFor="phiAreaName" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Phi Area Name
                            </label>
                            <input type="text" name="phiAreaName" id="phiAreaName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={phiAreaName} onChange={(e) => setPhiAreaName(e.target.value)} required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="mohAreaId" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                MOH Area
                            </label>
                            <select
                                id="mohAreaId"
                                name="mohAreaId"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={mohAreaId}
                                onChange={(e) => setMohAreaId(e.target.value)}
                                required
                            >
                                <option value="">Select MOH Area</option>
                                {mohAreas.map((mohArea) => (
                                    <option key={mohArea.mohAreaId} value={mohArea.mohAreaId}>
                                        {mohArea.mohAreaName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center justify-center">
                            <Button type="submit" size="xl">Submit</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal show={openDeleteModal} size="md" onClose={() => setOpenDeleteModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this PHI Area?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={() => handleDelete(deletedId)}>
                                Yes, I'm sure
                            </Button>
                            <Button color="gray" onClick={() => setOpenDeleteModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default PHIAreas