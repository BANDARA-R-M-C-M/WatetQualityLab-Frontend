import React, { useState, useEffect } from 'react';
import { useAuth } from "../../Context/useAuth";
import { useDebounce } from '../../Util/useDebounce';
import { getAcceptedSamples, submitReport, updateStatus } from "../../Service/MLTService";
import { Button, Modal, Pagination, Dropdown } from "flowbite-react";
import { MdClose } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";

function Samples() {

    const [samples, setSamples] = useState([]);
    const [myRefNo, setMyRefNo] = useState('');
    const [presumptiveColiformCount, setPresumptiveColiformCount] = useState('');
    const [issuedDate, setIssuedDate] = useState('');
    const [ecoliCount, setEcoliCount] = useState('');
    const [appearanceOfSample, setAppearanceOfSample] = useState('');
    const [remarks, setRemarks] = useState('');
    const [sampleId, setSampleId] = useState('');
    const [labId, setLabId] = useState('');
    const [placeholderText, setPlaceholderText] = useState('Your Ref No...');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchParameter, setSearchParameter] = useState('YourRefNo');
    const [searchParameterType, setSearchParameterType] = useState('string');
    const [sortBy, setSortBy] = useState('DateOfCollection');
    const [isAscending, setIsAscending] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [stateOfChlorination, setStateOfChlorination] = useState('');
    const [collectingSource, setCollectingSource] = useState('');
    const [DateOfCollection, setDateOfCollection] = useState('');
    const [analyzedDate, setAnalyzedDate] = useState('');
    const [labName, setLabName] = useState('');
    const [labLocation, setLabLocation] = useState('');
    const [labTelephone, setLabTelephone] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [previewModalOpen, setPreviewModalOpen] = useState(false);
    const [previewUrl, setPreviewUrl] = useState('');

    const { user } = useAuth();
    const debouncedSearch = useDebounce(searchTerm, 750);

    useEffect(() => {
        const fetchSamples = async () => {
            try {
                const response = await getAcceptedSamples(user.userId, searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, sortBy, isAscending);
                if (response) {
                    setSamples(response.data.items);
                    setTotalPages(response.data.totalPages);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchSamples();
    }, [openModal, pageNumber, sortBy, isAscending, debouncedSearch]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (await submitReport(myRefNo, presumptiveColiformCount, analyzedDate, ecoliCount, appearanceOfSample, remarks, user.userId, sampleId, labId)) {
            alert('Report created successfully');
        } else {
            alert('Failed to create report');
        }

        setMyRefNo('');
        setPresumptiveColiformCount('');
        setAnalyzedDate('');
        setEcoliCount('');
        setAppearanceOfSample('');
        setRemarks('');

        setOpenModal(false);
    };

    const handleRemove = async (removedId) => {
        try {
            await updateStatus(removedId, 'Pending', "");
            const updatedSamples = samples.filter(sample => sample.sampleId !== removedId);
            setSamples(updatedSamples);
        } catch (error) {
            console.error('Error remove sample:', error);
        }
    };

    return (
        <div className="bg-white rounded-md w-full">
            <div className="flex items-center justify-between pb-6">
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
                                <Dropdown.Item
                                    onClick={() => {
                                        setSortBy('ReportAvailable');
                                        setSearchParameter('ReportAvailable');
                                        setPlaceholderText('Report Availability...');
                                    }}
                                >
                                    Report Availability
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
            </div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Sample Id
                                </th> */}
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
                                {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Acceptance
                                </th> */}
                                {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Report Availability
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
                                    {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{sample.sampleId}</p>
                                    </td> */}
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
                                    {/* <td className="pl-7 py-5 border-b border-gray-200 bg-white text-sm">
                                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                            <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                            {sample.reportAvailable ?
                                                <span className="relative">Has report</span> :
                                                <span className="relative">Hasn't report</span>}
                                        </span>
                                    </td> */}
                                    <td className="pl-7 py-5 border-b border-gray-200 bg-white text-sm">
                                        {sample.reportAvailable ?
                                            <Button disabled>Report</Button> :
                                            <Button onClick={() => {
                                                setOpenModal(true);
                                                setSampleId(sample.sampleId);
                                                setLabId(sample.labID)
                                            }}>
                                                Report
                                            </Button>}
                                    </td>
                                    <td className="pl-7 py-5 border-b border-gray-200 bg-white text-sm">
                                        {sample.reportAvailable ?
                                            <Button color="failure" disabled>Remove</Button> :
                                            <Button color="failure" onClick={() => {
                                                // setOpenModal(true);
                                                // setRemovedId(sample.sampleId);
                                                handleRemove(sample.sampleId);
                                            }}>
                                                Remove
                                            </Button>}
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


            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Report</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit} >
                        <div className="mb-4">
                            <label htmlFor="myRefNo" className="block text-gray-700 text-sm font-bold mb-2">
                                My Ref No
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="myRefNo" id="myRefNo" type="text" placeholder="My Ref No"
                                value={myRefNo} onChange={(e) => setMyRefNo(e.target.value)} required />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="presumptiveColiformCount" className="block text-gray-700 text-sm font-bold mb-2">
                                Presumptive Coliform Count
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="presumptiveColiformCount" id="presumptiveColiformCount" type="number" placeholder="Presumptive Coliform Count"
                                value={presumptiveColiformCount} onChange={(e) => setPresumptiveColiformCount(e.target.value)} required />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="ecoliCount" className="block text-gray-700 text-sm font-bold mb-2">
                                Ecoli Count
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="ecoliCount" id="ecoliCount" type="number" placeholder="Ecoli Count"
                                value={ecoliCount} onChange={(e) => setEcoliCount(e.target.value)} required />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="analyzedDate" className="block text-gray-700 text-sm font-bold mb-2">
                                Analyzed Date
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="analyzedDate" id="analyzedDate" type="date"
                                value={analyzedDate} onChange={(e) => setAnalyzedDate(e.target.value)} required />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="appearanceOfSample" className="block text-gray-700 text-sm font-bold mb-2">
                                Appearance Of Sample
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="appearanceOfSample" id="appearanceOfSample" type="text" placeholder="Appearance Of Sample"
                                value={appearanceOfSample} onChange={(e) => setAppearanceOfSample(e.target.value)} required />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="remarks" className="block text-gray-700 text-sm font-bold mb-2">
                                Remarks
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="remarks" id="remarks" type="text" placeholder="Remarks"
                                value={remarks} onChange={(e) => setRemarks(e.target.value)} required />
                        </div>

                        <div className="flex mb-4 justify-evenly">
                            <Button type="submit" size="xl">Submit</Button>

                        </div>
                    </form>
                </Modal.Body>
            </Modal>


            <Modal show={previewModalOpen} onClose={() => setPreviewModalOpen(false)}>
                <Modal.Header>Preview</Modal.Header>
                <Modal.Body>
                    <iframe src={previewUrl} type="application/pdf" width="100%" height="870px" />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Samples