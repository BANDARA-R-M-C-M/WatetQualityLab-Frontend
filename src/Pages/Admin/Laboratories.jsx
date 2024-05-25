import { useState, useEffect } from 'react';
import { Button, Modal, Pagination,  Dropdown } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { MdEdit, MdDelete, MdClose } from "react-icons/md";
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import { addLab, getLabs, updateLabs, deleteLab } from "../../Service/AdminService";
import { useDebounce } from '../../Util/useDebounce';

function Laboratories() {

    const [labs, setLabs] = useState([]);
    const [labName, setLabName] = useState('');
    const [labLocation, setLabLocation] = useState('');
    const [labTelephone, setLabTelephone] = useState('');
    const [placeholderText, setPlaceholderText] = useState('Lab Name...');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchParameter, setSearchParameter] = useState('LabName');
    const [searchParameterType, setSearchParameterType] = useState('string');
    const [sortBy, setSortBy] = useState('LabName');
    const [isAscending, setIsAscending] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [updatedId, setUpdatedId] = useState(null);
    const [deletedId, setDeletedId] = useState(null);
    const [openNewModal, setOpenNewModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const debouncedSearch = useDebounce(searchTerm);

    useEffect(() => {
        const fetchLabs = async () => {
            const response = await getLabs(searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, sortBy, isAscending);
            if (response) {
                setLabs(response.data.items);
                setTotalPages(response.data.totalPages);
            } else {
                console.log("Error fetching Labs");
            }
        }
        fetchLabs();
    }, [openNewModal, openEditModal, openDeleteModal, pageNumber, sortBy, isAscending, debouncedSearch]);

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
                                                setSortBy('LabName');
                                                setSearchParameter('LabName');
                                                setPlaceholderText(' Lab Name...');
                                            }}
                                        >
                                            Lab Name
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() => {
                                                setSortBy('LabLocation');
                                                setSearchParameter('LabLocation');
                                                setPlaceholderText('Lab Location...');
                                            }}
                                        >
                                            Lab Location
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() => {
                                                setSortBy('LabTelephone');
                                                setSearchParameter('LabTelephone');
                                                setPlaceholderText('Lab Telephone...');
                                            }}
                                        >
                                            Lab Telephone
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
                            Add Lab
                        </Button>
                    </div>
                </div>

                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Lab ID
                                    </th> */}
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
                                        {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{lab.labId}</p>
                                        </td> */}
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{lab.labName}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{lab.labLocation}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{lab.labTelephone}</p>
                                        </td>
                                        <td className="border-b border-gray-200 bg-white text-sm">
                                            <Button size="xs"
                                                onClick={() => {
                                                    setOpenEditModal(true);
                                                    setUpdatedId(lab.labId);
                                                    setLabName(lab.labName);
                                                    setLabLocation(lab.labLocation);
                                                    setLabTelephone(lab.labTelephone);
                                                }}
                                            >
                                                <MdEdit size={25} />
                                            </Button>
                                        </td>
                                        <td className="border-b border-gray-200 bg-white text-sm">
                                            <Button size="xs" color="failure"
                                                onClick={() => { setOpenDeleteModal(true), setDeletedId(lab.labId) }}
                                            >
                                                <MdDelete size={25} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {labs.length > 0 && (
                        <div className="flex overflow-x-auto sm:justify-center">
                            <Pagination currentPage={pageNumber} totalPages={totalPages} onPageChange={(page) => { setPageNumber(page) }} showIcons />
                        </div>
                    )}
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