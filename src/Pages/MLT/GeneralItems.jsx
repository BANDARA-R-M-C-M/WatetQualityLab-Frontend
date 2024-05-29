import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Modal, Pagination, Dropdown } from "flowbite-react";
import { MdEdit, MdDelete, MdClose, MdQrCode } from "react-icons/md";
import { FaPlus, FaSearch } from "react-icons/fa";
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { getGeneralInventoryItems, getGeneralCatagories, getGeneralInventoryQR, addGeneralInventoryItem, updateGeneralInventoryItem, deleteGeneralInventoryItem } from '../../Service/GeneralInventoryService';
import { useAuth } from '../../Context/useAuth';
import { useDebounce } from '../../Util/useDebounce';

function GeneralItems() {

    const [items, setItems] = useState([]);
    const [generalCatagories, setGeneralCatagories] = useState([]);
    const [labId, setLabId] = useState('');
    const [generalCategoryID, setGeneralCategoryID] = useState('');
    const [itemName, setItemName] = useState('');
    const [issuedDate, setIssuedDate] = useState('');
    const [issuedBy, setIssuedBy] = useState('');
    const [remarks, setRemarks] = useState('');
    const [QRurl, setQRurl] = useState('');
    const [placeholderText, setPlaceholderText] = useState('Item Name...');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchParameter, setSearchParameter] = useState('ItemName');
    const [searchParameterType, setSearchParameterType] = useState('string');
    const [sortBy, setSortBy] = useState('ItemName');
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [isAscending, setIsAscending] = useState(true);
    const [updatedId, setUpdatedId] = useState('');
    const [deletedId, setDeletedId] = useState('');
    const [openNewModal, setOpenNewModal] = useState(false);
    const [openPreviewModal, setOpenPreviewModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const { user } = useAuth();
    const { categoryId } = useParams();
    const debouncedSearch = useDebounce(searchTerm);

    useEffect(() => {
        const fetchGeneralItems = async () => {
            try {
                const response = await getGeneralInventoryItems(user.userId, categoryId, searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, sortBy, isAscending);
                if (response) {
                    setItems(response.data.items);
                    setLabId(user.areaId);
                    setTotalPages(response.data.totalPages);
                }
            } catch (error) {
                console.error('Error fetching General Inventory Items', error);
            }
        };
        fetchGeneralItems();
    }, [openNewModal, openEditModal, openDeleteModal, pageNumber, sortBy, isAscending, debouncedSearch]);

    useEffect(() => {
        getGeneralCatagories(user.userId).then((response) => {
            setGeneralCatagories(response.data.items);
        });
    }, []);

    const handlePreview = async (itemId) => {
        const response = await getGeneralInventoryQR(itemId);
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setQRurl(pdfUrl);
    };

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
                                            setSortBy('ItemName');
                                            setSearchParameter('ItemName');
                                            setPlaceholderText('Item Name...');
                                        }}
                                    >
                                        Item Name
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
                                            setSortBy('IssuedBy');
                                            setSearchParameter('IssuedBy');
                                            setPlaceholderText('Issued By...');
                                        }}
                                    >
                                        Issued By
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
                        <Button
                            onClick={() => {
                                setOpenNewModal(true);
                                setItemName('');
                                setIssuedDate('');
                                setIssuedBy('');
                                setRemarks('');
                                setGeneralCategoryID('');
                            }}
                        >
                            <FaPlus className="mr-2 h-5 w-5" />
                            Add Item
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
                                        <td className="border-b border-gray-200 bg-white text-sm">
                                            <Button size="xs"
                                                onClick={() => {
                                                    setOpenPreviewModal(true);
                                                    handlePreview(item.generalInventoryID);
                                                }}>
                                                <MdQrCode size={25} />
                                            </Button>
                                        </td>
                                        <td className="border-b border-gray-200 bg-white text-sm">
                                            <Button size="xs"
                                                onClick={() => {
                                                    setOpenEditModal(true);
                                                    setUpdatedId(item.generalInventoryID);
                                                    setItemName(item.itemName);
                                                    setIssuedDate(item.issuedDate);
                                                    setIssuedBy(item.issuedBy);
                                                    setRemarks(item.remarks);
                                                    setGeneralCategoryID(item.generalCategoryID);
                                                }}
                                            >
                                                <MdEdit size={25} />
                                            </Button>
                                        </td>
                                        <td className="border-b border-gray-200 bg-white text-sm">
                                            <Button size="xs" color="failure"
                                                onClick={() => {
                                                    setOpenDeleteModal(true);
                                                    setDeletedId(item.generalInventoryID);
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
                    {items.length > 0 && (
                        <div className="flex overflow-x-auto sm:justify-center">
                            <Pagination currentPage={pageNumber} totalPages={totalPages} onPageChange={(page) => { setPageNumber(page) }} showIcons />
                        </div>
                    )}
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

            <Modal show={openPreviewModal} onClose={() => setOpenPreviewModal(false)}>
                <Modal.Header>QR Preview</Modal.Header>
                <Modal.Body>
                    <iframe src={QRurl} type="application/pdf" width={100 + '%'} height={500 + 'px'} />
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