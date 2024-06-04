import { useState, useEffect } from 'react';
import { Button, Modal, Pagination, Dropdown } from "flowbite-react";
import { FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { MdEdit, MdDelete, MdClose } from "react-icons/md";
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { registerUser, getMLTs, getLabs, assignMLTtoLabs, deleteUser } from "../../Service/AdminService";
import { useAuth } from '../../Context/useAuth';
import { useDebounce } from '../../Util/useDebounce';

function MLT() {

    const [mlts, setMLTs] = useState([]);
    const [labs, setLabs] = useState([]);
    const [id, setId] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [role, setRole] = useState('Mlt');
    const [labId, setLabId] = useState('');
    const [placeholderText, setPlaceholderText] = useState('Identity Number...');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchParameter, setSearchParameter] = useState('ID');
    const [searchParameterType, setSearchParameterType] = useState('string');
    const [sortBy, setSortBy] = useState('ID');
    const [isAscending, setIsAscending] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [assignId, setAssignId] = useState('');
    const [deletedId, setDeletedId] = useState(null);
    const [openNewModal, setOpenNewModal] = useState(false);
    const [openAssignModal, setOpenAssignModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const { user, token } = useAuth();
    const debouncedSearch = useDebounce(searchTerm);

    useEffect(() => {
        const fetchMLTs = async () => {
            const response = await getMLTs(searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, sortBy, isAscending, token);
            if (response) {
                setMLTs(response.data.items);
                setTotalPages(response.data.totalPages);
            } else {
                console.log("Error fetching MLTs");
            }
        }
        fetchMLTs();
    }, [openNewModal, openAssignModal, openDeleteModal, pageNumber, sortBy, isAscending, debouncedSearch]);

    useEffect(() => {
        const fetchLabs = async () => {
            const response = await getLabs(null, null, null, null, null, null, null, token);
            if (response) {
                setLabs(response.data.items);
            } else {
                console.log("Error fetching Labs");
            }
        }
        fetchLabs();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(id, userName, password, email, phoneNumber, role, token);
            alert('MLT added successfully');
        } catch (error) {
            console.error('Error adding MLT:', error);
            alert('Failed to add MLT');
        }


        setOpenNewModal(false);
    }

    const handleAssign = async (e) => {
        e.preventDefault();

        if (await assignMLTtoLabs(assignId, labId, token)) {
            alert('MLT assigned successfully');
        } else {
            alert('Failed to assign MLT');
        }

        setOpenAssignModal(false);
    }

    const handleDelete = async (deletedId) => {
        try {
            await deleteUser(deletedId, token);
            alert('MLT deleted successfully');
        } catch (error) {
            console.error('Error deleting sample:', error);
            alert('Failed to delete MLT');
        }

        setOpenDeleteModal(false);
    }

    return (
        <>
            <div className="bg-white rounded-md w-full">
                <div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center justify-between">
                                <div className="flex bg-gray-200 items-center p-1 rounded-md">
                                    <FaSearch className="mx-2 h-6 w-6 text-gray-400" />
                                    <input
                                        className="bg-gray-200 border-none ml-1 block focus:ring focus:ring-gray-200"
                                        type="text"
                                        placeholder={placeholderText}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    {searchTerm && (
                                        <MdClose
                                            className="ml-2 h-6 w-6 text-gray-400 cursor-pointer"
                                            onClick={() => setSearchTerm('')}
                                        />
                                    )}
                                </div>
                                <div className="flex items-center p-2 rounded-md">
                                    <Dropdown label="Sort">
                                        <Dropdown.Item
                                            onClick={() => {
                                                setSortBy('ID');
                                                setSearchParameter('ID');
                                                setPlaceholderText('Identity Number...');
                                            }}
                                        >
                                            Identity Number
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() => {
                                                setSortBy('UserName');
                                                setSearchParameter('UserName');
                                                setPlaceholderText('User Name...');
                                            }}
                                        >
                                            User Name
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() => {
                                                setSortBy('PhoneNumber');
                                                setSearchParameter('PhoneNumber');
                                                setPlaceholderText('Phone Number...');
                                            }}
                                        >
                                            Phone Number
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() => {
                                                setSortBy('Email');
                                                setSearchParameter('Email');
                                                setPlaceholderText('Email...');
                                            }}
                                        >
                                            Email
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() => {
                                                setSortBy('LabName');
                                                setSearchParameter('LabName');
                                                setPlaceholderText('Lab Name...');
                                            }}
                                        >
                                            Lab Name
                                        </Dropdown.Item>
                                    </Dropdown>
                                </div>
                                <div className="flex items-center rounded-md">
                                    <Button onClick={() => { setIsAscending(!isAscending) }} size="xs">
                                        {isAscending ? <AiOutlineSortAscending size={28} />
                                            : <AiOutlineSortDescending size={28} />}
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <Button
                            onClick={() => { setOpenNewModal(true) }}
                        >
                            <FaPlus className="mr-2 h-5 w-5" />
                            Add MLT
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
                                        Phone Number
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        E-Mail
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Assigned Laboratory
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {mlts.map((mlt, index) => (
                                    <tr key={index}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{mlt.userName}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{mlt.id}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{mlt.phoneNumber}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{mlt.email}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{mlt.labName}</p>
                                        </td>
                                        <td className="border-b border-gray-200 bg-white text-sm">
                                            <Button
                                                onClick={() => { setOpenAssignModal(true), setAssignId(mlt.id) }}
                                            >
                                                <MdEdit className="mr-2 h-5 w-5" />
                                                Assign
                                            </Button>
                                        </td>
                                        <td className="border-b border-gray-200 bg-white text-sm">
                                            <Button size="xs" color="failure"
                                                onClick={() => { setOpenDeleteModal(true), setDeletedId(mlt.id) }}
                                            >
                                                <MdDelete size={25} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {mlts.length > 0 && (
                        <div className="flex overflow-x-auto sm:justify-center">
                            <Pagination currentPage={pageNumber} totalPages={totalPages} onPageChange={(page) => { setPageNumber(page) }} showIcons />
                        </div>
                    )}
                </div>
            </div>

            <Modal show={openAssignModal} onClose={() => setOpenAssignModal(false)}>
                <Modal.Header>Assign MLT to Laboratory</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleAssign}>
                        <div className="mb-4">
                            <label htmlFor="labId" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Lab
                            </label>
                            <select
                                id="labId"
                                name="labId"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={labId}
                                onChange={(e) => setLabId(e.target.value)}
                                required
                            >
                                <option value="">Select Lab</option>
                                {labs.map((lab) => (
                                    <option key={lab.labId} value={lab.labId}>
                                        {lab.labName}
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
                            <label htmlFor="id" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Identity Card Number
                            </label>
                            <input type="text" name="id" id="id" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={id} onChange={(e) => setId(e.target.value)} required />
                        </div>
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
                            Are you sure you want to delete this MLT?
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

export default MLT