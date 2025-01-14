import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, Pagination, Dropdown } from "flowbite-react";
import { MdEdit, MdDelete, MdViewList, MdClose } from "react-icons/md";
import { FaPlus, FaSearch } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { getGeneralCatagories, addGeneralCategory, updateGeneralCategory, deleteGeneralCategory } from '../../Service/GeneralInventoryService';
import { useAuth } from '../../Context/useAuth';
import { useDebounce } from '../../Util/useDebounce';
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";

function GeneralInventory() {

    const [generalCategories, setGeneralCatagories] = useState([]);
    const [labId, setLabId] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [placeholderText, setPlaceholderText] = useState('General Category Name...');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchParameter, setSearchParameter] = useState('GeneralCategoryName');
    const [searchParameterType, setSearchParameterType] = useState('string');
    const [sortBy, setSortBy] = useState('GeneralCategoryName');
    const [isAscending, setIsAscending] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [updatedCategoryId, setUpdatedCategoryId] = useState('');
    const [deletedCategoryId, setDeletedCategoryId] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const { user, token } = useAuth();
    const debouncedSearch = useDebounce(searchTerm);

    useEffect(() => {
        const fetchGeneralCategories = async () => {
            try {
                const response = await getGeneralCatagories(user.userId, searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, sortBy, isAscending, token);
                if (response) {
                    setGeneralCatagories(response.data.items);
                    setLabId(user.areaId);
                    setTotalPages(response.data.totalPages);
                }
            } catch (error) {
                console.error('Error fetching General Categories', error);
            }
        };
        fetchGeneralCategories();
    }, [openModal, openEditModal, openDeleteModal, pageNumber, sortBy, isAscending, debouncedSearch]);

    const handleAddCatagory = async (event) => {
        event.preventDefault();

        await addGeneralCategory(categoryName, labId, token);

        setCategoryName('');

        setOpenModal(false);
    };

    const handleUpdate = async (event) => {
        event.preventDefault();

        await updateGeneralCategory(updatedCategoryId, categoryName, token);

        setUpdatedCategoryId('');
        setCategoryName('');

        setOpenEditModal(false);
    };

    const handleDelete = async (deletedCategoryId) => {
        await deleteGeneralCategory(deletedCategoryId, token);
        setOpenDeleteModal(false);
    };

    return (
        <>
            <div className="bg-white rounded-md w-full">
                <h1 className="text-center text-4xl font-bold mb-7">General Inventory Categories</h1>
                <div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
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
                                            setSortBy('GeneralCategoryName');
                                            setSearchParameter('GeneralCategoryName');
                                            setPlaceholderText('General Category Name...');
                                        }}
                                    >
                                        General Category Name
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
                        <Button className="mr-1"
                            onClick={() => {
                                setOpenModal(true);
                                setCategoryName('');
                            }}
                        >
                            <FaPlus className="mr-2 h-5 w-5" />
                            Add General Catagory
                        </Button>
                    </div>
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        General Category Id
                                    </th> */}
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        General Category Name
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
                                {generalCategories.map((generalCatagory, index) => (
                                    <tr key={index}>
                                        {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{generalCatagory.generalCategoryID}</p>
                                        </td> */}
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{generalCatagory.generalCategoryName}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <Link to={`${generalCatagory.generalCategoryID}`}>
                                                <Button>
                                                    <MdViewList className="mr-2 h-5 w-5" />
                                                    View Items
                                                </Button>
                                            </Link>
                                        </td>
                                        <td className="border-b border-gray-200 bg-white text-sm">
                                            <Button size="xs"
                                                onClick={() => {
                                                    setOpenEditModal(true);
                                                    setUpdatedCategoryId(generalCatagory.generalCategoryID);
                                                    setCategoryName(generalCatagory.generalCategoryName);
                                                }}
                                            >
                                                <MdEdit size={25} />
                                            </Button>
                                        </td>
                                        <td className="border-b border-gray-200 bg-white text-sm">
                                            <Button size="xs" color="failure"
                                                onClick={() => {
                                                    setOpenDeleteModal(true);
                                                    setDeletedCategoryId(generalCatagory.generalCategoryID);
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
                    {generalCategories.length > 0 && (
                        <div className="flex overflow-x-auto sm:justify-center">
                            <Pagination currentPage={pageNumber} totalPages={totalPages} onPageChange={(page) => { setPageNumber(page) }} showIcons />
                        </div>
                    )}
                </div>
            </div>

            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Add Category</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleAddCatagory}>
                        <div className="mb-4">
                            <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">Category Name</label>
                            <input type="text" name="categoryName" id="categoryName" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={categoryName} onChange={(e) => setCategoryName(e.target.value)} required />
                        </div>
                        <div className="flex items-center justify-center">
                            <Button type="submit" size="xl">Submit</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal show={openEditModal} onClose={() => setOpenEditModal(false)}>
                <Modal.Header>Edit Category</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleUpdate}>
                        <div className="mb-4">
                            <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">Category Name</label>
                            <input type="text" name="categoryName" id="categoryName" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={categoryName} onChange={(e) => setCategoryName(e.target.value)} required />
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
                            Are you sure you want to delete this category?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={() => handleDelete(deletedCategoryId)}>
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

export default GeneralInventory