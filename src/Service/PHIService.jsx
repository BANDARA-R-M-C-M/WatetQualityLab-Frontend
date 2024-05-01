import axios from "axios";
import base_url from "../Util/base_url";

export const getPHIDetails = async (phiId) => {
    try {
        const data = await axios.get(`${base_url}/Area/GetPHIDetails`, {
            params: {
                phiId: phiId
            }
        });
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const submitSample = async (sampleId, dateOfCollection, catagoryOfSource, collectingSource, stateOfChlorination, phiId, phiAreaID, phiAreaName) => {
    try {
        await axios.post(`${base_url}/WCReport/AddWCSample`, {
            sampleId: sampleId,
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