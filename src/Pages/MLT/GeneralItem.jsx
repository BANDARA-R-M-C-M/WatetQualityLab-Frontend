import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from "flowbite-react";
import { getGeneralItemDetails } from '../../Service/GeneralInventoryService';

function GeneralItem() {

    const [generalItem, setGeneralItem] = useState({});

    const { itemId } = useParams();

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const response = await getGeneralItemDetails(itemId);
                if (response) {
                    setGeneralItem(response.data);
                }
            } catch (error) {
                console.error('Error fetching General Inventory Items', error);
            }
        };
        fetchItemDetails();
    }, []);

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
                                <td className="px-5 py-5 border-b border-gray-200 font-bold text-lg">Item ID:</td>
                                <td className="py-5 border-b border-gray-200">{itemId}</td>
                            </tr>
                            <tr>
                                <td className="px-5 py-5 border-b border-gray-200 font-bold text-lg">Item Name:</td>
                                <td className="py-5 border-b border-gray-200">{generalItem.itemName}</td>
                            </tr>
                            <tr>
                                <td className="px-5 py-5 border-b border-gray-200 font-bold text-lg">Issued Date:</td>
                                <td className="py-5 border-b border-gray-200">{generalItem.issuedDate}</td>
                            </tr>
                            <tr>
                                <td className="px-5 py-5 border-b border-gray-200 font-bold text-lg">Duration of Inventory:</td>
                                <td className="py-5 border-b border-gray-200">{generalItem.durationOfInventory} Days</td>
                            </tr>
                            <tr>
                                <td className="px-5 py-5 border-b border-gray-200 font-bold text-lg">Issued By:</td>
                                <td className="py-5 border-b border-gray-200">{generalItem.issuedBy}</td>
                            </tr>
                            <tr>
                                <td className="px-5 py-5 border-b border-gray-200 font-bold text-lg">Category Name:</td>
                                <td className="py-5 border-b border-gray-200">{generalItem.categoryName}</td>
                            </tr>
                            <tr>
                                <td className="px-5 py-5 font-bold text-lg">Remarks :</td>
                                <td className="py-5">{generalItem.remarks}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Card>
        </>
    );
}

export default GeneralItem