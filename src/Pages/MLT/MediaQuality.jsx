import { useState, useEffect } from 'react';
import { Button, Modal, Pagination, Dropdown } from "flowbite-react";
import { MdEdit, MdDelete, MdClose } from "react-icons/md"
import { FaPlus, FaSearch } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import { getMediaQualityRecords, addMediaQualityControlRecord, updateMediaQualityControlRecord, deleteMediaQualityControlRecord } from '../../Service/MediaQCService';
import { useAuth } from '../../Context/useAuth';
import { useDebounce } from '../../Util/useDebounce';

function MediaQuality() {

    const [MediaQualityRecords, setMediaQualityRecords] = useState([]);
    const [dateTime, setDateTime] = useState('');
    const [mediaId, setMediaId] = useState('');
    const [sterility, setSterility] = useState('');
    const [stability, setStability] = useState('');
    const [sensitivity, setSensitivity] = useState('');
    const [remarks, setRemarks] = useState('');
    const [labId, setLabId] = useState('');
    const [placeholderText, setPlaceholderText] = useState('Media Id...');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchParameter, setSearchParameter] = useState('MediaId');
    const [searchParameterType, setSearchParameterType] = useState('string');
    const [sortBy, setSortBy] = useState('MediaId');
    const [isAscending, setIsAscending] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [updateId, setUpdateId] = useState('');
    const [deleteId, setDeleteId] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const { user, token } = useAuth();
    const debouncedSearch = useDebounce(searchTerm);

    useEffect(() => {
        const fetchMediaQualityRecords = async () => {
            try {
                const response = await getMediaQualityRecords(user.userId, searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, sortBy, isAscending, token);
                if (response) {
                    setMediaQualityRecords(response.data.items);
                    setLabId(user.areaId);
                    setTotalPages(response.data.totalPages);
                }
            } catch (error) {
                console.error('Error fetching General Categories', error);
            }
        };
        fetchMediaQualityRecords();
    }, [openModal, openEditModal, openDeleteModal, pageNumber, sortBy, isAscending, debouncedSearch]);

    const handleAddRecord = async (event) => {
        event.preventDefault();

        if (await addMediaQualityControlRecord(dateTime, mediaId, sterility, stability, sensitivity, remarks, user.userId, labId, token)) {
            alert('Record Added Successfully')
        } else {
            alert('Failed to Add Record')
        }

        setOpenModal(false);
    };

    const handleUpdate = async (event) => {
        event.preventDefault();

        if (await updateMediaQualityControlRecord(updateId, dateTime, mediaId, sterility, stability, sensitivity, remarks, user.userId, token)) {
            alert('Record Updated Successfully')
        } else {
            alert('Failed to Update Record')
        }

        setOpenEditModal(false);
    };

    const handleDelete = async (deleteId) => {
        try {
            await deleteMediaQualityControlRecord(deleteId, token);
            alert('Record deleted successfully');
        } catch (error) {
            console.error('Error deleting category:', error);
            alert('Failed to delete Record');
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
                                        setSortBy('MediaId');
                                        setSearchParameter('MediaId');
                                        setPlaceholderText('Media Id...');
                                    }}
                                >
                                    Media Id
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => {
                                        setSortBy('DateTime');
                                        setSearchParameter('DateTime');
                                        setSearchParameterType('DateTime');
                                        setPlaceholderText('Date Time...');
                                    }}
                                >
                                    Date Time
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => {
                                        setSortBy('Sterility');
                                        setSearchParameter('Sterility');
                                        setPlaceholderText('Sterility...');
                                    }}
                                >
                                    Sterility
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => {
                                        setSortBy('Stability');
                                        setSearchParameter('Stability');
                                        setPlaceholderText('Stability...');
                                    }}
                                >
                                    Stability
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => {
                                        setSortBy('Sensitivity');
                                        setSearchParameter('Sensitivity');
                                        setPlaceholderText('Sensitivity...');
                                    }}
                                >
                                    Sensitivity
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
                        <Button className="mr-1"
                            onClick={() => {
                                setOpenModal(true);
                            }}
                        >
                            <FaPlus className="mr-2 h-5 w-5" />
                            Add Quality Record
                        </Button>
                    </div>
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Media Quality ID
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Media ID
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Date & Time
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Sterility
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Stability
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Sensitivity
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Remarks
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {MediaQualityRecords.map((QualityRecord, index) => (
                                    <tr key={index}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{QualityRecord.mediaQualityControlID}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{QualityRecord.mediaId}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{QualityRecord.dateTime}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{QualityRecord.sterility}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{QualityRecord.stability}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{QualityRecord.sensitivity}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{QualityRecord.remarks}</p>
                                        </td>
                                        <td className="border-b border-gray-200 bg-white text-sm">
                                            <Button size="xs"
                                                onClick={() => {
                                                    setOpenEditModal(true);
                                                    setUpdateId(QualityRecord.mediaQualityControlID);
                                                    setMediaId(QualityRecord.mediaId);
                                                    setDateTime(QualityRecord.dateTime);
                                                    setSterility(QualityRecord.sterility);
                                                    setStability(QualityRecord.stability);
                                                    setSensitivity(QualityRecord.sensitivity);
                                                    setRemarks(QualityRecord.remarks);
                                                }}
                                            >
                                                <MdEdit size={25} />
                                            </Button>
                                        </td>
                                        <td className="border-b border-gray-200 bg-white text-sm">
                                            <Button size="xs" color="failure"
                                                onClick={() => {
                                                    setOpenDeleteModal(true);
                                                    setDeleteId(QualityRecord.mediaQualityControlID)
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
                    {MediaQualityRecords.length > 0 && (
                        <div className="flex overflow-x-auto sm:justify-center">
                            <Pagination currentPage={pageNumber} totalPages={totalPages} onPageChange={(page) => { setPageNumber(page) }} showIcons />
                        </div>
                    )}
                </div>
            </div>

            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Add Record</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleAddRecord}>
                        <div className="mb-4">
                            <label htmlFor="mediaId" className="block text-sm font-medium text-gray-700">Media ID</label>
                            <input type="text" name="mediaId" id="mediaId" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={mediaId} onChange={(e) => setMediaId(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="dateTime" className="block text-sm font-medium text-gray-700">Date & Time</label>
                            <input type="datetime-local" name="dateTime" id="dateTime" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={dateTime} onChange={(e) => setDateTime(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="sterility" className="block text-sm font-medium text-gray-700">Sterility</label>
                            <input type="text" name="sterility" id="sterility" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={sterility} onChange={(e) => setSterility(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="stability" className="block text-sm font-medium text-gray-700">Stability</label>
                            <input type="text" name="stability" id="stability" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={stability} onChange={(e) => setStability(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="sensitivity" className="block text-sm font-medium text-gray-700">Sensitivity</label>
                            <input type="text" name="sensitivity" id="sensitivity" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={sensitivity} onChange={(e) => setSensitivity(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="remarks" className="block text-sm font-medium text-gray-700">Remarks</label>
                            <input type="text" name="remarks" id="remarks" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={remarks} onChange={(e) => setRemarks(e.target.value)} />
                        </div>
                        <div className="flex items-center justify-center">
                            <Button type="submit" size="xl">Submit</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal show={openEditModal} onClose={() => setOpenEditModal(false)}>
                <Modal.Header>Edit Record</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleUpdate}>
                        <div className="mb-4">
                            <label htmlFor="mediaId" className="block text-sm font-medium text-gray-700">Media ID</label>
                            <input type="text" name="mediaId" id="mediaId" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={mediaId} onChange={(e) => setMediaId(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="dateTime" className="block text-sm font-medium text-gray-700">Date & Time</label>
                            <input type="datetime-local" name="dateTime" id="dateTime" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={dateTime} onChange={(e) => setDateTime(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="sterility" className="block text-sm font-medium text-gray-700">Sterility</label>
                            <input type="text" name="sterility" id="sterility" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={sterility} onChange={(e) => setSterility(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="stability" className="block text-sm font-medium text-gray-700">Stability</label>
                            <input type="text" name="stability" id="stability" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={stability} onChange={(e) => setStability(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="sensitivity" className="block text-sm font-medium text-gray-700">Sensitivity</label>
                            <input type="text" name="sensitivity" id="sensitivity" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={sensitivity} onChange={(e) => setSensitivity(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="remarks" className="block text-sm font-medium text-gray-700">Remarks</label>
                            <input type="text" name="remarks" id="remarks" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={remarks} onChange={(e) => setRemarks(e.target.value)} />
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
                            Are you sure you want to delete this category?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={() => handleDelete(deleteId)}>
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

export default MediaQuality