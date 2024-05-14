import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { getGeneralCatagories, addGeneralCategory, updateGeneralCategory, deleteGeneralCategory } from '../../Service/GeneralInventoryService';
import { useAuth } from '../../Context/useAuth';

function GeneralInventory() {

    const [generalCatagories, setGeneralCatagories] = useState([]);
    const [labId, setLabId] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [updatedCategoryId, setUpdatedCategoryId] = useState('');
    const [deletedCategoryId, setDeletedCategoryId] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const { user } = useAuth();

    useEffect(() => {
        const fetchGeneralCategories = async () => {
            try {
                const response = await getGeneralCatagories(user.userId);
                if (response) {
                    setGeneralCatagories(response.data);
                    setLabId(response.data[0].labId);
                }
            } catch (error) {
                console.error('Error fetching General Categories', error);
            }
        };
        fetchGeneralCategories();
    }, [openModal, openEditModal, openDeleteModal]);

    const handleAddCatagory = async (event) => {
        event.preventDefault();

        if (await addGeneralCategory(categoryName, labId)) {
            alert('Category Added Successfully')
        } else {
            alert('Failed to Add Category')
        }

        setCategoryName('');

        setOpenModal(false);
    };

    const handleUpdate = async (event) => {
        event.preventDefault();

        if (await updateGeneralCategory(updatedCategoryId, categoryName)) {
            alert('Category Updated Successfully')
        } else {
            alert('Failed to Update Category')
        }

        setUpdatedCategoryId('');
        setCategoryName('');

        setOpenEditModal(false);
    };

    const handleDelete = async (deletedCategoryId) => {
        try {
            await deleteGeneralCategory(deletedCategoryId);
            alert('Category deleted successfully');
        } catch (error) {
            console.error('Error deleting category:', error);
            alert('Failed to delete category');
        }

        setOpenDeleteModal(false);
    };

    return (
        <>
            <div className="bg-white rounded-md w-full">
                <div>
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
                        <Button className="mr-1"
                            onClick={() => { setOpenModal(true) }}
                        >Add General Catagory
                        </Button>
                    </div>
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        General Category Id
                                    </th>
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
                                {generalCatagories.map((generalCatagory, index) => (
                                    <tr key={index}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{generalCatagory.generalCategoryID}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{generalCatagory.categoryName}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <Link to={`${generalCatagory.generalCategoryID}`}>View Items</Link>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <Button
                                                onClick={() => {
                                                    setOpenEditModal(true);
                                                    setUpdatedCategoryId(generalCatagory.generalCategoryID);
                                                    setCategoryName(generalCatagory.categoryName);
                                                }}
                                            >Edit
                                            </Button>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <Button
                                                onClick={() => {
                                                    setOpenDeleteModal(true);
                                                    setDeletedCategoryId(generalCatagory.generalCategoryID);
                                                }}
                                            >Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Add Category</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleAddCatagory}>
                        <div className="mb-4">
                            <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">Category Name</label>
                            <input type="text" name="categoryName" id="categoryName" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
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
                                value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
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