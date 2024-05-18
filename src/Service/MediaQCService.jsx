import axios from "axios";
import base_url from "../Util/base_url";

export const getMediaQualityRecords = async (mltId) => {
    try {
        const response = await axios.get(`${base_url}/MediaQualityControl/GetMediaQualityControlRecords`, {
            params: {
                mltId: mltId
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const addMediaQualityControlRecord = async (dateTime, media, sterility, stability, sensitivity, remarks, mltId, labId) => {
    try {
        await axios.post(`${base_url}/MediaQualityControl/AddMediaQualityControlRecord`, {
            dateTime: dateTime,
            media: media,
            sterility: sterility,
            stability: stability,
            sensitivity: sensitivity,
            remarks: remarks,
            mltId: mltId,
            labId: labId
        });
        return true;
    } catch (error) {
        console.log(error);
    }
}

export const updateMediaQualityControlRecord = async (dateTime, media, sterility, stability, sensitivity, remarks) => {
    try {
        await axios.put(`${base_url}/MediaQualityControl/UpdateMediaQualityControlRecord`, {
            dateTime: dateTime,
            media: media,
            sterility: sterility,
            stability: stability,
            sensitivity: sensitivity,
            remarks: remarks
        });
        return true
    } catch (error) {
        console.log(error);
    }
}

export const deleteMediaQualityControlRecord = async (recordId) => {
    try {
        await axios.delete(`${base_url}/MediaQualityControl/DeleteMediaQualityControlRecord/${recordId}`);
        return true;
    } catch (error) {
        console.log(error);
    }
}