import axios from "axios";
import base_url from "../Util/base_url";

export const getPHIDetails = async (phiId, token) => {
    try {
        const response = await axios.get(`${base_url}/Area/GetPHIDetails`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                phiId: phiId
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const getAddedSamples = async (phiId, searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, sortBy, isAscending, token) => {
    try {
        const response = await axios.get(`${base_url}/WCSample/getAddedSamples`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                UserId: phiId,
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

export const getSampleCount = async (phiId, token) => {
    try {
        const response = await axios.get(`${base_url}/WCSample/GetSampleCountDetails`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                UserId: phiId
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getHistory = async (phiId, searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, sortBy, isAscending, token) => {
    try {
        const response = await axios.get(`${base_url}/WCSample/GetHistory`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                UserId: phiId,
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

export const submitSample = async (yourRefNo, dateOfCollection, catagoryOfSource, collectingSource, stateOfChlorination, phiId, phiAreaID, phiAreaName, token) => {
    try {
        await axios.post(`${base_url}/WCSample/AddWCSample`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            yourRefNo: yourRefNo,
            stateOfChlorination: stateOfChlorination,
            dateOfCollection: dateOfCollection,
            catagoryOfSource: catagoryOfSource,
            collectingSource: collectingSource,
            phiId: phiId,
            phiAreaName: phiAreaName,
            phiAreaID: phiAreaID
        });
        return true;
    } catch (error) {
        console.log(error);
    }
};

export const updateWCSample = async (sampleId, yourRefNo, dateOfCollection, catagoryOfSource, collectingSource, stateOfChlorination, token) => {
    try {
        await axios.put(`${base_url}/WCSample/updateWCSample/${sampleId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            yourRefNo: yourRefNo,
            stateOfChlorination: stateOfChlorination,
            dateOfCollection: dateOfCollection,
            catagoryOfSource: catagoryOfSource,
            collectingSource: collectingSource
        });
        return true;
    } catch (error) {
        console.log(error);
    }
};

export const deleteWCSample = async (sampleId, token) => {
    try {
        await axios.delete(`${base_url}/WCSample/deleteWCSample/${sampleId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return true;
    } catch (error) {
        console.log(error);
    }
};