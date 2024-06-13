import React, { useState, useEffect } from 'react';
import { useAuth } from "../../Context/useAuth";
import { useDebounce } from '../../Util/useDebounce';
import { getPendingSamples, updateStatus } from "../../Service/MLTService";
import { Button, Modal, Pagination, Dropdown } from "flowbite-react";
import { MdClose } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import { toast } from 'react-toastify';

function PendingSamples() {
    const [samples, setSamples] = useState([]);
    const [comment, setComment] = useState('');
    const [placeholderText, setPlaceholderText] = useState('Your Ref No...');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchParameter, setSearchParameter] = useState('YourRefNo');
    const [searchParameterType, setSearchParameterType] = useState('string');
    const [sortBy, setSortBy] = useState('YourRefNo');
    const [isAscending, setIsAscending] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [rejectedId, setRejectedId] = useState('');
    const [openModal, setOpenModal] = useState(false);

    const { user, token } = useAuth();
    const debouncedSearch = useDebounce(searchTerm);

    useEffect(() => {
        const fetchSamples = async () => {
            try {
                const response = await getPendingSamples(user.userId, searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, sortBy, isAscending, token);
                if (response) {
                    setSamples(response.data.items);
                    setTotalPages(response.data.totalPages);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchSamples();
    }, [pageNumber, sortBy, isAscending, debouncedSearch]);

    const handleAccept = async (sampleId) => {
        await updateStatus(sampleId, 'Accepted', comment, token);
        const updatedSamples = samples.filter(sample => sample.sampleId !== sampleId);
        setSamples(updatedSamples);
        toast.success('Sample accepted successfully');
    };

    const handleReject = async (e) => {
        e.preventDefault();

        if (await updateStatus(rejectedId, 'Rejected', comment, token)) {
            const updatedSamples = samples.filter(sample => sample.sampleId !== rejectedId);
            setSamples(updatedSamples);

            setComment('');

            setOpenModal(false);
            toast.success('Sample rejected successfully');
        }
    };

    return (
        <>
            <div className="bg-white rounded-md w-full">
                <h1 className="text-center text-4xl font-bold mb-7">New Samples</h1>
                <div className="flex items-center justify-between pb-6">
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
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
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
                                        Catagory of Source
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Collecting Source
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        State of Chlorination
                                    </th>
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
                                        <td className="pl-7 py-5 border-b border-gray-200 bg-white text-sm ">
                                            <Button onClick={() => handleAccept(sample.sampleId)}
                                                color="success">Accept</Button>
                                        </td>
                                        <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
                                            <Button onClick={() => {
                                                setOpenModal(true);
                                                setRejectedId(sample.sampleId)
                                            }}
                                                color="failure">Reject</Button>
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
        </>
    );
}

export default PendingSamples