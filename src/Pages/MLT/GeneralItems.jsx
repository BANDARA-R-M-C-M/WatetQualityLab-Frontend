import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { getGeneralInventoryItems, getGeneralCatagories, addGeneralInventoryItem, updateGeneralInventoryItem, deleteGeneralInventoryItem } from '../../Service/GeneralInventoryService';
import { useAuth } from '../../Context/useAuth';

function GeneralItems() {

    const [items, setItems] = useState([]);
    const [generalCatagories, setGeneralCatagories] = useState([]);
    const [labId, setLabId] = useState('');
    const [generalCategoryID, setGeneralCategoryID] = useState('');
    const [itemName, setItemName] = useState('');
    const [issuedDate, setIssuedDate] = useState('');
    const [issuedBy, setIssuedBy] = useState('');
    const [remarks, setRemarks] = useState('');
    const [updatedId, setUpdatedId] = useState('');
    const [deletedId, setDeletedId] = useState('');
    const [openNewModal, setOpenNewModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const { user } = useAuth();
    const { categoryId } = useParams();

    useEffect(() => {
        const fetchGeneralItems = async () => {
            try {
                const response = await getGeneralInventoryItems(user.userId, categoryId);
                if (response) {
                    setItems(response.data);
                    setLabId(response.data[0].labId);
                }
            } catch (error) {
                console.error('Error fetching General Inventory Items', error);
            }
        };
        fetchGeneralItems();
    }, [openNewModal, openEditModal, openDeleteModal]);

    useEffect(() => {
        getGeneralCatagories(user.userId).then((response) => {
            setGeneralCatagories(response.data);
        });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (await addGeneralInventoryItem(itemName, issuedDate, issuedBy, remarks, categoryId, labId)) {
            alert('Item Added Successfully')
        } else {
            alert('Failed to Add Item')
        }

        setItemName('');
        setIssuedDate('');
        setIssuedBy('');
        setRemarks('');
        setGeneralCategoryID('');

        setOpenNewModal(false);
    };

    const handleUpdate = async (event) => {
        event.preventDefault();

        if (await updateGeneralInventoryItem(updatedId, itemName, issuedDate, issuedBy, remarks, generalCategoryID)) {
            alert('Item Updated Successfully')
        } else {
            alert('Failed to Update Item')
        }

        setUpdatedId('');
        setItemName('');
        setIssuedDate('');
        setIssuedBy('');
        setRemarks('');

        setOpenEditModal(false);
    };

    const handleDelete = async (deletedId) => {
        try {
            await deleteGeneralInventoryItem(deletedId);
            alert('Item deleted successfully');
        } catch (error) {
            console.error('Error deleting sample:', error);
            alert('Failed to delete item');
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
                        <Button
                            onClick={() => { setOpenNewModal(true) }}
                        >Add Item
                        </Button>
                    </div>
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Item Id
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Item Name
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Issued Date
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Issued By
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Duration of Inventory
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Remarks
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{item.generalInventoryID}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{item.itemName}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{item.issuedDate}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{item.issuedBy}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{item.durationOfInventory}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{item.remarks}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <Button
                                                onClick={() => {
                                                    setOpenEditModal(true);
                                                    setUpdatedId(item.generalInventoryID);
                                                    setItemName(item.itemName);
                                                    setIssuedDate(item.issuedDate);
                                                    setIssuedBy(item.issuedBy);
                                                    setRemarks(item.remarks);
                                                    setGeneralCategoryID(item.generalCategoryID);
                                                }}
                                            >Edit
                                            </Button>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <Button
                                                onClick={() => {
                                                    setOpenDeleteModal(true);
                                                    setDeletedId(item.generalInventoryID);
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

            <Modal show={openNewModal} onClose={() => setOpenNewModal(false)}>
                <Modal.Header>Add Item</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="itemName" className="block text-sm font-medium text-gray-700">Item Name</label>
                            <input type="text" name="itemName" id="itemName" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={itemName} onChange={(e) => setItemName(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="issuedDate" className="block text-sm font-medium text-gray-700">Issued Date</label>
                            <input type="date" name="issuedDate" id="issuedDate" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={issuedDate} onChange={(e) => setIssuedDate(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="issuedBy" className="block text-sm font-medium text-gray-700">Issued By</label>
                            <input type="text" name="issuedBy" id="issuedBy" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={issuedBy} onChange={(e) => setIssuedBy(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="remarks" className="block text-sm font-medium text-gray-700">Remarks</label>
                            <input type="text" name="remarks" id="remarks" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={remarks} onChange={(e) => setRemarks(e.target.value)} />
                        </div>
                        <div className="flex items-center justify-center">
                            <Button type="submit" size="xl">Submit</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal show={openEditModal} onClose={() => setOpenEditModal(false)}>
                <Modal.Header>Edit Sample</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleUpdate}>
                        <div className="mb-4">
                            <label htmlFor="itemName" className="block text-sm font-medium text-gray-700">Item Name</label>
                            <input type="text" name="itemName" id="itemName" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={itemName} onChange={(e) => setItemName(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="issuedDate" className="block text-sm font-medium text-gray-700">Issued Date</label>
                            <input type="date" name="issuedDate" id="issuedDate" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={issuedDate} onChange={(e) => setIssuedDate(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="issuedBy" className="block text-sm font-medium text-gray-700">Issued By</label>
                            <input type="text" name="issuedBy" id="issuedBy" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={issuedBy} onChange={(e) => setIssuedBy(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="remarks" className="block text-sm font-medium text-gray-700">Remarks</label>
                            <input type="text" name="remarks" id="remarks" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={remarks} onChange={(e) => setRemarks(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="generalCategoryID" className="block text-sm font-medium text-gray-700">General Category</label>
                            <select
                                name="generalCategoryID"
                                id="generalCategoryID"
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={generalCategoryID}
                                onChange={(e) => setGeneralCategoryID(e.target.value)}
                            >
                                <option value="">Select Catagory</option>
                                {generalCatagories.map((category, index) => (
                                    <option key={index} value={category.generalCategoryID}>
                                        {category.categoryName}
                                    </option>
                                ))}
                            </select>
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
                            Are you sure you want to delete this sample?
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

export default GeneralItems