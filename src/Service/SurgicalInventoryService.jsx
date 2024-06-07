import axios from "axios";
import base_url from "../Util/base_url";
import { toast } from "react-toastify";

export const getSurgicalInventoryQR = async (itemId, token) => {
    try {
        const response = await axios.get(`${base_url}/SurgicalInventory/GetSurgicalInventoryQR`, {
            responseType: 'blob',
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                itemId: itemId
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getSurgicalItemDetails = async (itemId, token) => {
    try {
        const response = await axios.get(`${base_url}/SurgicalInventory/GetSurgicalInventoryItem`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                itemId: itemId
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getSurgicalInventoryItems = async (mltId, categoryId, searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, sortBy, isAscending, token) => {
    try {
        const response = await axios.get(`${base_url}/SurgicalInventory/GetSurgicalInventoryItems`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                UserId: mltId,
                CategoryId: categoryId,
                SearchTerm: searchTerm,
                SearchParameter: searchParameter,
                SearchParameterType: searchParameterType,
                PageNumber: pageNumber,
                PageSize: pageSize,
                SortBy: sortBy,
                IsAscending: isAscending
            }
        });
        return response;
    }
    catch (error) {
        console.log(error);
    }
}

export const getSurgicalCatagories = async (mltId, searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, sortBy, isAscending, token) => {
    try {
        const response = await axios.get(`${base_url}/SurgicalInventory/GetSurgicalCategories`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                UserId: mltId,
                SearchTerm: searchTerm,
                SearchParameter: searchParameter,
                SearchParameterType: searchParameterType,
                PageNumber: pageNumber,
                PageSize: pageSize,
                SortBy: sortBy,
                IsAscending: isAscending
            }
        });
        return response;
    }
    catch (error) {
        console.log(error);
    }
}

export const addSurgicalInventoryItem = async (itemName, issuedDate, issuedBy, quantity, remarks, surgicalCategoryID, labId, token) => {
    try {
        await axios.post(`${base_url}/SurgicalInventory/AddSurgicalInventoryItem`, {
            itemName: itemName,
            issuedDate: issuedDate,
            issuedBy: issuedBy,
            quantity: quantity,
            remarks: remarks,
            surgicalCategoryID: surgicalCategoryID,
            labId: labId
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        toast.success('Surgical Inventory Item added successfully!');

        return true;
    }
    catch (error) {
        if (error.response) {
            if (error.response.status === 400 && error.response.data.errors) {
                const errorMessages = error.response.data.errors;
                for (const key in errorMessages) {
                    if (errorMessages.hasOwnProperty(key)) {
                        toast.error(`Error in ${key}: ${errorMessages[key].join(' ')}`);
                    }
                }
            } else if (error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('An error occurred. Please try again.');
            }
        } else {
            toast.error('An error occurred. Please try again.');
        }
        console.log(error);
    }
}

export const addSurgicalCategory = async (surgicalCategoryName, labId, token) => {
    try {
        await axios.post(`${base_url}/SurgicalInventory/AddSurgicalCategory`, {
            surgicalCategoryName: surgicalCategoryName,
            labId: labId
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        toast.success('Surgical Category added successfully!');

        return true;
    }
    catch (error) {
        if (error.response) {
            if (error.response.status === 400 && error.response.data.errors) {
                const errorMessages = error.response.data.errors;
                for (const key in errorMessages) {
                    if (errorMessages.hasOwnProperty(key)) {
                        toast.error(`Error in ${key}: ${errorMessages[key].join(' ')}`);
                    }
                }
            } else if (error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('An error occurred. Please try again.');
            }
        } else {
            toast.error('An error occurred. Please try again.');
        }
        console.log(error);
    }
}

export const issueItem = async (itemId, quantity, issuedByLab, remarks, token) => {
    try {
        await axios.post(`${base_url}/SurgicalInventory/IssueItem`, {
            itemId: itemId,
            quantity: quantity,
            issuedBy: issuedByLab,
            remarks: remarks
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        toast.success('Item issued successfully!');

        return true;
    }
    catch (error) {
        if (error.response) {
            if (error.response.status === 400 && error.response.data.errors) {
                const errorMessages = error.response.data.errors;
                for (const key in errorMessages) {
                    if (errorMessages.hasOwnProperty(key)) {
                        toast.error(`Error in ${key}: ${errorMessages[key].join(' ')}`);
                    }
                }
            } else if (error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('An error occurred. Please try again.');
            }
        } else {
            toast.error('An error occurred. Please try again.');
        }
        console.log(error);
    }
}

export const addQuantity = async (itemId, quantity, token) => {
    try {
        await axios.patch(`${base_url}/SurgicalInventory/AddQuantity/${itemId}`, {
            quantity: quantity
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        toast.success('Quantity added successfully!');

        return true;
    }
    catch (error) {
        if (error.response) {
            if (error.response.status === 400 && error.response.data.errors) {
                const errorMessages = error.response.data.errors;
                for (const key in errorMessages) {
                    if (errorMessages.hasOwnProperty(key)) {
                        toast.error(`Error in ${key}: ${errorMessages[key].join(' ')}`);
                    }
                }
            }
        } else {
            toast.error('An error occurred. Please try again.');
        }
        console.log(error);
    }
}

export const updateSurgicalInventoryItem = async (itemId, itemName, issuedDate, issuedBy, quantity, remarks, surgicalCategoryID, token) => {
    try {
        await axios.put(`${base_url}/SurgicalInventory/UpdateSurgicalInventoryItem/${itemId}`, {
            itemName: itemName,
            issuedDate: issuedDate,
            issuedBy: issuedBy,
            quantity: quantity,
            remarks: remarks,
            surgicalCategoryID: surgicalCategoryID
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        toast.success('Surgical Inventory Item updated successfully!');

        return true;
    }
    catch (error) {
        if (error.response) {
            if (error.response.status === 400 && error.response.data.errors) {
                const errorMessages = error.response.data.errors;
                for (const key in errorMessages) {
                    if (errorMessages.hasOwnProperty(key)) {
                        toast.error(`Error in ${key}: ${errorMessages[key].join(' ')}`);
                    }
                }
            } else if (error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('An error occurred. Please try again.');
            }
        } else {
            toast.error('An error occurred. Please try again.');
        }
        console.log(error);
    }
}

export const updateSurgicalCategory = async (categoryId, surgicalCategoryName, token) => {
    try {
        await axios.put(`${base_url}/SurgicalInventory/UpdateSurgicalCategory/${categoryId}`, {
            surgicalCategoryName: surgicalCategoryName
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        toast.success('Surgical Category updated successfully!');

        return true;
    }
    catch (error) {
        if (error.response) {
            if (error.response.status === 400 && error.response.data.errors) {
                const errorMessages = error.response.data.errors;
                for (const key in errorMessages) {
                    if (errorMessages.hasOwnProperty(key)) {
                        toast.error(`Error in ${key}: ${errorMessages[key].join(' ')}`);
                    }
                }
            }
        } else {
            toast.error('An error occurred. Please try again.');
        }
        console.log(error);
    }
}

export const deleteSurgicalInventoryItem = async (itemId, token) => {
    try {
        await axios.delete(`${base_url}/SurgicalInventory/DeleteSurgicalInventoryItem/${itemId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        toast.success('Surgical Inventory Item deleted successfully!');

        return true;
    }
    catch (error) {
        toast.error('An error occurred. Please try again.');
        console.log(error);
    }
}

export const deleteSurgicalCategory = async (categoryId, token) => {
    try {
        await axios.delete(`${base_url}/SurgicalInventory/DeleteSurgicalCategory/${categoryId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        toast.success('Surgical Category deleted successfully!');

        return true;
    }
    catch (error) {
        toast.error('An error occurred. Please try again.');
        console.log(error);
    }
}