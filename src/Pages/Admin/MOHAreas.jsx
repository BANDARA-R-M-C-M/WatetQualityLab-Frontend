import { useState, useEffect } from 'react';
import { Button, Modal, Pagination, Dropdown } from "flowbite-react";
import { FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { MdEdit, MdDelete, MdClose } from "react-icons/md";
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { getMOHAreas, fetchLocations, addMOHArea, getLabs, updateMOHAreas, deleteMOHArea } from "../../Service/AdminService";
import { useAuth } from '../../Context/useAuth';
import { useDebounce } from '../../Util/useDebounce';

function MOHAreas() {

    const [mohAreas, setMohAreas] = useState([]);
    const [labs, setLabs] = useState([]);
    const [mohAreaName, setMohAreaName] = useState('');
    const [labId, setLabId] = useState('');
    const [cities, setCities] = useState([]);
    const [placeholderText, setPlaceholderText] = useState('MOH Area Name...');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchParameter, setSearchParameter] = useState('MOHAreaName');
    const [searchParameterType, setSearchParameterType] = useState('string');
    const [sortBy, setSortBy] = useState('MOHAreaName');
    const [isAscending, setIsAscending] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [updatedId, setUpdatedId] = useState(null);
    const [deletedId, setDeletedId] = useState(null);
    const [openNewModal, setOpenNewModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const { token } = useAuth();
    const debouncedSearch = useDebounce(searchTerm);

    useEffect(() => {
        const loadLocations = async () => {
            try {
                const cities = await fetchLocations(mohAreaName);
                setCities(cities);
            } catch (error) {
                console.error('Error loading cities:', error);
            }
        };
        loadLocations();
    }, [mohAreaName]);

    useEffect(() => {
        const fetchMOHAreas = async () => {
            const response = await getMOHAreas(searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, sortBy, isAscending, token);
            if (response) {
                setMohAreas(response.data.items);
                setTotalPages(response.data.totalPages);
            } else {
                console.log("Error fetching MOH Areas");
            }
        }
        fetchMOHAreas();
    }, [openNewModal, openEditModal, openDeleteModal, pageNumber, sortBy, isAscending, debouncedSearch]);

    useEffect(() => {
        const fetchLabs = async () => {
            const response = await getLabs(null, null, null, null, null, null, null, token);
            if (response) {
                setLabs(response.data.items);
            } else {
                console.log("Error fetching MOH Area");
            }
        }
        fetchLabs();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // try {
        await addMOHArea(mohAreaName, labId, token);
        //     alert('MOH Area added successfully');
        // } catch (error) {
        //     console.error('Error adding PHI Area:', error);
        //     alert('Failed to add MOH Area');
        // }

        setMohAreaName('');
        setLabId('');

        setOpenNewModal(false);
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        // if (
        await updateMOHAreas(updatedId, mohAreaName, labId, token)
        // ) {
        //     alert('MOH Area updated successfully');
        // } else {
        //     alert('Failed to update MOH Area');
        // }

        setMohAreaName('');
        setLabId('');

        setOpenEditModal(false);
    }

    const handleDelete = async (deletedId) => {
        // try {
        await deleteMOHArea(deletedId, token);
        // alert('MOH Area deleted successfully');
        // } catch (error) {
        //     console.error('Error deleting sample:', error);
        //     alert('Failed to delete MOH Area');
        // }

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
                                                setSortBy('MOHAreaName');
                                                setSearchParameter('MOHAreaName');
                                                setPlaceholderText('MOH Area Name...');
                                            }}
                                        >
                                            MOH Area Name
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
                            Add MOH Area
                        </Button>
                    </div>
                </div>

                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        MOH Area ID
                                    </th> */}
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        MOH Area Name
                                    </th>
                                    {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Assigned Lab
                                    </th> */}
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Assigned Lab Name
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {mohAreas.map((mohArea, index) => (
                                    <tr key={index}>
                                        {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{mohArea.mohAreaId}</p>
                                        </td> */}
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{mohArea.mohAreaName}</p>
                                        </td>
                                        {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{mohArea.labId}</p>
                                        </td> */}
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{mohArea.labName}</p>
                                        </td>
                                        <td className="border-b border-gray-200 bg-white text-sm">
                                            <Button size="xs"
                                                onClick={() => {
                                                    setOpenEditModal(true);
                                                    setUpdatedId(mohArea.mohAreaId);
                                                    setMohAreaName(mohArea.mohAreaName);
                                                    setLabId(mohArea.labId);
                                                }}
                                            >
                                                <MdEdit size={25} />
                                            </Button>
                                        </td>
                                        <td className="border-b border-gray-200 bg-white text-sm">
                                            <Button size="xs" color="failure"
                                                onClick={() => {
                                                    setOpenDeleteModal(true);
                                                    setDeletedId(mohArea.mohAreaId);
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
                    {mohAreas.length > 0 && (
                        <div className="flex overflow-x-auto sm:justify-center">
                            <Pagination currentPage={pageNumber} totalPages={totalPages} onPageChange={(page) => { setPageNumber(page) }} showIcons />
                        </div>
                    )}
                </div>
            </div>

            <Modal show={openNewModal} onClose={() => {
                setOpenNewModal(false);
                setMohAreaName('');
                setLabId('');
            }}>
                <Modal.Header>Add MOH Area</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="mohAreaName" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                MOH Area Name
                            </label>
                            <input
                                type="text"
                                name="mohAreaName"
                                id="mohAreaName"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={mohAreaName}
                                onChange={(e) => setMohAreaName(e.target.value)}
                                list="citySuggestions"
                                required
                            />
                            <datalist id="citySuggestions">
                                {cities.map((city, index) => (
                                    <option key={index} value={city} />
                                ))}
                            </datalist>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="labId" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                MOH Area
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
                            <Button type="submit" size="xl">Submit</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal show={openEditModal} onClose={() => {
                setOpenEditModal(false);
                setMohAreaName('');
                setLabId('');
            }}>
                <Modal.Header>Edit Sample</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleUpdate}>
                        <div className="mb-4">
                            <label htmlFor="mohAreaName" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                MOH Area Name
                            </label>
                            <input type="text" name="mohAreaName" id="mohAreaName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={mohAreaName} onChange={(e) => setMohAreaName(e.target.value)} required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="labId" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                MOH Area
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
                            Are you sure you want to delete this MOH Area?
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

export default MOHAreas