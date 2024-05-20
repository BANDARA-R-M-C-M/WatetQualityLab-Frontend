import axios from "axios";
import base_url from "../Util/base_url";

export const getGeneralInventoryQR = async (itemId) => {
    try {
        const response = await axios.get(`${base_url}/GeneralInventory/GetGeneralInventoryQR`, {
            responseType: 'blob',
            params: {
                itemId: itemId
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getGeneralItemDetails = async (itemId) => {
    try {
        const response = await axios.get(`${base_url}/GeneralInventory/GetGeneralInventoryItem`, {
            params: {
                itemId: itemId
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getGeneralInventoryItems = async (mltId, categoryId, generalItemName, pageNumber, pageSize, sortBy, isAscending) => {
    try {
        const response = await axios.get(`${base_url}/GeneralInventory/GetGeneralInventoryItems`, {
            params: {
                UserId: mltId,
                CategoryId: categoryId,
                GeneralItemName: generalItemName,
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

export const getGeneralCatagories = async (mltId, generalCategoryName, pageNumber, pageSize, sortBy, isAscending) => {
    try {
        const response = await axios.get(`${base_url}/GeneralInventory/GetGeneralCategories`, {
            params: {
                UserId: mltId,
                GeneralCategoryName: generalCategoryName,
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

export const addGeneralInventoryItem = async (itemName, issuedDate, issuedBy, remarks, generalCategoryID, labId) => {
    try {
        await axios.post(`${base_url}/GeneralInventory/AddGeneralInventoryItem`, {
            itemName: itemName,
            issuedDate: issuedDate,
            issuedBy: issuedBy,
            remarks: remarks,
            generalCategoryID: generalCategoryID,
            labId: labId
        });
        return true;
    } catch (error) {
        console.log(error);
    }
}

export const addGeneralCategory = async (generalCategoryName, labId) => {
    try {
        await axios.post(`${base_url}/GeneralInventory/AddGeneralCategory`, {
            generalCategoryName: generalCategoryName,
            labId: labId
        });
        return true;
    } catch (error) {
        console.log(error);
    }
}

export const updateGeneralInventoryItem = async (itemId, itemName, issuedDate, issuedBy, remarks, generalCategoryID) => {
    try {
        await axios.put(`${base_url}/GeneralInventory/UpdateGeneralInventoryItem/${itemId}`, {
            itemName: itemName,
            issuedDate: issuedDate,
            issuedBy: issuedBy,
            remarks: remarks,
            generalCategoryID: generalCategoryID
        });
        return true;
    } catch (error) {
        console.log(error);
    }
}

export const updateGeneralCategory = async (categoryId, generalCategoryName) => {
    try {
        await axios.put(`${base_url}/GeneralInventory/UpdateGeneralCategory/${categoryId}`, {
            generalCategoryName: generalCategoryName
        });
        return true;
    } catch (error) {
        console.log(error);
    }
}

export const deleteGeneralInventoryItem = async (itemId) => {
    try {
        await axios.delete(`${base_url}/GeneralInventory/DeleteGeneralInventoryItem/${itemId}`);
        return true;
    } catch (error) {
        console.log(error);
    }
}

export const deleteGeneralCategory = async (categoryId) => {
    try {
        await axios.delete(`${base_url}/GeneralInventory/DeleteGeneralCategory/${categoryId}`);
        return true;
    } catch (error) {
        console.log(error);
    }
}