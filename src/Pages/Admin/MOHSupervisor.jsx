import { useState, useEffect } from 'react';
import { Button, Modal } from "flowbite-react";
import { FaPlus } from "react-icons/fa6";
import { MdEdit, MdDelete } from "react-icons/md";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { registerUser, getMOHSupervisors, getMOHAreas, assignMOHSupervisortoMOHAreas, deleteUser } from "../../Service/AdminService";

function MOHSupervisor() {

    const [mohSupservisors, setMohSupevisors] = useState([]);
    const [mohAreas, setMohAreas] = useState([]);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [role, setRole] = useState('Moh_Supervisor');
    const [mohAreaId, setMohAreaId] = useState('');
    const [assignId, setAssignId] = useState('');
    const [deletedId, setDeletedId] = useState(null);
    const [openNewModal, setOpenNewModal] = useState(false);
    const [openAssignModal, setOpenAssignModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    useEffect(() => {
        const fetchMOHSupervisors = async () => {
            const response = await getMOHSupervisors();
            if (response) {
                setMohSupevisors(response.data);
            } else {
                console.log("Error fetching MOH Supervisors");
            }
        }
        fetchMOHSupervisors();
    }, [openNewModal, openAssignModal, openDeleteModal]);

    useEffect(() => {
        const fetchMOHAreas = async () => {
            const response = await getMOHAreas();
            if (response) {
                setMohAreas(response.data);
            } else {
                console.log("Error fetching MOH Areas");
            }
        }
        fetchMOHAreas();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(userName, password, email, phoneNumber, role);
            alert('MOH Supervisor added successfully');
        } catch (error) {
            console.error('Error adding MOH Supervisor:', error);
            alert('Failed to add MOH Supervisor');
        }

        setOpenNewModal(false);
    }

    const handleAssign = async (e) => {
        e.preventDefault();

        if (await assignMOHSupervisortoMOHAreas(assignId, mohAreaId)) {
            alert('MOH Supervisor assigned successfully');
        } else {
            alert('Failed to assign MOH Supervisor');
        }

        setOpenAssignModal(false);
    }

    const handleDelete = async (deletedId) => {
        try {
            await deleteUser(deletedId);
            alert('MOH Supervisor deleted successfully');
        } catch (error) {
            console.error('Error deleting sample:', error);
            alert('Failed to delete MOH Supervisor');
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
                        >
                            <FaPlus className="mr-2 h-5 w-5" />
                            Add MOH Supervisor
                        </Button>
                    </div>
                </div>

                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Identity Card Number
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Telephone
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        E-Mail
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Assigned MOH Area
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {mohSupservisors.map((mohSupservisor, index) => (
                                    <tr key={index}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{mohSupservisor.userName}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{mohSupservisor.id}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{mohSupservisor.phoneNumber}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{mohSupservisor.email}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{mohSupservisor.mohAreaName}</p>
                                        </td>
                                        <td className="border-b border-gray-200 bg-white text-sm">
                                            <Button
                                                onClick={() => {
                                                    setOpenAssignModal(true);
                                                    setAssignId(mohSupservisor.id)
                                                }}
                                            >
                                                <MdEdit className="mr-2 h-5 w-5" />
                                                Assign
                                            </Button>
                                        </td>
                                        <td className="border-b border-gray-200 bg-white text-sm">
                                            <Button size="xs" color="failure"
                                                onClick={() => {
                                                    setOpenDeleteModal(true);
                                                    setDeletedId(mohSupservisor.id)
                                                }}
                                            >
                                                <MdDelete size={25} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal show={openAssignModal} onClose={() => setOpenAssignModal(false)}>
                <Modal.Header>Assign MOH Supservisor to MOH Area</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleAssign}>
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
                            <Button type="submit" size="xl">
                                Assign
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal show={openNewModal} onClose={() => setOpenNewModal(false)}>
                <Modal.Header>Add MLT</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="userName" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Name
                            </label>
                            <input type="text" name="userName" id="userName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={userName} onChange={(e) => setUserName(e.target.value)} required />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Password
                            </label>
                            <input type="password" name="password" id="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                E-Mail
                            </label>
                            <input type="email" name="email" id="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Telephone
                            </label>
                            <input type="tel" name="phoneNumber" id="phoneNumber" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
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
                            Are you sure you want to delete this MOH Supervisor?
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

export default MOHSupervisor