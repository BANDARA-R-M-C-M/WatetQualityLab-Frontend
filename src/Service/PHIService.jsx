import axios from "axios";
import base_url from "../Util/base_url";

export const getPHIDetails = async (phiId) => {
    try {
        const response = await axios.get(`${base_url}/Area/GetPHIDetails`, {
            params: {
                phiId: phiId
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const getAddedSamples = async (phiId) => {
    try {
        const response = await axios.get(`${base_url}/WCSample/getAddedSamples`, {
            params: {
                phiId: phiId
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const submitSample = async (yourRefNo, dateOfCollection, catagoryOfSource, collectingSource, stateOfChlorination, phiId, phiAreaID, phiAreaName) => {
    try {
        await axios.post(`${base_url}/WCSample/AddWCSample`, {
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

export const updateWCSample = async (sampleId, yourRefNo, dateOfCollection, catagoryOfSource, collectingSource, stateOfChlorination) => {
    try {
        await axios.put(`${base_url}/WCSample/updateWCSample/${sampleId}`, {
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

export const deleteWCSample = async (sampleId) => {
    try {
        await axios.delete(`${base_url}/WCSample/deleteWCSample/${sampleId}`);
        return true;
    } catch (error) {
        console.log(error);
    }
};