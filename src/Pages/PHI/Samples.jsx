import React, { useState, useEffect } from 'react';
import { Button, Modal, Pagination, Dropdown } from "flowbite-react";
import { FaPlus, FaSearch } from "react-icons/fa";
import { MdEdit, MdDelete, MdClose } from "react-icons/md";
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { getPHIDetails, submitSample, getAddedSamples, updateWCSample, deleteWCSample } from '../../Service/PHIService';
import { useAuth } from '../../Context/useAuth';
import { useDebounce } from '../../Util/useDebounce';

function Samples() {
    const [samples, setSamples] = useState([]);
    const [phiAreaId, setPhiAreaId] = useState('');
    const [phiAreaName, setPhiAreaName] = useState('');
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

    const { user, token } = useAuth();
    const debouncedSearch = useDebounce(searchTerm);

    const sampleSchema = yup.object().shape({
        yourRefNo: yup.string().required('Your Ref No is required')
            .matches(/^[A-Z]{2}\([A-Z]{2}\)\/PHI\/\d{2}\/\d{4}$/, 'Your Ref No must follow the format "XX(XX)/PHI/XX/XXXX"'),
        dateOfCollection: yup.date().required('Date of Collection is required'),
        catagoryOfSource: yup.string().required('Category of Source is required'),
        collectingSource: yup.string().required('Collecting Source is required'),
        stateOfChlorination: yup.string().required('State of Chlorination is required')
            .max(10, 'State of Chlorination must be less than 10 characters')
    }); 

    useEffect(() => {
        const fetchAddedSamples = async () => {
            try {
                const response = await getAddedSamples(user.userId, searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, sortBy, isAscending, token);
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
        getPHIDetails(user.userId, token).then((response) => {
            setPhiAreaId(response.data.phiAreaId);
            setPhiAreaName(response.data.phiAreaName);
        });
    }, []);

    const formikNew = useFormik({
        initialValues: {
            yourRefNo: '',
            dateOfCollection: '',
            catagoryOfSource: '',
            collectingSource: '',
            stateOfChlorination: '',
        },
        validationSchema: sampleSchema,
        onSubmit: async (values) => {
            await submitSample(
                values.yourRefNo,
                values.dateOfCollection,
                values.catagoryOfSource,
                values.collectingSource,
                values.stateOfChlorination,
                user.userId,
                phiAreaId,
                phiAreaName,
                token
            );
            formikNew.resetForm();
            setOpenNewModal(false);
        }
    });

    const formikEdit = useFormik({
        initialValues: {
            yourRefNo: '',
            dateOfCollection: '',
            catagoryOfSource: '',
            collectingSource: '',
            stateOfChlorination: '',
        },
        validationSchema: sampleSchema,
        onSubmit: async (values) => {
            await updateWCSample(
                updatedId,
                values.yourRefNo,
                values.dateOfCollection,
                values.catagoryOfSource,
                values.collectingSource,
                values.stateOfChlorination,
                token
            );
            formikEdit.resetForm();
            setOpenEditModal(false);
        },
        enableReinitialize: true
    });

    const handleDelete = async (deletedId) => {
        await deleteWCSample(deletedId, token);
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
                                formikNew.resetForm();
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
                                        Your Ref No
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Date of Collection
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        PHI Area Name
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
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {samples.map((sample) => (
                                    <tr key={sample.sampleId}>
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
                                        <td className="border-b border-gray-200 bg-white text-sm">
                                            <Button size="xs"
                                                onClick={() => {
                                                    setOpenEditModal(true);
                                                    setUpdatedId(sample.sampleId);
                                                    formikEdit.setValues({
                                                        yourRefNo: sample.yourRefNo,
                                                        dateOfCollection: sample.dateOfCollection,
                                                        catagoryOfSource: sample.catagoryOfSource,
                                                        collectingSource: sample.collectingSource,
                                                        stateOfChlorination: sample.stateOfChlorination,
                                                    });
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
                <Modal.Header>New Sample</Modal.Header>
                <Modal.Body>
                    <form onSubmit={formikNew.handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="yourRefNo">
                                Your Ref No
                            </label>
                            <input
                                id="yourRefNo"
                                type="text"
                                {...formikNew.getFieldProps('yourRefNo')}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formikNew.touched.yourRefNo && formikNew.errors.yourRefNo ? 'border-red-500' : ''}`}
                            />
                            {formikNew.touched.yourRefNo && formikNew.errors.yourRefNo ? (
                                <p className="text-red-500 text-xs italic">{formikNew.errors.yourRefNo}</p>
                            ) : null}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateOfCollection">
                                Date of Collection
                            </label>
                            <input
                                id="dateOfCollection"
                                type="date"
                                min={`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-01`}
                                max={`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()}`}
                                {...formikNew.getFieldProps('dateOfCollection')}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formikNew.touched.dateOfCollection && formikNew.errors.dateOfCollection ? 'border-red-500' : ''}`}
                            />
                            {formikNew.touched.dateOfCollection && formikNew.errors.dateOfCollection ? (
                                <p className="text-red-500 text-xs italic">{formikNew.errors.dateOfCollection}</p>
                            ) : null}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="catagoryOfSource">
                                Category of Source
                            </label>
                            <input
                                id="catagoryOfSource"
                                type="text"
                                {...formikNew.getFieldProps('catagoryOfSource')}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formikNew.touched.catagoryOfSource && formikNew.errors.catagoryOfSource ? 'border-red-500' : ''}`}
                            />
                            {formikNew.touched.catagoryOfSource && formikNew.errors.catagoryOfSource ? (
                                <p className="text-red-500 text-xs italic">{formikNew.errors.catagoryOfSource}</p>
                            ) : null}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="collectingSource">
                                Collecting Source
                            </label>
                            <input
                                id="collectingSource"
                                type="text"
                                {...formikNew.getFieldProps('collectingSource')}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formikNew.touched.collectingSource && formikNew.errors.collectingSource ? 'border-red-500' : ''}`}
                            />
                            {formikNew.touched.collectingSource && formikNew.errors.collectingSource ? (
                                <p className="text-red-500 text-xs italic">{formikNew.errors.collectingSource}</p>
                            ) : null}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stateOfChlorination">
                                State of Chlorination
                            </label>
                            <input
                                id="stateOfChlorination"
                                type="text"
                                {...formikNew.getFieldProps('stateOfChlorination')}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formikNew.touched.stateOfChlorination && formikNew.errors.stateOfChlorination ? 'border-red-500' : ''}`}
                            />
                            {formikNew.touched.stateOfChlorination && formikNew.errors.stateOfChlorination ? (
                                <p className="text-red-500 text-xs italic">{formikNew.errors.stateOfChlorination}</p>
                            ) : null}
                        </div>
                        <div className="flex items-center justify-between">
                            <Button type="submit">Submit</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal show={openEditModal} onClose={() => setOpenEditModal(false)}>
                <Modal.Header>Edit Sample</Modal.Header>
                <Modal.Body>
                    <form onSubmit={formikEdit.handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="yourRefNo">
                                Your Ref No
                            </label>
                            <input
                                id="yourRefNo"
                                type="text"
                                {...formikEdit.getFieldProps('yourRefNo')}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formikEdit.touched.yourRefNo && formikEdit.errors.yourRefNo ? 'border-red-500' : ''}`}
                            />
                            {formikEdit.touched.yourRefNo && formikEdit.errors.yourRefNo ? (
                                <p className="text-red-500 text-xs italic">{formikEdit.errors.yourRefNo}</p>
                            ) : null}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateOfCollection">
                                Date of Collection
                            </label>
                            <input
                                id="dateOfCollection"
                                type="date"
                                min={`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-01`}
                                max={`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()}`}
                                {...formikEdit.getFieldProps('dateOfCollection')}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formikEdit.touched.dateOfCollection && formikEdit.errors.dateOfCollection ? 'border-red-500' : ''}`}
                            />
                            {formikEdit.touched.dateOfCollection && formikEdit.errors.dateOfCollection ? (
                                <p className="text-red-500 text-xs italic">{formikEdit.errors.dateOfCollection}</p>
                            ) : null}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="catagoryOfSource">
                                Category of Source
                            </label>
                            <input
                                id="catagoryOfSource"
                                type="text"
                                {...formikEdit.getFieldProps('catagoryOfSource')}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formikEdit.touched.catagoryOfSource && formikEdit.errors.catagoryOfSource ? 'border-red-500' : ''}`}
                            />
                            {formikEdit.touched.catagoryOfSource && formikEdit.errors.catagoryOfSource ? (
                                <p className="text-red-500 text-xs italic">{formikEdit.errors.catagoryOfSource}</p>
                            ) : null}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="collectingSource">
                                Collecting Source
                            </label>
                            <input
                                id="collectingSource"
                                type="text"
                                {...formikEdit.getFieldProps('collectingSource')}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formikEdit.touched.collectingSource && formikEdit.errors.collectingSource ? 'border-red-500' : ''}`}
                            />
                            {formikEdit.touched.collectingSource && formikEdit.errors.collectingSource ? (
                                <p className="text-red-500 text-xs italic">{formikEdit.errors.collectingSource}</p>
                            ) : null}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stateOfChlorination">
                                State of Chlorination
                            </label>
                            <input
                                id="stateOfChlorination"
                                type="text"
                                {...formikEdit.getFieldProps('stateOfChlorination')}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formikEdit.touched.stateOfChlorination && formikEdit.errors.stateOfChlorination ? 'border-red-500' : ''}`}
                            />
                            {formikEdit.touched.stateOfChlorination && formikEdit.errors.stateOfChlorination ? (
                                <p className="text-red-500 text-xs italic">{formikEdit.errors.stateOfChlorination}</p>
                            ) : null}
                        </div>
                        <div className="flex items-center justify-between">
                            <Button type="submit">Submit</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal show={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
                <Modal.Header>Delete Sample</Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500">
                            Are you sure you want to delete this sample?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button
                                color="failure"
                                onClick={() => handleDelete(deletedId)}
                            >
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

export default Samples;