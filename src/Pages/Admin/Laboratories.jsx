import { useState, useEffect } from 'react';
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { addLab, getLabs, updateLabs, deleteLab } from "../../Service/AdminService";
import { set } from 'react-hook-form';

function Laboratories() {

    const [labs, setLabs] = useState([]);
    const [labName, setLabName] = useState('');
    const [labLocation, setLabLocation] = useState('');
    const [labTelephone, setLabTelephone] = useState('');
    const [updatedId, setUpdatedId] = useState(null);
    const [deletedId, setDeletedId] = useState(null);
    const [openNewModal, setOpenNewModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    useEffect(() => {
        const fetchLabs = async () => {
            const response = await getLabs();
            if (response) {
                setLabs(response.data);
            } else {
                console.log("Error fetching Labs");
            }
        }
        fetchLabs();
    }, [openNewModal, openEditModal, openDeleteModal]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addLab(labName, labLocation, labTelephone);
            alert('Lab added successfully');
        } catch (error) {
            console.error('Error adding Lab:', error);
            alert('Failed to add Lab');
        }

        setOpenNewModal(false);
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (await updateLabs(updatedId, labName, labLocation, labTelephone)) {
            alert('Lab updated successfully');
        } else {
            alert('Failed to update lab');
        }

        setLabName('');
        setLabLocation('');
        setLabTelephone('');

        setOpenEditModal(false);
    }

    const handleDelete = async (deletedId) => {
        try {
            await deleteLab(deletedId);
            alert('Lab deleted successfully');
        } catch (error) {
            console.error('Error deleting sample:', error);
            alert('Failed to delete Lab');
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
                        >Add Lab
                        </Button>
                    </div>
                </div>

                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Lab ID
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        LabName
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Location
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Phone Number
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {labs.map((lab, index) => (
                                    <tr key={index}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{lab.labId}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{lab.labName}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{lab.labLocation}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{lab.labTelephone}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <Button
                                                onClick={() => {
                                                    setOpenEditModal(true);
                                                    setUpdatedId(lab.labId);
                                                    setLabName(lab.labName);
                                                    setLabLocation(lab.labLocation);
                                                    setLabTelephone(lab.labTelephone);
                                                }}
                                            >Edit
                                            </Button>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <Button
                                                onClick={() => { setOpenDeleteModal(true), setDeletedId(lab.labId) }}
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
                setLabName('');
                setLabLocation('');
                setLabTelephone('');
            }}>
                <Modal.Header>Add Lab</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="labName" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Lab Name
                            </label>
                            <input type="text" name="labName" id="labName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={labName} onChange={(e) => setLabName(e.target.value)} required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="labLocation" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Lab Location
                            </label>
                            <input type="text" name="labLocation" id="labLocation" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={labLocation} onChange={(e) => setLabLocation(e.target.value)} required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="labTelephone" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Lab Telephone
                            </label>
                            <input type="text" name="labTelephone" id="labTelephone" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={labTelephone} onChange={(e) => setLabTelephone(e.target.value)} required />
                        </div>
                        <div className="flex items-center justify-center">
                            <Button type="submit" size="xl">Submit</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal show={openEditModal} onClose={() => {
                setOpenEditModal(false);
                setLabName('');
                setLabLocation('');
                setLabTelephone('')
            }}>
                <Modal.Header>Edit Sample</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleUpdate}>
                        <div className="mb-4">
                            <label htmlFor="labName" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Lab Name
                            </label>
                            <input type="text" name="labName" id="labName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={labName} onChange={(e) => setLabName(e.target.value)} required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="labLocation" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Lab Location
                            </label>
                            <input type="text" name="labLocation" id="labLocation" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={labLocation} onChange={(e) => setLabLocation(e.target.value)} required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="labTelephone" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Lab Telephone
                            </label>
                            <input type="text" name="labTelephone" id="labTelephone" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={labTelephone} onChange={(e) => setLabTelephone(e.target.value)} required />
                        </div>
                        <div className="flex items-center justify-between">
                            <Button type="submit">Submit</Button>
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
                            Are you sure you want to delete this Lab?
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

export default Laboratories