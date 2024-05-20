import axios from "axios";
import base_url from "../Util/base_url";

export const getSurgicalInventoryQR = async (itemId) => {
    try {
        const response = await axios.get(`${base_url}/SurgicalInventory/GetSurgicalInventoryQR`, {
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

export const getSurgicalItemDetails = async (itemId) => {
    try {
        const response = await axios.get(`${base_url}/SurgicalInventory/GetSurgicalInventoryItem`, {
            params: {
                itemId: itemId
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getSurgicalInventoryItems = async (mltId, categoryId, surgicalItemName, pageNumber, pageSize, sortBy, isAscending) => {
    try {
        const response = await axios.get(`${base_url}/SurgicalInventory/GetSurgicalInventoryItems`, {
            params: {
                UserId: mltId,
                CategoryId: categoryId,
                SurgicalItemName: surgicalItemName,
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

export const getSurgicalCatagories = async (mltId, surgicalCategoryName, pageNumber, pageSize, sortBy, isAscending) => {
    try {
        const response = await axios.get(`${base_url}/SurgicalInventory/GetSurgicalCategories`, {
            params: {
                UserId: mltId,
                SurgicalCategoryName: surgicalCategoryName,
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

export const addSurgicalInventoryItem = async (itemName, issuedDate, issuedBy, quantity, remarks, surgicalCategoryID, labId) => {
    try {
        await axios.post(`${base_url}/SurgicalInventory/AddSurgicalInventoryItem`, {
            itemName: itemName,
            issuedDate: issuedDate,
            issuedBy: issuedBy,
            quantity: quantity,
            remarks: remarks,
            surgicalCategoryID: surgicalCategoryID,
            labId: labId
        });
        return true;
    }
    catch (error) {
        console.log(error);
    }
}

export const addSurgicalCategory = async (surgicalCategoryName, labId) => {
    try {
        await axios.post(`${base_url}/SurgicalInventory/AddSurgicalCategory`, {
            surgicalCategoryName: surgicalCategoryName,
            labId: labId
        });
        return true;
    }
    catch (error) {
        console.log(error);
    }
}

export const issueItem = async (itemId, quantity, issuedByLab, remarks) => {
    try {
        await axios.post(`${base_url}/SurgicalInventory/IssueItem`, {
            itemId: itemId,
            quantity: quantity,
            issuedBy: issuedByLab,
            remarks: remarks
        });
        return true;
    }
    catch (error) {
        console.log(error);
    }
}

export const addQuantity = async (itemId, quantity) => {
    try {
        await axios.patch(`${base_url}/SurgicalInventory/AddQuantity/${itemId}`, {
            quantity: quantity
        });
        return true;
    }
    catch (error) {
        console.log(error);
    }
}

export const updateSurgicalInventoryItem = async (itemId, itemName, issuedDate, issuedBy, quantity, remarks, surgicalCategoryID) => {
    try {
        await axios.put(`${base_url}/SurgicalInventory/UpdateSurgicalInventoryItem/${itemId}`, {
            itemName: itemName,
            issuedDate: issuedDate,
            issuedBy: issuedBy,
            quantity: quantity,
            remarks: remarks,
            surgicalCategoryID: surgicalCategoryID
        });
        return true;
    }
    catch (error) {
        console.log(error);
    }
}

export const updateSurgicalCategory = async (categoryId, surgicalCategoryName) => {
    try {
        await axios.put(`${base_url}/SurgicalInventory/UpdateSurgicalCategory/${categoryId}`, {
            surgicalCategoryName: surgicalCategoryName
        });
        return true;
    }
    catch (error) {
        console.log(error);
    }
}

export const deleteSurgicalInventoryItem = async (itemId) => {
    try {
        await axios.delete(`${base_url}/SurgicalInventory/DeleteSurgicalInventoryItem/${itemId}`);
        return true;
    }
    catch (error) {
        console.log(error);
    }
}

export const deleteSurgicalCategory = async (categoryId) => {
    try {
        await axios.delete(`${base_url}/SurgicalInventory/DeleteSurgicalCategory/${categoryId}`);
        return true;
    }
    catch (error) {
        console.log(error);
    }
}