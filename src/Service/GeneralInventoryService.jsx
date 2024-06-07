import axios from "axios";
import base_url from "../Util/base_url";
import { toast } from "react-toastify";

export const getGeneralInventoryQR = async (itemId, token) => {
    try {
        const response = await axios.get(`${base_url}/GeneralInventory/GetGeneralInventoryQR`, {
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

export const getGeneralItemDetails = async (itemId, token) => {
    try {
        const response = await axios.get(`${base_url}/GeneralInventory/GetGeneralInventoryItem`, {
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

export const getGeneralInventoryItems = async (mltId, categoryId, searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, sortBy, isAscending, token) => {
    try {
        const response = await axios.get(`${base_url}/GeneralInventory/GetGeneralInventoryItems`, {
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
    } catch (error) {
        console.log(error);
    }
}

export const getGeneralCatagories = async (mltId, searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, sortBy, isAscending, token) => {
    try {
        const response = await axios.get(`${base_url}/GeneralInventory/GetGeneralCategories`, {
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
    } catch (error) {
        console.log(error);
    }
}

export const addGeneralInventoryItem = async (itemName, issuedDate, issuedBy, remarks, generalCategoryID, labId, token) => {
    try {
        await axios.post(`${base_url}/GeneralInventory/AddGeneralInventoryItem`, {
            itemName: itemName,
            issuedDate: issuedDate,
            issuedBy: issuedBy,
            remarks: remarks,
            generalCategoryID: generalCategoryID,
            labId: labId
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        toast.success("General Inventory Item added successfully");

        return true;
    } catch (error) {
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

export const addGeneralCategory = async (generalCategoryName, labId, token) => {
    try {
        await axios.post(`${base_url}/GeneralInventory/AddGeneralCategory`, {
            generalCategoryName: generalCategoryName,
            labId: labId
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        toast.success("General Category added successfully");

        return true;
    } catch (error) {
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

export const updateGeneralInventoryItem = async (itemId, itemName, issuedDate, issuedBy, remarks, generalCategoryID, token) => {
    try {
        await axios.put(`${base_url}/GeneralInventory/UpdateGeneralInventoryItem/${itemId}`, {
            itemName: itemName,
            issuedDate: issuedDate,
            issuedBy: issuedBy,
            remarks: remarks,
            generalCategoryID: generalCategoryID
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        toast.success("General Inventory Item updated successfully");

        return true;
    } catch (error) {
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

export const updateGeneralCategory = async (categoryId, generalCategoryName, token) => {
    try {
        await axios.put(`${base_url}/GeneralInventory/UpdateGeneralCategory/${categoryId}`, {
            generalCategoryName: generalCategoryName
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        toast.success("General Category updated successfully");

        return true;
    } catch (error) {
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

export const deleteGeneralInventoryItem = async (itemId, token) => {
    try {
        await axios.delete(`${base_url}/GeneralInventory/DeleteGeneralInventoryItem/${itemId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        toast.success("General Inventory Item deleted successfully");

        return true;
    } catch (error) {
        toast.error('An error occurred. Please try again.');
        console.log(error);
    }
}

export const deleteGeneralCategory = async (categoryId, token) => {
    try {
        await axios.delete(`${base_url}/GeneralInventory/DeleteGeneralCategory/${categoryId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        toast.success("General Category deleted successfully");

        return true;
    } catch (error) {
        toast.error('An error occurred. Please try again.');
        console.log(error);
    }
}