import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../Context/useAuth';
import { Button, Card, Modal } from "flowbite-react";
import { getSurgicalItemDetails, issueItem, addQuantity } from '../../Service/SurgicalInventoryService';

function SurgicalItem() {

    const [surgicalItem, setSurgicalItem] = useState({});
    const [issuingQuantity, setIssuingQuantity] = useState('');
    const [quantity, setQuantity] = useState('');
    const [issuingRemarks, setIssuingRemarks] = useState('');
    const [openIssueModal, setOpenIssueModal] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);

    const { itemId } = useParams();
    const { user, token } = useAuth();

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const response = await getSurgicalItemDetails(itemId, token);
                if (response) {
                    setSurgicalItem(response.data);
                }
            } catch (error) {
                console.error('Error fetching General Inventory Items', error);
            }
        };
        fetchItemDetails();
    }, [openIssueModal]);

    const handleIssue = async (event) => {
        event.preventDefault();

        await issueItem(itemId, issuingQuantity, user.userId, issuingRemarks, token);

        setIssuingQuantity('');
        setIssuingRemarks('');

        setOpenIssueModal(false);
    };

    const handleAdd = async (event) => {
        event.preventDefault();

        await addQuantity(itemId, quantity, user.userId, issuingRemarks, token);

        setQuantity('');
        setIssuingRemarks('');

        setOpenAddModal(false);
    };

    function getDuration(duration) {
        const years = Math.floor(duration / 365);
        const months = Math.floor((duration - years * 365) / 30);
        const days = (duration - years * 365 - months * 30) % 30;
        return `${years} years ${months} months ${days} days`;
    }

    return (
        <>
            <Card className="max-w-sm mx-auto">
                <h3 className="text-2xl mx-auto font-bold tracking-tight text-gray-900 dark:text-white">
                    Item Details
                </h3>
                <div className="mb-4 rounded-lg">
                    <table>
                        <tbody>
                            <tr>
                                <td className="px-5 py-5 border-b border-gray-200 font-bold text-lg">Item Name:</td>
                                <td className="py-5 border-b border-gray-200">{surgicalItem.itemName}</td>
                            </tr>
                            <tr>
                                <td className="px-5 py-5 border-b border-gray-200 font-bold text-lg">Issued Date:</td>
                                <td className="py-5 border-b border-gray-200">{surgicalItem.issuedDate}</td>
                            </tr>
                            <tr>
                                <td className="px-5 py-5 border-b border-gray-200 font-bold text-lg">Duration of Inventory:</td>
                                <td className="py-5 border-b border-gray-200">{getDuration(surgicalItem.durationOfInventory)} Days</td>
                            </tr>
                            <tr>
                                <td className="px-5 py-5 border-b border-gray-200 font-bold text-lg">Issued By:</td>
                                <td className="py-5 border-b border-gray-200">{surgicalItem.issuedBy}</td>
                            </tr>
                            <tr>
                                <td className="px-5 py-5 border-b border-gray-200 font-bold text-lg">Quantity:</td>
                                <td className="py-5 border-b border-gray-200">{surgicalItem.quantity}</td>
                            </tr>
                            <tr>
                                <td className="px-5 py-5 border-b border-gray-200 font-bold text-lg">Category Name:</td>
                                <td className="py-5 border-b border-gray-200">{surgicalItem.surgicalCategoryName}</td>
                            </tr>
                            <tr>
                                <td className="px-5 py-5 border-b border-gray-200 font-bold text-lg">Remarks :</td>
                                <td className="py-5 border-b border-gray-200">{surgicalItem.remarks}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="flex items-center justify-center pt-4"
                        onClick={() => { setOpenIssueModal(true) }}>
                        <Button type="submit" size="xl">Issue</Button>
                    </div>

                    <div className="flex items-center justify-center pt-4"
                        onClick={() => { setOpenAddModal(true) }}>
                        <Button type="submit" size="xl">Add</Button>
                    </div>
                </div>
            </Card>

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

            <Modal show={openAddModal} onClose={() => setOpenAddModal(false)}>
                <Modal.Header>Add Quantity</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleAdd}>
                        <div className="mb-4">
                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                            <input type="number" name="quantity" id="quantity" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="issuingRemarks" className="block text-sm font-medium text-gray-700">Adding Remarks</label>
                            <input type="text" name="issuingRemarks" id="issuingRemarks" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                value={issuingRemarks} onChange={(e) => setIssuingRemarks(e.target.value)} />
                        </div>
                        <div className="flex items-center justify-center">
                            <Button type="submit" size="xl">Submit</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default SurgicalItem