import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Modal, Pagination, Dropdown } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { MdEdit, MdDelete, MdClose, MdQrCode } from "react-icons/md";
import { FaPlus, FaSearch } from "react-icons/fa";
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import { TbReport } from "react-icons/tb";
import { getSurgicalInventoryItems, getSurgicalCatagories, getSurgicalInventoryQR, addSurgicalInventoryItem, addQuantity, issueItem, updateSurgicalInventoryItem, deleteSurgicalInventoryItem } from '../../Service/SurgicalInventoryService';
import { useAuth } from '../../Context/useAuth';
import { useDebounce } from '../../Util/useDebounce';

function SurgicalItems() {

    const [items, setItems] = useState([]);
    const [SurgicalCatagories, setSurgicalCatagories] = useState([]);
    const [labId, setLabId] = useState('');
    const [SurgicalCategoryID, setSurgicalCategoryID] = useState('');
    const [itemName, setItemName] = useState('');
    const [issuedDate, setIssuedDate] = useState('');
    const [issuedBy, setIssuedBy] = useState('');
    const [issuingId, setIssuingId] = useState('');
    const [issuingQuantity, setIssuingQuantity] = useState('');
    const [issuingRemarks, setIssuingRemarks] = useState('');
    const [quantity, setQuantity] = useState();
    const [remarks, setRemarks] = useState('');
    const [QRurl, setQRurl] = useState('');
    const [placeholderText, setPlaceholderText] = useState('Item Name...');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchParameter, setSearchParameter] = useState('ItemName');
    const [searchParameterType, setSearchParameterType] = useState('string');
    const [sortBy, setSortBy] = useState('');
    const [isAscending, setIsAscending] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [updatedId, setUpdatedId] = useState('');
    const [deletedId, setDeletedId] = useState('');
    const [openNewModal, setOpenNewModal] = useState(false);
    const [openIssueModal, setOpenIssueModal] = useState(false);
    const [openPreviewModal, setOpenPreviewModal] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const { user } = useAuth();
    const { categoryId } = useParams();
    const debouncedSearch = useDebounce(searchTerm, 750);

    useEffect(() => {
        const fetchSurgicalItems = async () => {
            try {
                const response = await getSurgicalInventoryItems(user.userId, categoryId, searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, sortBy, isAscending);
                if (response) {
                    setItems(response.data.items);
                    setLabId(response.data.items[0].labId);
                    setTotalPages(response.data.totalPages);
                }
            } catch (error) {
                console.error('Error fetching Surgical Inventory Items', error);
            }
        };
        fetchSurgicalItems();
    }, [openNewModal, openAddModal, openIssueModal, openEditModal, openDeleteModal, pageNumber, sortBy, isAscending, debouncedSearch]);

    useEffect(() => {
        getSurgicalCatagories(user.userId).then((response) => {
            setSurgicalCatagories(response.data.items);
        });
    }, []);

    const handlePreview = async (itemId) => {
        const response = await getSurgicalInventoryQR(itemId);
        const pdfBlob = new Blob([response.data.items], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setQRurl(pdfUrl);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (await addSurgicalInventoryItem(itemName, issuedDate, issuedBy, quantity, remarks, categoryId, labId)) {
            alert('Item Added Successfully')
        } else {
            alert('Failed to Add Item')
        }

        setItemName('');
        setIssuedDate('');
        setIssuedBy('');
        setQuantity('');
        setRemarks('');
        setSurgicalCategoryID('');

        setOpenNewModal(false);
    };

    const handleIssue = async (event) => {
        event.preventDefault();
        if (await issueItem(issuingId, issuingQuantity, user.userId, issuingRemarks)) {
            alert('Item Issued Successfully')
        } else {
            alert('Failed to Issue Item')
        }
        setIssuingQuantity('');
        setIssuingRemarks('');

        setOpenIssueModal(false);
    };

    const handleAdd = async (event) => {
        event.preventDefault();

        if (await addQuantity(updatedId, quantity)) {
            alert('Item Added Successfully')
        } else {
            alert('Failed to Add Item')
        }

        setUpdatedId('');
        setQuantity('');

        setOpenAddModal(false);
    };

    const handleUpdate = async (event) => {
        event.preventDefault();

        if (await updateSurgicalInventoryItem(updatedId, itemName, issuedDate, issuedBy, quantity, remarks, SurgicalCategoryID)) {
            alert('Item Updated Successfully')
        } else {
            alert('Failed to Update Item')
        }

        setUpdatedId('');
        setItemName('');
        setIssuedDate('');
        setIssuedBy('');
        setQuantity('');
        setRemarks('');

        setOpenEditModal(false);
    };

    const handleDelete = async (deletedId) => {
        try {
            await deleteSurgicalInventoryItem(deletedId);
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
                                setQuantity('');
                                setRemarks('');
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
                                        Quantity
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
                                            <p className="text-gray-900 whitespace-no-wrap">{item.surgicalInventoryID}</p>
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
                                            <p className="text-gray-900 whitespace-no-wrap">{item.quantity}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{item.remarks}</p>
                                        </td>
                                        <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
                                            <Button
                                                onClick={() => {
                                                    setOpenIssueModal(true);
                                                    setIssuingId(item.surgicalInventoryID);
                                                }}
                                            >
                                                <TbReport className="mr-2 h-5 w-5" />
                                                Issue
                                            </Button>
                                        </td>
                                        <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
                                            <Button onClick={() => {
                                                setOpenAddModal(true);
                                                setUpdatedId(item.surgicalInventoryID);
                                            }}>
                                                <FaPlus className="mr-2 h-5 w-5" />
                                                Add
                                            </Button>
                                        </td>
                                        <td className="border-b border-gray-200 bg-white text-sm">
                                            <Button size="xs"
                                                onClick={() => {
                                                    setOpenPreviewModal(true);
                                                    handlePreview(item.surgicalInventoryID);
                                                }}>
                                                <MdQrCode size={25} />
                                            </Button>
                                        </td>
                                        <td className="border-b border-gray-200 bg-white text-sm">
                                            <Button size="xs"
                                                onClick={() => {
                                                    setOpenEditModal(true);
                                                    setUpdatedId(item.surgicalInventoryID);
                                                    setItemName(item.itemName);
                                                    setIssuedDate(item.issuedDate);
                                                    setIssuedBy(item.issuedBy);
                                                    setQuantity(item.quantity);
                                                    setRemarks(item.remarks);
                                                    setSurgicalCategoryID(item.surgicalCategoryID);
                                                }}
                                            >
                                                <MdEdit size={25} />
                                            </Button>
                                        </td>
                                        <td className="border-b border-gray-200 bg-white text-sm">
                                            <Button size="xs" color="failure"
                                                onClick={() => {
                                                    setOpenDeleteModal(true);
                                                    setDeletedId(item.surgicalInventoryID);
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
                    <div className="flex overflow-x-auto sm:justify-center">
                        <Pagination currentPage={pageNumber} totalPages={totalPages} onPageChange={(page) => {setPageNumber(page)}} showIcons />
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
                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                            <input type="number" name="quantity" id="quantity" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={quantity} onChange={(e) => setQuantity(e.target.value)} />
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

            <Modal show={openIssueModal} onClose={() => setOpenIssueModal(false)}>
                <Modal.Header>Issue Item</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleIssue}>
                        <div className="mb-4">
                            <label htmlFor="issuingQuantity" className="block text-sm font-medium text-gray-700">Issuing Quantity</label>
                            <input type="text" name="issuingQuantity" id="issuingQuantity" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={issuingQuantity} onChange={(e) => setIssuingQuantity(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="issuingRemarks" className="block text-sm font-medium text-gray-700">Issuing Remarks</label>
                            <input type="text" name="issuingRemarks" id="issuingRemarks" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={issuingRemarks} onChange={(e) => setIssuingRemarks(e.target.value)} />
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

            <Modal show={openAddModal} onClose={() => setOpenAddModal(false)}>
                <Modal.Header>Add Quantity</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleAdd}>
                        <div className="mb-4">
                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                            <input type="number" name="quantity" id="quantity" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={quantity} onChange={(e) => setQuantity(e.target.value)} />
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
                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                            <input type="number" name="quantity" id="quantity" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="remarks" className="block text-sm font-medium text-gray-700">Remarks</label>
                            <input type="text" name="remarks" id="remarks" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={remarks} onChange={(e) => setRemarks(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="SurgicalCategoryID" className="block text-sm font-medium text-gray-700">Surgical Category</label>
                            <select
                                name="SurgicalCategoryID"
                                id="SurgicalCategoryID"
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={SurgicalCategoryID}
                                onChange={(e) => setSurgicalCategoryID(e.target.value)}
                            >
                                <option value="">Select Catagory</option>
                                {SurgicalCatagories.map((category, index) => (
                                    <option key={index} value={category.surgicalCategoryID}>
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

export default SurgicalItems