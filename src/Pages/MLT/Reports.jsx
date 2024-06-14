import React, { useState, useEffect } from 'react';
import { useAuth } from "../../Context/useAuth";
import { useDebounce } from '../../Util/useDebounce';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateWCReport, getComments, getAddedReports, getReportPDF, deleteWCReport } from "../../Service/MLTService";
import { Button, Modal, Pagination, Dropdown } from "flowbite-react";
import { MdEdit, MdDelete, MdClose } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";

function WCReports() {

    const [reports, setReports] = useState([]);
    // const [myRefNo, setMyRefNo] = useState('');
    // const [presumptiveColiformCount, setPresumptiveColiformCount] = useState('');
    // const [ecoliCount, setEcoliCount] = useState('');
    // const [appearanceOfSample, setAppearanceOfSample] = useState('');
    // const [remarks, setRemarks] = useState('');
    // const [isContaminated, setIsContaminated] = useState(null);
    const [reportUrl, setReportUrl] = useState('');
    const [comments, setComments] = useState([]);
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

    const { user, token } = useAuth();
    const debouncedSearch = useDebounce(searchTerm);

    const validationSchema = Yup.object({
        myRefNo: Yup.string().required('My Ref No is required'),
        presumptiveColiformCount: Yup.string().required('Presumptive Coliform Count is required'),
        ecoliCount: Yup.string().required('Ecoli Count is required'),
        appearanceOfSample: Yup.string().required('Appearance Of Sample is required'),
        remarks: Yup.string().required('Remarks are required'),
        isContaminated: Yup.boolean().required('Contamination Status is required')
    });

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await getAddedReports(user.userId, searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, sortBy, isAscending, token);
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

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await getComments(token);
                if (response) {
                    setComments(response.data);
                }
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };
        fetchComments();
    }, []);

    const handlePreview = async (reportId) => {
        const response = await getReportPDF(reportId, token);
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setReportUrl(pdfUrl);
    };

    const handleDelete = async (deletedId) => {
        await deleteWCReport(deletedId, token);

        setOpenDeleteModal(false);
    };

    const formik = useFormik({
        initialValues: {
            myRefNo: '',
            presumptiveColiformCount: '',
            ecoliCount: '',
            analyzedDate: '',
            appearanceOfSample: '',
            remarks: '',
            isContaminated: null,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            await updateWCReport(
                updatedId,
                values.myRefNo,
                values.appearanceOfSample,
                values.presumptiveColiformCount,
                values.ecoliCount,
                values.remarks,
                values.isContaminated,
                token
            );
            openEditModal(false);
            formik.resetForm();
        },
        enableReinitialize: true,
    });

    return (
        <div className="bg-white rounded-md w-full">
            <h1 className="text-center text-4xl font-bold mb-7">Water Quality Reports</h1>
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
                                    Appearance of Sample
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
                                        <p className="text-gray-900 whitespace-no-wrap">{report.appearanceOfSample}</p>
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
                                                formik.setValues({
                                                    myRefNo: report.myRefNo,
                                                    presumptiveColiformCount: report.presumptiveColiformCount,
                                                    ecoliCount: report.ecoliCount,
                                                    analyzedDate: report.analyzedDate,
                                                    appearanceOfSample: report.appearanceOfSample,
                                                    remarks: report.remarks,
                                                    isContaminated: report.contaminated
                                                });
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

            <Modal show={openEditModal} onClose={() => {
                setOpenEditModal(false);
                formik.resetForm();
            }}>
                <Modal.Header>Report</Modal.Header>
                <Modal.Body>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="myRefNo" className="block text-gray-700 text-sm font-bold mb-2">
                                My Ref No
                            </label>
                            <input
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formik.touched.myRefNo && formik.errors.myRefNo ? 'border-red-500' : ''}`}
                                id="myRefNo"
                                type="text"
                                {...formik.getFieldProps('myRefNo')}
                            />
                            {formik.touched.myRefNo && formik.errors.myRefNo ? (
                                <p className="text-red-500 text-xs italic">{formik.errors.myRefNo}</p>
                            ) : null}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="presumptiveColiformCount" className="block text-gray-700 text-sm font-bold mb-2">
                                Presumptive Coliform Count
                            </label>
                            <input
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formik.touched.presumptiveColiformCount && formik.errors.presumptiveColiformCount ? 'border-red-500' : ''}`}
                                id="presumptiveColiformCount"
                                type="text"
                                {...formik.getFieldProps('presumptiveColiformCount')}
                            />
                            {formik.touched.presumptiveColiformCount && formik.errors.presumptiveColiformCount ? (
                                <p className="text-red-500 text-xs italic">{formik.errors.presumptiveColiformCount}</p>
                            ) : null}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="ecoliCount" className="block text-gray-700 text-sm font-bold mb-2">
                                Ecoli Count
                            </label>
                            <input
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formik.touched.ecoliCount && formik.errors.ecoliCount ? 'border-red-500' : ''}`}
                                id="ecoliCount"
                                type="text"
                                {...formik.getFieldProps('ecoliCount')}
                            />
                            {formik.touched.ecoliCount && formik.errors.ecoliCount ? (
                                <p className="text-red-500 text-xs italic">{formik.errors.ecoliCount}</p>
                            ) : null}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="analyzedDate" className="block text-gray-700 text-sm font-bold mb-2">
                                Analyzed Date
                            </label>
                            <input
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formik.touched.analyzedDate && formik.errors.analyzedDate ? 'border-red-500' : ''}`}
                                id="analyzedDate"
                                type="date"
                                min={`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-01`}
                                max={`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()}`}
                                {...formik.getFieldProps('analyzedDate')}
                            />
                            {formik.touched.analyzedDate && formik.errors.analyzedDate ? (
                                <p className="text-red-500 text-xs italic">{formik.errors.analyzedDate}</p>
                            ) : null}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="appearanceOfSample" className="block text-gray-700 text-sm font-bold mb-2">
                                Appearance Of Sample
                            </label>
                            <input
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formik.touched.appearanceOfSample && formik.errors.appearanceOfSample ? 'border-red-500' : ''}`}
                                id="appearanceOfSample"
                                type="text"
                                {...formik.getFieldProps('appearanceOfSample')}
                            />
                            {formik.touched.appearanceOfSample && formik.errors.appearanceOfSample ? (
                                <p className="text-red-500 text-xs italic">{formik.errors.appearanceOfSample}</p>
                            ) : null}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="remarks" className="block text-gray-700 text-sm font-bold mb-2">
                                Remarks
                            </label>
                            <select
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formik.touched.remarks && formik.errors.remarks ? 'border-red-500' : ''}`}
                                id="remarks"
                                {...formik.getFieldProps('remarks')}
                            >
                                <option value="" disabled>Select a comment</option>
                                {comments.map((comment, index) => (
                                    <option key={index} value={comment.feedback}>{comment.feedback}</option>
                                ))}
                            </select>
                            {formik.touched.remarks && formik.errors.remarks ? (
                                <p className="text-red-500 text-xs italic">{formik.errors.remarks}</p>
                            ) : null}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Contamination Status</label>
                            <div className="flex items-center">
                                <input
                                    className="mr-2 leading-tight"
                                    type="radio"
                                    id="contaminatedTrue"
                                    name="isContaminated"
                                    value="true"
                                    checked={formik.values.isContaminated === true}
                                    onChange={() => formik.setFieldValue('isContaminated', true)}
                                />
                                <label htmlFor="contaminatedTrue" className="text-gray-700">True</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    className="mr-2 leading-tight"
                                    type="radio"
                                    id="contaminatedFalse"
                                    name="isContaminated"
                                    value="false"
                                    checked={formik.values.isContaminated === false}
                                    onChange={() => formik.setFieldValue('isContaminated', false)}
                                />
                                <label htmlFor="contaminatedFalse" className="text-gray-700">False</label>
                            </div>
                            {formik.touched.isContaminated && formik.errors.isContaminated ? (
                                <p className="text-red-500 text-xs italic">{formik.errors.isContaminated}</p>
                            ) : null}
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