import React, { useState, useEffect } from 'react';
import { useAuth } from "../../Context/useAuth";
import { useDebounce } from '../../Util/useDebounce';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getAcceptedSamples, getComments, submitReport, updateStatus } from "../../Service/MLTService";
import { Button, Modal, Pagination, Dropdown } from "flowbite-react";
import { MdClose } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";

function Samples() {

    const [samples, setSamples] = useState([]);
    // const [myRefNo, setMyRefNo] = useState('');
    // const [presumptiveColiformCount, setPresumptiveColiformCount] = useState('');
    // const [issuedDate, setIssuedDate] = useState('');
    // const [ecoliCount, setEcoliCount] = useState('');
    // const [appearanceOfSample, setAppearanceOfSample] = useState('');
    // const [remarks, setRemarks] = useState('');
    const [comments, setComments] = useState([]);
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
    // const [stateOfChlorination, setStateOfChlorination] = useState('');
    // const [collectingSource, setCollectingSource] = useState('');
    // const [DateOfCollection, setDateOfCollection] = useState('');
    // const [analyzedDate, setAnalyzedDate] = useState('');
    // const [isContaminated, setIsContaminated] = useState(null);
    // const [labName, setLabName] = useState('');
    // const [labLocation, setLabLocation] = useState('');
    // const [labTelephone, setLabTelephone] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [previewModalOpen, setPreviewModalOpen] = useState(false);
    const [previewUrl, setPreviewUrl] = useState('');

    const { user, token } = useAuth();
    const debouncedSearch = useDebounce(searchTerm);

    const validationSchema = Yup.object({
        myRefNo: Yup.string().required('My Ref No is required')
            .matches(/^\d{4}\/\d{2}\/\d{2}$/, 'My Ref No must follow the format "XXXX/XX/XX"'),
        presumptiveColiformCount: Yup.number().required('Presumptive Coliform Count is required'),
        ecoliCount: Yup.number().required('Ecoli Count is required'),
        analyzedDate: Yup.date().required('Analyzed Date is required'),
        appearanceOfSample: Yup.string().required('Appearance Of Sample is required'),
        remarks: Yup.string().required('Remarks are required'),
        isContaminated: Yup.boolean().required('Contamination Status is required')
    });

    useEffect(() => {
        const fetchSamples = async () => {
            try {
                const response = await getAcceptedSamples(user.userId, debouncedSearch, searchParameter, searchParameterType, pageNumber, pageSize, sortBy, isAscending, token);
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

    const handleRemove = async (removedId) => {
        try {
            await updateStatus(removedId, 'Pending', "", token);
            const updatedSamples = samples.filter(sample => sample.sampleId !== removedId);
            setSamples(updatedSamples);
        } catch (error) {
            console.error('Error remove sample:', error);
        }
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
            await submitReport(
                values.myRefNo,
                values.presumptiveColiformCount,
                values.analyzedDate,
                values.ecoliCount,
                values.appearanceOfSample,
                values.remarks,
                values.isContaminated,
                user.userId,
                sampleId,
                labId,
                token
            );
            setOpenModal(false);
            formik.resetForm();
        },
    });

    return (
        <>
            <div className="bg-white rounded-md w-full">
                <h1 className="text-center text-4xl font-bold mb-7">Pending Samples</h1>
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
                                    type="number"
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
                                    type="number"
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


                <Modal show={previewModalOpen} onClose={() => setPreviewModalOpen(false)}>
                    <Modal.Header>Preview</Modal.Header>
                    <Modal.Body>
                        <iframe src={previewUrl} type="application/pdf" width="100%" height="870px" />
                    </Modal.Body>
                </Modal>
            </div>
        </>
    );
}

export default Samples