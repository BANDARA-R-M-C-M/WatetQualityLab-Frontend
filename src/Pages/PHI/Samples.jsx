import { useState, useEffect } from 'react';
import { Button, Modal, Pagination, Dropdown } from "flowbite-react";
import { FaPlus } from "react-icons/fa6";
import { MdEdit, MdDelete, MdClose } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { getPHIDetails, submitSample, getAddedSamples, updateWCSample, deleteWCSample } from '../../Service/PHIService';
import { useAuth } from '../../Context/useAuth';
import { useDebounce } from '../../Util/useDebounce';

function Samples() {

    const [samples, setSamples] = useState([]);
    const [yourRefNo, setYourRefNo] = useState('');
    const [dateOfCollection, setDateOfCollection] = useState('');
    const [phiAreaId, setPhiAreaId] = useState('');
    const [phiAreaName, setPhiAreaName] = useState('');
    const [catagoryOfSource, setCatagoryOfSource] = useState('');
    const [collectingSource, setCollectingSource] = useState('');
    const [stateOfChlorination, setStateOfChlorination] = useState('');
    const [placeholderText, setPlaceholderText] = useState('Your Ref No...');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchParameter, setSearchParameter] = useState('YourRefNo');
    const [searchParameterType, setSearchParameterType] = useState('string');
    const [sortBy, setSortBy] = useState('YourRefNo');
    const [isAscending, setIsAscending] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [updatedId, setUpdatedId] = useState('');
    const [deletedId, setDeletedId] = useState('');
    const [openNewModal, setOpenNewModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const { user } = useAuth();
    const debouncedSearch = useDebounce(searchTerm);

    useEffect(() => {
        const fetchAddedSamples = async () => {
            try {
                const response = await getAddedSamples(user.userId, searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, sortBy, isAscending);
                if (response) {
                    setSamples(response.data.items);
                    setTotalPages(response.data.totalPages);
                }
            } catch (error) {
                console.error('Error fetching added samples:', error);
            }
        };
        fetchAddedSamples();
    }, [openNewModal, openEditModal, openDeleteModal, pageNumber, sortBy, isAscending, debouncedSearch]);

    useEffect(() => {
        getPHIDetails(user.userId).then((response) => {
            setPhiAreaId(response.data.phiAreaId);
            setPhiAreaName(response.data.phiAreaName);
        });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (await submitSample(yourRefNo, dateOfCollection, catagoryOfSource, collectingSource, stateOfChlorination, user.userId, phiAreaId, phiAreaName)) {
            alert('Sample added successfully');
        } else {
            alert('Failed to add sample');
        }

        setYourRefNo('');
        setDateOfCollection('');
        setCatagoryOfSource('');
        setCollectingSource('');
        setStateOfChlorination('');

        setOpenNewModal(false);
    };

    const handleUpdate = async (event) => {
        event.preventDefault();

        if (await updateWCSample(updatedId, yourRefNo, dateOfCollection, catagoryOfSource, collectingSource, stateOfChlorination)) {
            alert('Sample updated successfully');
        } else {
            alert('Failed to update sample');
        }

        setYourRefNo('');
        setDateOfCollection('');
        setCatagoryOfSource('');
        setCollectingSource('');
        setStateOfChlorination('');

        setOpenEditModal(false);
    };

    const handleDelete = async (deletedId) => {
        try {
            await deleteWCSample(deletedId);
            alert('Sample deleted successfully');
        } catch (error) {
            console.error('Error deleting sample:', error);
            alert('Failed to delete sample');
        }

        setOpenDeleteModal(false);
    };

    return (
        <>
            <div className="bg-white rounded-md w-full">
                <div>
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
                                        setSortBy('YourRefNo');
                                        setSearchParameter('YourRefNo');
                                        setPlaceholderText('Your Ref No...');
                                    }}
                                >
                                    Your Ref No
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => {
                                        setSortBy('DateOfCollection');
                                        setSearchParameter('DateOfCollection');
                                        setSearchParameterType('DateOnly');
                                        setPlaceholderText('Date of Collection...');
                                    }}
                                >
                                    Date of Collection
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => {
                                        setSortBy('phiAreaName');
                                        setSearchParameter('phiAreaName');
                                        setPlaceholderText('PHI Area Name...');
                                    }}
                                >
                                    PHI Area Name
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => {
                                        setSortBy('CatagoryOfSource');
                                        setSearchParameter('CatagoryOfSource');
                                        setPlaceholderText('Category of Source...');
                                    }}
                                >
                                    Category of Source
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => {
                                        setSortBy('CollectingSource');
                                        setSearchParameter('CollectingSource');
                                        setPlaceholderText('Collecting Source...');
                                    }}
                                >
                                    Collecting Source
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => {
                                        setSortBy('StateOfChlorination');
                                        setSearchParameter('StateOfChlorination');
                                        setPlaceholderText('State Of Chlorination...');
                                    }}
                                >
                                    State Of Chlorination
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
                        <Button
                            onClick={() => {
                                setOpenNewModal(true);
                                setYourRefNo('');
                                setDateOfCollection('');
                                setCatagoryOfSource('');
                                setCollectingSource('');
                                setStateOfChlorination('');
                            }}
                        >
                            <FaPlus className="mr-2 h-5 w-5" />
                            Add Sample
                        </Button>
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
                                        Your Ref No
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Date of Collection
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        PHI Area
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Category of Source
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Collecting Source
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        State of Chlorination
                                    </th>
                                    {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Status
                                    </th> */}
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {samples.map((sample, index) => (
                                    <tr key={index}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{sample.sampleId}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{sample.yourRefNo}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{sample.dateOfCollection}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{sample.phiAreaName}</p>
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
                                        {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                                <span className="relative">{sample.acceptance}</span>
                                            </span>
                                        </td> */}
                                        <td className="border-b border-gray-200 bg-white text-sm">
                                            <Button size="xs"
                                                onClick={() => {
                                                    setOpenEditModal(true);
                                                    setUpdatedId(sample.sampleId);
                                                    setYourRefNo(sample.yourRefNo);
                                                    setDateOfCollection(sample.dateOfCollection);
                                                    setCatagoryOfSource(sample.catagoryOfSource);
                                                    setCollectingSource(sample.collectingSource);
                                                    setStateOfChlorination(sample.stateOfChlorination);
                                                }}
                                            >
                                                <MdEdit size={25} />
                                            </Button>
                                        </td>
                                        <td className="border-b border-gray-200 bg-white text-sm">
                                            <Button size="xs" color="failure"
                                                onClick={() => { setOpenDeleteModal(true); setDeletedId(sample.sampleId); }}
                                            >
                                                <MdDelete size={25} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {samples.length > 0 && (
                        <div className="flex overflow-x-auto sm:justify-center">
                            <Pagination currentPage={pageNumber} totalPages={totalPages} onPageChange={(page) => { setPageNumber(page) }} showIcons />
                        </div>
                    )}
                </div>
            </div>

            <Modal show={openNewModal} onClose={() => setOpenNewModal(false)}>
                <Modal.Header>Add Sample</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="yourRefNo" className="block text-gray-700 text-sm font-bold mb-2">
                                yourRefNo
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="yourRefNo" id="yourRefNo" type="text" placeholder="Your Ref No"
                                value={yourRefNo} onChange={(e) => setYourRefNo(e.target.value)} required />
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

                        <div className="flex items-center justify-center">
                            <Button type="submit" size="xl">Submit</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal show={openEditModal} onClose={() => setOpenEditModal(false)}>
                <Modal.Header>Edit Sample</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleUpdate}>
                        <div className="mb-4">
                            <label htmlFor="yourRefNo" className="block text-gray-700 text-sm font-bold mb-2">
                                yourRefNo
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="yourRefNo" id="yourRefNo" type="text" placeholder="yourRefNo"
                                value={yourRefNo} onChange={(e) => setYourRefNo(e.target.value)} required />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="dateOfCollection" className="block text-gray-700 text-sm font-bold mb-2">
                                Date of Collection
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="dateOfCollection" id="dateOfCollection" type="date" placeholder="Date of Collection"
                                value={dateOfCollection} onChange={(e) => setDateOfCollection(e.target.value)} />
                        </div>

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

            <Modal show={openDeleteModal} size="md" onClose={() => setOpenDeleteModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this sample?
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

export default Samples