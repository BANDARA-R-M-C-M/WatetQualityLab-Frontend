import React, { useState, useEffect } from 'react';
import { useAuth } from "../../Context/useAuth";
import { useDebounce } from '../../Util/useDebounce';
import { updateWCReport, getAddedReports, getReportPDF, deleteWCReport } from "../../Service/MLTService";
import { Button, Modal, Pagination, Dropdown } from "flowbite-react";
import { MdEdit, MdDelete, MdClose } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";

function WCReports() {

    const [reports, setReports] = useState([]);
    const [myRefNo, setMyRefNo] = useState('');
    const [presumptiveColiformCount, setPresumptiveColiformCount] = useState('');
    const [ecoliCount, setEcoliCount] = useState('');
    const [appearanceOfSample, setAppearanceOfSample] = useState('');
    const [remarks, setRemarks] = useState('');
    const [reportUrl, setReportUrl] = useState('');
    const [placeholderText, setPlaceholderText] = useState('My Ref No...');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchParameter, setSearchParameter] = useState('MyRefNo');
    const [searchParameterType, setSearchParameterType] = useState('string');
    const [sortBy, setSortBy] = useState('MyRefNo');
    const [isAscending, setIsAscending] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [updatedId, setUpdatedId] = useState('');
    const [deletedId, setDeletedId] = useState('');
    const [openPreviewModal, setOpenPreviewModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const { user } = useAuth();
    const debouncedSearch = useDebounce(searchTerm, 750);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await getAddedReports(user.userId, searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, sortBy, isAscending);
                if (response) {
                    setReports(response.data.items);
                    setTotalPages(response.data.totalPages);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchReports();
    }, [openEditModal, openDeleteModal, pageNumber, sortBy, isAscending, debouncedSearch]);

    const handlePreview = async (reportId) => {
        const response = await getReportPDF(reportId);
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setReportUrl(pdfUrl);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            await updateWCReport(updatedId, myRefNo, appearanceOfSample, presumptiveColiformCount, ecoliCount, remarks);
            alert('Report updated successfully');
        } catch (error) {
            console.error('Error submitting report:', error);
            alert('Failed to update report');
        }

        setMyRefNo('');
        setPresumptiveColiformCount('');
        setEcoliCount('');
        setAppearanceOfSample('');
        setRemarks('');

        setOpenEditModal(false);
    };

    const handleDelete = async (deletedId) => {
        try {
            await deleteWCReport(deletedId);
            alert('Sample deleted successfully');
        } catch (error) {
            console.error('Error deleting sample:', error);
            alert('Failed to delete sample');
        }

        setOpenDeleteModal(false);
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
                                        setSortBy('MyRefNo');
                                        setSearchParameter('MyRefNo');
                                        setPlaceholderText('My Ref No...');
                                    }}
                                >
                                    My Ref No
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => {
                                        setSortBy('IssuedDate');
                                        setSearchParameter('IssuedDate');
                                        setSearchParameterType('DateOnly');
                                        setPlaceholderText('Issued Date...');
                                    }}
                                >
                                    Issued Date
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => {
                                        setSortBy('MOHAreaName');
                                        setSearchParameter('MOHAreaName');
                                        setPlaceholderText('MOHAreaName...');
                                    }}
                                >
                                    MOH Area Name
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
                                        setSortBy('EcoliCount');
                                        setSearchParameter('EcoliCount');
                                        setSearchParameterType('int');
                                        setPlaceholderText('Ecoli Count...');
                                    }}
                                >
                                    Ecoli Count
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => {
                                        setSortBy('PresumptiveColiformCount');
                                        setSearchParameter('PresumptiveColiformCount');
                                        setSearchParameterType('int');
                                        setPlaceholderText('Presumptive Coliform Count...');
                                    }}
                                >
                                    Presumptive Coliform Count
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => {
                                        setSortBy('AppearanceOfSample');
                                        setSearchParameter('AppearanceOfSample');
                                        setPlaceholderText('Appearance Of Sample...');
                                    }}
                                >
                                    Appearance Of Sample
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => {
                                        setSortBy('Remarks');
                                        setSearchParameter('Remarks');
                                        setPlaceholderText('Remarks...');
                                    }}
                                >
                                    Remarks
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
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Report Id
                                </th> */}
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    My Ref No
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Issued Date
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    MOH Area
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Phi Area
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Presumptive Coliform Count
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    E coli Count
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Remarks
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((report, index) => (
                                <tr key={index}>
                                    {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{report.sampleId}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{report.reportRefId}</p>
                                    </td> */}
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{report.myRefNo}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{report.issuedDate}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{report.mohAreaName}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{report.phiAreaName}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{report.presumptiveColiformCount}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{report.ecoliCount}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{report.remarks}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <Button onClick={() => {
                                            setOpenPreviewModal(true);
                                            handlePreview(report.reportRefId);
                                        }}>
                                            <TbReportAnalytics className="mr-2 h-5 w-5" />
                                            View
                                        </Button>
                                    </td>
                                    <td className="border-b border-gray-200 bg-white text-sm">
                                        <Button size="xs"
                                            onClick={() => {
                                                setOpenEditModal(true);
                                                setUpdatedId(report.reportRefId);
                                                setMyRefNo(report.myRefNo);
                                                setPresumptiveColiformCount(report.presumptiveColiformCount);
                                                setEcoliCount(report.ecoliCount);
                                                setAppearanceOfSample(report.appearanceOfSample);
                                                setRemarks(report.remarks);
                                            }}>
                                            <MdEdit size={25} />
                                        </Button>
                                    </td>
                                    <td className="border-b border-gray-200 bg-white text-sm">
                                        <Button size="xs" color="failure"
                                            onClick={() => {
                                                setOpenDeleteModal(true);
                                                setDeletedId(report.reportRefId);
                                            }}>
                                            <MdDelete size={25} />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {reports.length > 0 && (
                    <div className="flex overflow-x-auto sm:justify-center">
                        <Pagination currentPage={pageNumber} totalPages={totalPages} onPageChange={(page) => { setPageNumber(page) }} showIcons />
                    </div>
                )}
            </div>

            <Modal show={openPreviewModal} onClose={() => setOpenPreviewModal(false)}>
                <Modal.Header>Report Preview</Modal.Header>
                <Modal.Body>
                    <embed src={reportUrl} type="application/pdf" width={100 + '%'} height={500 + 'px'} />
                </Modal.Body>
            </Modal>

            <Modal show={openEditModal} onClose={() => setOpenEditModal(false)}>
                <Modal.Header>Edit Report</Modal.Header>
                <form onSubmit={handleUpdate} >
                    <div className="m-4">
                        <label htmlFor="myRefNo" className="block text-gray-700 text-sm font-bold mb-2">
                            My Ref No
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="myRefNo" id="myRefNo" type="text" placeholder="My Ref No"
                            value={myRefNo} onChange={(e) => setMyRefNo(e.target.value)} required />
                    </div>

                    <div className="m-4">
                        <label htmlFor="presumptiveColiformCount" className="block text-gray-700 text-sm font-bold mb-2">
                            Presumptive Coliform Count
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="presumptiveColiformCount" id="presumptiveColiformCount" type="number" placeholder="Presumptive Coliform Count"
                            value={presumptiveColiformCount} onChange={(e) => setPresumptiveColiformCount(e.target.value)} required />
                    </div>

                    <div className="m-4">
                        <label htmlFor="ecoliCount" className="block text-gray-700 text-sm font-bold mb-2">
                            Ecoli Count
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="ecoliCount" id="ecoliCount" type="number" placeholder="Ecoli Count"
                            value={ecoliCount} onChange={(e) => setEcoliCount(e.target.value)} required />
                    </div>

                    <div className="m-4">
                        <label htmlFor="appearanceOfSample" className="block text-gray-700 text-sm font-bold mb-2">
                            Appearance Of Sample
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="appearanceOfSample" id="appearanceOfSample" type="text" placeholder="Appearance Of Sample"
                            value={appearanceOfSample} onChange={(e) => setAppearanceOfSample(e.target.value)} required />
                    </div>

                    <div className="m-4">
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
            </Modal>

            <Modal show={openDeleteModal} size="md" onClose={() => setOpenDeleteModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this report?
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
        </div>
    );
}

export default WCReports