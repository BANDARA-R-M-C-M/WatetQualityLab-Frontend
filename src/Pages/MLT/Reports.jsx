import React, { useState, useEffect } from 'react';
import { useAuth } from "../../Context/useAuth";
import { updateWCReport, getAddedReports, getReportrPDF, deleteWCReport } from "../../Service/MLTService";
import { Button, Modal } from "flowbite-react";
import { MdEdit, MdDelete } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { HiOutlineExclamationCircle } from "react-icons/hi";

function WCReports() {

    const [reports, setReports] = useState([]);
    const [myRefNo, setMyRefNo] = useState('');
    const [presumptiveColiformCount, setPresumptiveColiformCount] = useState('');
    const [ecoliCount, setEcoliCount] = useState('');
    const [appearanceOfSample, setAppearanceOfSample] = useState('');
    const [remarks, setRemarks] = useState('');
    const [reportUrl, setReportUrl] = useState('');
    const [updatedId, setUpdatedId] = useState('');
    const [deletedId, setDeletedId] = useState('');
    const [openPreviewModal, setOpenPreviewModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const { user } = useAuth();

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await getAddedReports(user.userId);
                if (response) {
                    setReports(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchReports();
    }, [openEditModal, openDeleteModal]);

    const handlePreview = async (reportId) => {
        const response = await getReportrPDF(reportId);
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
                    <div className="flex bg-gray-50 items-center p-2 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd" />
                        </svg>
                        <input className="bg-gray-50 outline-none ml-1 block " type="text" name="" id="" placeholder="search..." />
                    </div>
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
                                    Report Id
                                </th>
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
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{report.sampleId}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{report.reportRefId}</p>
                                    </td>
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
                                            <TbReportAnalytics className="mr-2 h-5 w-5"/>
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
                                            <MdEdit size={25}/>
                                        </Button>
                                    </td>
                                    <td className="border-b border-gray-200 bg-white text-sm">
                                        <Button size="xs" color="failure"
                                        onClick={() => {
                                            setOpenDeleteModal(true);
                                            setDeletedId(report.reportRefId);
                                        }}>
                                            <MdDelete size={25}/>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
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
                            name="presumptiveColiformCount" id="presumptiveColiformCount" type="text" placeholder="Presumptive Coliform Count"
                            value={presumptiveColiformCount} onChange={(e) => setPresumptiveColiformCount(e.target.value)} required />
                    </div>

                    <div className="m-4">
                        <label htmlFor="ecoliCount" className="block text-gray-700 text-sm font-bold mb-2">
                            Ecoli Count
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="ecoliCount" id="ecoliCount" type="text" placeholder="Ecoli Count"
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