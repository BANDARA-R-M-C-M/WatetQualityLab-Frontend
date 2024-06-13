import { useState, useEffect } from 'react';
import { Button, Modal, Pagination, Dropdown } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { MdEdit, MdDelete, MdClose } from "react-icons/md";
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import { addLab, getLabs, updateLabs, deleteLab } from "../../Service/AdminService";
import { useAuth } from '../../Context/useAuth';
import { useDebounce } from '../../Util/useDebounce';
import { useFormik } from 'formik';
import * as yup from 'yup';

function Laboratories() {
    const [labs, setLabs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchParameter, setSearchParameter] = useState('LabName');
    const [searchParameterType, setSearchParameterType] = useState('string');
    const [sortBy, setSortBy] = useState('LabName');
    const [isAscending, setIsAscending] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [updatedId, setUpdatedId] = useState(null);
    const [deletedId, setDeletedId] = useState(null);
    const [openNewModal, setOpenNewModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const { token } = useAuth();
    const debouncedSearch = useDebounce(searchTerm);

    const validationSchema = yup.object().shape({
        labName: yup.string().required('Lab Name is required')
            .max(40, 'Lab should not exceed 40 characters'),
        labLocation: yup.string().required('Lab Location is required')
            .max(50, 'Lab Location should not exceed 50 characters'),
        labTelephone: yup.string().required('Lab Telephone is required')
            .matches(/^\d{10}$/, 'Invalid phone number format'),
    });

    useEffect(() => {
        const fetchLabs = async () => {
            const response = await getLabs(searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, sortBy, isAscending, token);
            if (response) {
                setLabs(response.data.items);
                setTotalPages(response.data.totalPages);
            } else {
                console.log("Error fetching Labs");
            }
        }
        fetchLabs();
    }, [openNewModal, openEditModal, openDeleteModal, pageNumber, sortBy, isAscending, debouncedSearch]);

    const formikNew = useFormik({
        initialValues: {
            labName: '',
            labLocation: '',
            labTelephone: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            await addLab(values.labName, values.labLocation, values.labTelephone, token);
            formikNew.resetForm();
            setOpenNewModal(false);
        }
    });

    const formikEdit = useFormik({
        initialValues: {
            labName: '',
            labLocation: '',
            labTelephone: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            await updateLabs(updatedId, values.labName, values.labLocation, values.labTelephone, token);
            formikEdit.resetForm();
            setOpenEditModal(false);
        },
        enableReinitialize: true,
    });


    return (
        <>
            <div className="bg-white rounded-md w-full">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="flex bg-gray-200 items-center p-1 rounded-md">
                            <FaSearch className="mx-2 h-6 w-6 text-gray-400" />
                            <input
                                className="bg-gray-200 border-none ml-1 block focus:ring focus:ring-gray-200"
                                type="text"
                                placeholder="Lab Name..."
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
                                <Dropdown.Item onClick={() => setSortBy('LabName')}>Lab Name</Dropdown.Item>
                                <Dropdown.Item onClick={() => setSortBy('LabLocation')}>Lab Location</Dropdown.Item>
                                <Dropdown.Item onClick={() => setSortBy('LabTelephone')}>Lab Telephone</Dropdown.Item>
                            </Dropdown>
                        </div>
                        <Button onClick={() => setIsAscending(!isAscending)} size="xs">
                            {isAscending ? <AiOutlineSortAscending size={28} /> : <AiOutlineSortDescending size={28} />}
                        </Button>
                    </div>
                    <Button onClick={() => setOpenNewModal(true)}>
                        <FaPlus className="mr-2 h-5 w-5" />
                        Add Lab
                    </Button>
                </div>

                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Lab Name
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Location
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Phone Number
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {labs.map((lab, index) => (
                                    <tr key={index}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{lab.labName}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{lab.labLocation}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{lab.labTelephone}</p>
                                        </td>
                                        <td className="border-b border-gray-200 bg-white text-sm">
                                            <Button size="xs"
                                                onClick={() => {
                                                    setOpenEditModal(true);
                                                    setUpdatedId(lab.labId);
                                                    formikEdit.setValues({
                                                        labName: lab.labName,
                                                        labLocation: lab.labLocation,
                                                        labTelephone: lab.labTelephone
                                                    });
                                                }}>
                                                <MdEdit size={25} />
                                            </Button>
                                        </td>
                                        <td className="border-b border-gray-200 bg-white text-sm">
                                            <Button size="xs" color="failure"
                                                onClick={() => { setOpenDeleteModal(true), setDeletedId(lab.labId) }}>
                                                <MdDelete size={25} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {labs.length > 0 && (
                        <div className="flex overflow-x-auto sm:justify-center">
                            <Pagination currentPage={pageNumber} totalPages={totalPages} onPageChange={(page) => { setPageNumber(page) }} showIcons />
                        </div>
                    )}
                </div>
            </div>

            <Modal show={openNewModal} onClose={() => {
                setOpenNewModal(false);
                formikNew.resetForm();
            }} popup>
                <Modal.Header>Add Lab</Modal.Header>
                <Modal.Body>
                    <form onSubmit={formikNew.handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="labName">
                                Lab Name
                            </label>
                            <input
                                id="labName"
                                type="text"
                                {...formikNew.getFieldProps('labName')}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formikNew.touched.labName && formikNew.errors.labName ? 'border-red-500' : ''}`}
                            />
                            {formikNew.touched.labName && formikNew.errors.labName ? (
                                <p className="text-red-500 text-xs italic">{formikNew.errors.labName}</p>
                            ) : null}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="labLocation">
                                Lab Location
                            </label>
                            <input
                                id="labLocation"
                                type="text"
                                {...formikNew.getFieldProps('labLocation')}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formikNew.touched.labLocation && formikNew.errors.labLocation ? 'border-red-500' : ''}`}
                            />
                            {formikNew.touched.labLocation && formikNew.errors.labLocation ? (
                                <p className="text-red-500 text-xs italic">{formikNew.errors.labLocation}</p>
                            ) : null}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="labTelephone">
                                Lab Telephone
                            </label>
                            <input
                                id="labTelephone"
                                type="text"
                                {...formikNew.getFieldProps('labTelephone')}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formikNew.touched.labTelephone && formikNew.errors.labTelephone ? 'border-red-500' : ''}`}
                            />
                            {formikNew.touched.labTelephone && formikNew.errors.labTelephone ? (
                                <p className="text-red-500 text-xs italic">{formikNew.errors.labTelephone}</p>
                            ) : null}
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
            }} popup>
                <Modal.Header>Edit Lab</Modal.Header>
                <Modal.Body>
                    <form onSubmit={formikEdit.handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="labName">
                                Lab Name
                            </label>
                            <input
                                id="labName"
                                type="text"
                                {...formikEdit.getFieldProps('labName')}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formikEdit.touched.labName && formikEdit.errors.labName ? 'border-red-500' : ''}`}
                            />
                            {formikEdit.touched.labName && formikEdit.errors.labName ? (
                                <p className="text-red-500 text-xs italic">{formikEdit.errors.labName}</p>
                            ) : null}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="labLocation">
                                Lab Location
                            </label>
                            <input
                                id="labLocation"
                                type="text"
                                {...formikEdit.getFieldProps('labLocation')}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formikEdit.touched.labLocation && formikEdit.errors.labLocation ? 'border-red-500' : ''}`}
                            />
                            {formikEdit.touched.labLocation && formikEdit.errors.labLocation ? (
                                <p className="text-red-500 text-xs italic">{formikEdit.errors.labLocation}</p>
                            ) : null}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="labTelephone">
                                Lab Telephone
                            </label>
                            <input
                                id="labTelephone"
                                type="text"
                                {...formikEdit.getFieldProps('labTelephone')}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formikEdit.touched.labTelephone && formikEdit.errors.labTelephone ? 'border-red-500' : ''}`}
                            />
                            {formikEdit.touched.labTelephone && formikEdit.errors.labTelephone ? (
                                <p className="text-red-500 text-xs italic">{formikEdit.errors.labTelephone}</p>
                            ) : null}
                        </div>
                        <div className="flex items-center justify-center">
                            <Button type="submit" size="xl">Submit</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal show={openDeleteModal} size="md" onClose={() => setOpenDeleteModal(false)} popup>
                <Modal.Header>Delete Lab</Modal.Header>
                <Modal.Body>
                    <div className="flex flex-col items-center gap-4">
                        <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400" />
                        <h3 className="text-lg font-normal text-gray-500">Are you sure you want to delete this Lab?</h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={() => { deleteLab(deletedId, token), setOpenDeleteModal(false) }}>Yes, I'm sure</Button>
                            <Button color="gray" onClick={() => setOpenDeleteModal(false)}>No, cancel</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Laboratories;
