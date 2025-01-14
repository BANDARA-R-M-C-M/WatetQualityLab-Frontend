import { useState, useEffect } from 'react';
import { Button, Modal, Pagination, Dropdown } from "flowbite-react";
import { FaPlus } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { MdEdit, MdDelete, MdClose } from "react-icons/md";
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { getPHIAreas, fetchLocations, addPHIArea, getMOHAreas, updatePHIAreas, deletePHIArea } from "../../Service/AdminService";
import { useAuth } from '../../Context/useAuth';
import { useDebounce } from '../../Util/useDebounce';
import { useFormik } from 'formik';
import * as yup from 'yup';

function PHIAreas() {

    const [phiAreas, setPHIAreas] = useState([]);
    const [mohAreas, setMohAreas] = useState([]);
    const [cities, setCities] = useState([]);
    const [placeholderText, setPlaceholderText] = useState('PHI Area Name...');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchParameter, setSearchParameter] = useState('PHIAreaName');
    const [searchParameterType, setSearchParameterType] = useState('string');
    const [sortBy, setSortBy] = useState('PHIAreaName');
    const [isAscending, setIsAscending] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [updatedId, setUpdatedId] = useState(null);
    const [deletedId, setDeletedId] = useState(null);
    const [openNewModal, setOpenNewModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const { token } = useAuth();
    const debouncedSearch = useDebounce(searchTerm);

    const validationSchema = yup.object({
        phiAreaName: yup.string().required('PHI Area Name is required'),
        mohAreaId: yup.string().required('MOH Area is required'),
    });

    const formikNew = useFormik({
        initialValues: {
            phiAreaName: '',
            mohAreaId: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            await addPHIArea(values.phiAreaName, values.mohAreaId, token);
            setOpenNewModal(false);
            formikNew.resetForm();
        },
    });

    const formikEdit = useFormik({
        initialValues: {
            phiAreaName: '',
            mohAreaId: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            await updatePHIAreas(updatedId, values.phiAreaName, values.mohAreaId, token);
            setOpenEditModal(false);
            formikEdit.resetForm();
        },
    });

    useEffect(() => {
        const loadLocations = async () => {
            try {
                const cities = await fetchLocations(formikNew.values.phiAreaName);
                setCities(cities);
            } catch (error) {
                console.error('Error loading cities:', error);
            }
        };
        loadLocations();
    }, [formikNew.values.phiAreaName]);

    useEffect(() => {
        const fetchPHIAreas = async () => {
            const response = await getPHIAreas(searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, sortBy, isAscending, token);
            if (response) {
                setPHIAreas(response.data.items);
                setTotalPages(response.data.totalPages);
            } else {
                console.log("Error fetching PHI Areas");
            }
        }
        fetchPHIAreas();
    }, [openNewModal, openEditModal, openDeleteModal, pageNumber, sortBy, isAscending, debouncedSearch]);

    useEffect(() => {
        const fetchMOHAreas = async () => {
            const response = await getMOHAreas(null, null, null, null, null, null, null, token);
            if (response) {
                setMohAreas(response.data.items);
            } else {
                console.log("Error fetching PHI Area");
            }
        }
        fetchMOHAreas();
    }, []);

    const handleDelete = async (deletedId) => {
        await deletePHIArea(deletedId, token);
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
                                                setSortBy('PHIAreaName');
                                                setSearchParameter('PHIAreaName');
                                                setPlaceholderText('PHI Area Name...');
                                            }}
                                        >
                                            PHI Area Name
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() => {
                                                setSortBy('MOHAreaName');
                                                setSearchParameter('MOHAreaName');
                                                setPlaceholderText('MOH Area Name...');
                                            }}
                                        >
                                            MOH Area Name
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
                            Add PHI Area
                        </Button>
                    </div>
                </div>

                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        PHI Area Name
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Assigned MOH Area Name
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {phiAreas.map((phiArea, index) => (
                                    <tr key={index}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{phiArea.phiAreaName}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{phiArea.mohAreaName}</p>
                                        </td>
                                        <td className="border-b border-gray-200 bg-white text-sm">
                                            <Button size="xs"
                                                onClick={() => {
                                                    setOpenEditModal(true);
                                                    setUpdatedId(phiArea.phiAreaId);
                                                    formikEdit.setValues({
                                                        phiAreaName: phiArea.phiAreaName,
                                                        mohAreaId: phiArea.mohAreaId,
                                                    });
                                                }}
                                            >
                                                <MdEdit size={25} />
                                            </Button>
                                        </td>
                                        <td className="border-b border-gray-200 bg-white text-sm">
                                            <Button size="xs" color="failure"
                                                onClick={() => { setOpenDeleteModal(true), setDeletedId(phiArea.phiAreaId) }}
                                            >
                                                <MdDelete size={25} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {phiAreas.length > 0 && (
                        <div className="flex overflow-x-auto sm:justify-center">
                            <Pagination currentPage={pageNumber} totalPages={totalPages} onPageChange={(page) => { setPageNumber(page) }} showIcons />
                        </div>
                    )}
                </div>
            </div>

            <Modal show={openNewModal} onClose={() => {
                setOpenNewModal(false);
                formikNew.resetForm();
            }}>
                <Modal.Header>Add PHI Area</Modal.Header>
                <Modal.Body>
                    <form onSubmit={formikNew.handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="phiAreaName" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                PHI Area Name
                            </label>
                            <input type="text"
                                id="phiAreaName"
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formikNew.touched.phiAreaName && formikNew.errors.phiAreaName ? 'border-red-500' : ''}`}
                                list="citySuggestions"
                                {...formikNew.getFieldProps('phiAreaName')}
                            />
                            <datalist id="citySuggestions">
                                {cities.map((city, index) => (
                                    <option key={index} value={city} />
                                ))}
                            </datalist>
                            {formikNew.errors.phiAreaName && formikNew.touched.phiAreaName && (
                                <p className="text-red-500 text-xs italic">{formikNew.errors.phiAreaName}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="mohAreaId" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                MOH Area
                            </label>
                            <select
                                id="mohAreaId"
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formikNew.touched.mohAreaId && formikNew.errors.mohAreaId ? 'border-red-500' : ''}`}
                                {...formikNew.getFieldProps('mohAreaId')}
                            >
                                <option value="">Select MOH Area</option>
                                {mohAreas.map((mohArea) => (
                                    <option key={mohArea.mohAreaId} value={mohArea.mohAreaId}>
                                        {mohArea.mohAreaName}
                                    </option>
                                ))}
                            </select>
                            {formikNew.errors.mohAreaId && formikNew.touched.mohAreaId && (
                                <p className="text-red-500 text-xs italic">{formikNew.errors.mohAreaId}</p>
                            )}
                        </div>
                        <div className="flex items-center justify-center">
                            <Button type="submit" size="xl">Submit</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal show={openEditModal} onClose={() => {
                setOpenEditModal(false);
                formikEdit.resetForm();
            }}>
                <Modal.Header>Edit PHI Area</Modal.Header>
                <Modal.Body>
                    <form onSubmit={formikEdit.handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="phiAreaName" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                PHI Area Name
                            </label>
                            <input
                                type="text"
                                id="phiAreaName"
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formikNew.touched.phiAreaName && formikNew.errors.phiAreaName ? 'border-red-500' : ''}`}
                                {...formikEdit.getFieldProps('phiAreaName')}
                            />
                            {formikEdit.errors.phiAreaName && formikEdit.touched.phiAreaName && (
                                <p className="text-red-500 text-xs italic">{formikEdit.errors.phiAreaName}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="mohAreaId" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                MOH Area
                            </label>
                            <select
                                id="mohAreaId"
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formikNew.touched.mohAreaId && formikNew.errors.mohAreaId ? 'border-red-500' : ''}`}
                                {...formikEdit.getFieldProps('mohAreaId')}
                            >
                                <option value="">Select MOH Area</option>
                                {mohAreas.map((mohArea) => (
                                    <option key={mohArea.mohAreaId} value={mohArea.mohAreaId}>
                                        {mohArea.mohAreaName}
                                    </option>
                                ))}
                            </select>
                            {formikEdit.errors.mohAreaId && formikEdit.touched.mohAreaId && (
                                <p className="text-red-500 text-xs italic">{formikEdit.errors.mohAreaId}</p>
                            )}
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
                            Are you sure you want to delete this PHI Area?
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

export default PHIAreas;
