import { useState, useEffect } from 'react';
import { Button, Modal, Pagination, Dropdown } from "flowbite-react";
import { FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { MdEdit, MdDelete, MdClose } from "react-icons/md";
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { registerUser, getMOHSupervisors, getMOHAreas, assignMOHSupervisortoMOHAreas, deleteUser } from "../../Service/AdminService";
import { useAuth } from '../../Context/useAuth';
import { useDebounce } from '../../Util/useDebounce';
import { useFormik } from 'formik';
import * as yup from 'yup';

function MOHSupervisor() {

    const [mohSupervisors, setMohSupevisors] = useState([]);
    const [mohAreas, setMohAreas] = useState([]);
    const [mohAreaId, setMohAreaId] = useState('');
    const [placeholderText, setPlaceholderText] = useState('Identity Number...');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchParameter, setSearchParameter] = useState('ID');
    const [searchParameterType, setSearchParameterType] = useState('string');
    const [sortBy, setSortBy] = useState('ID');
    const [isAscending, setIsAscending] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [assignId, setAssignId] = useState('');
    const [deletedId, setDeletedId] = useState(null);
    const [openNewModal, setOpenNewModal] = useState(false);
    const [openAssignModal, setOpenAssignModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const { token } = useAuth();
    const debouncedSearch = useDebounce(searchTerm);

    const validationSchema = yup.object({
        id: yup.string().required('Identity Card Number is required')
            .matches(/^\d{12}$|^\d{9}[vV]$/, 'Invalid Identity Card Number format'),
        userName: yup.string().required('Name is required')
            .max(30, 'Name should not exceed 30 characters'),
        password: yup.string().required('Password is required')
            .min(8, 'Password should be at least 8 characters')
            .max(12, 'Password should not exceed 12 characters'),
        email: yup.string().required('Email is required')
            .email('Invalid email address'),
        phoneNumber: yup.string().required('Telephone is required')
            .matches(/^\d{10}$/, 'Invalid phone number format')
    });

    useEffect(() => {
        const fetchMOHSupervisors = async () => {
            const response = await getMOHSupervisors(searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, sortBy, isAscending, token);
            if (response) {
                setMohSupevisors(response.data.items);
                setTotalPages(response.data.totalPages);
            } else {
                console.log("Error fetching MOH Supervisors");
            }
        }
        fetchMOHSupervisors();
    }, [openNewModal, openAssignModal, openDeleteModal, pageNumber, sortBy, isAscending, debouncedSearch]);

    useEffect(() => {
        const fetchMOHAreas = async () => {
            const response = await getMOHAreas(null, null, null, null, null, null, null, token);
            if (response) {
                setMohAreas(response.data.items);
            } else {
                console.log("Error fetching MOH Areas");
            }
        }
        fetchMOHAreas();
    }, []);

    const formikNew = useFormik({
        initialValues: {
            id: '',
            userName: '',
            password: '',
            email: '',
            phoneNumber: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            await registerUser(values.id, values.userName, values.password, values.email, values.phoneNumber, 'MOH_Supervisor', token);
            formikNew.resetForm();
            setOpenNewModal(false);
        },
    });

    const handleAssign = async (e) => {
        e.preventDefault();

        await assignMOHSupervisortoMOHAreas(assignId, mohAreaId, token);
        setMohAreaId('');

        setOpenAssignModal(false);
    }

    const handleDelete = async (deletedId) => {
        await deleteUser(deletedId, token);
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
                                                setSortBy('ID');
                                                setSearchParameter('ID');
                                                setPlaceholderText('Identity Number...');
                                            }}
                                        >
                                            Identity Number
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() => {
                                                setSortBy('UserName');
                                                setSearchParameter('UserName');
                                                setPlaceholderText('User Name...');
                                            }}
                                        >
                                            User Name
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() => {
                                                setSortBy('PhoneNumber');
                                                setSearchParameter('PhoneNumber');
                                                setPlaceholderText('Phone Number...');
                                            }}
                                        >
                                            Phone Number
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() => {
                                                setSortBy('Email');
                                                setSearchParameter('Email');
                                                setPlaceholderText('Email...');
                                            }}
                                        >
                                            Email
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
                            Add MOH Supervisor
                        </Button>
                    </div>
                </div>

                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Identity Card Number
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Telephone
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        E-Mail
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Assigned MOH Area
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {mohSupervisors.map((mohSupservisor, index) => (
                                    <tr key={index}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{mohSupservisor.userName}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{mohSupservisor.id}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{mohSupservisor.phoneNumber}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{mohSupservisor.email}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{mohSupservisor.mohAreaName}</p>
                                        </td>
                                        <td className="border-b border-gray-200 bg-white text-sm">
                                            <Button
                                                onClick={() => {
                                                    setOpenAssignModal(true);
                                                    setAssignId(mohSupservisor.id)
                                                }}
                                            >
                                                <MdEdit className="mr-2 h-5 w-5" />
                                                Assign
                                            </Button>
                                        </td>
                                        <td className="border-b border-gray-200 bg-white text-sm">
                                            <Button size="xs" color="failure"
                                                onClick={() => {
                                                    setOpenDeleteModal(true);
                                                    setDeletedId(mohSupservisor.id)
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
                    {mohSupervisors.length > 0 && (
                        <div className="flex overflow-x-auto sm:justify-center">
                            <Pagination currentPage={pageNumber} totalPages={totalPages} onPageChange={(page) => { setPageNumber(page) }} showIcons />
                        </div>
                    )}
                </div>
            </div>

            <Modal show={openAssignModal} onClose={() => {
                setOpenAssignModal(false);
                formikNew.resetForm();
            }}>
                <Modal.Header>Assign MOH Supservisor to MOH Area</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleAssign}>
                        <div className="mb-4">
                            <label htmlFor="mohAreaId" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                MOH Area
                            </label>
                            <select
                                id="mohAreaId"
                                name="mohAreaId"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={mohAreaId}
                                onChange={(e) => setMohAreaId(e.target.value)}
                                required
                            >
                                <option value="">Select MOH Area</option>
                                {mohAreas.map((mohArea) => (
                                    <option key={mohArea.mohAreaId} value={mohArea.mohAreaId}>
                                        {mohArea.mohAreaName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center justify-center">
                            <Button type="submit" size="xl">
                                Assign
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal show={openNewModal} onClose={() => {
                setOpenNewModal(false);
                formikNew.resetForm();
            }}>
                <Modal.Header>Add MOH Supervisor</Modal.Header>
                <Modal.Body>
                    <form onSubmit={formikNew.handleSubmit}>
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="id" className="block mb-2 text-sm font-medium text-gray-700">
                                    Identity Card Number
                                </label>
                                <input
                                    id="id"
                                    type="text"
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formikNew.touched.id && formikNew.errors.id ? 'border-red-500' : ''}`}
                                    {...formikNew.getFieldProps('id')}
                                />
                                {formikNew.touched.id && formikNew.errors.id ? (
                                    <p className="text-red-500 text-xs italic">{formikNew.errors.id}</p>
                                ) : null}
                            </div>
                            <div>
                                <label htmlFor="userName" className="block mb-2 text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    id="userName"
                                    type="text"
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formikNew.touched.userName && formikNew.errors.userName ? 'border-red-500' : ''}`}
                                    {...formikNew.getFieldProps('userName')}
                                />
                                {formikNew.touched.userName && formikNew.errors.userName ? (
                                    <p className="text-red-500 text-xs italic">{formikNew.errors.userName}</p>
                                ) : null}
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formikNew.touched.password && formikNew.errors.password ? 'border-red-500' : ''}`}
                                    {...formikNew.getFieldProps('password')}
                                />
                                {formikNew.touched.password && formikNew.errors.password ? (
                                    <p className="text-red-500 text-xs italic">{formikNew.errors.password}</p>
                                ) : null}
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                                    E-Mail
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formikNew.touched.email && formikNew.errors.email ? 'border-red-500' : ''}`}
                                    {...formikNew.getFieldProps('email')}
                                />
                                {formikNew.touched.email && formikNew.errors.email ? (
                                    <p className="text-red-500 text-xs italic">{formikNew.errors.email}</p>
                                ) : null}
                            </div>
                            <div>
                                <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-700">
                                    Telephone
                                </label>
                                <input
                                    id="phoneNumber"
                                    type="tel"
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formikNew.touched.phoneNumber && formikNew.errors.phoneNumber ? 'border-red-500' : ''}`}
                                    {...formikNew.getFieldProps('phoneNumber')}
                                />
                                {formikNew.touched.phoneNumber && formikNew.errors.phoneNumber ? (
                                    <p className="text-red-500 text-xs italic">{formikNew.errors.phoneNumber}</p>
                                ) : null}
                            </div>
                            <div className="flex justify-end">
                                <Button type="submit">
                                    Add MOH Supervisor
                                </Button>
                            </div>
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
                            Are you sure you want to delete this MOH Supervisor?
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

export default MOHSupervisor