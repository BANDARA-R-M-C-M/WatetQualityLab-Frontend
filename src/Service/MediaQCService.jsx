import axios from "axios";
import base_url from "../Util/base_url";

export const getMediaQualityRecords = async (mltId, searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, sortBy, isAscending) => {
    try {
        const response = await axios.get(`${base_url}/MediaQualityControl/GetMediaQualityControlRecords`, {
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

export const addMediaQualityControlRecord = async (dateTime, mediaId, sterility, stability, sensitivity, remarks, mltId, labId) => {
    try {
        await axios.post(`${base_url}/MediaQualityControl/AddMediaQualityControlRecord`, {
            dateTime: dateTime,
            mediaId: mediaId,
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

export const updateMediaQualityControlRecord = async (updateId, dateTime, mediaId, sterility, stability, sensitivity, remarks, mltId) => {
    try {
        await axios.put(`${base_url}/MediaQualityControl/UpdateMediaQualityControlRecord/${updateId}`, {
            dateTime: dateTime,
            mediaId: mediaId,
            sterility: sterility,
            stability: stability,
            sensitivity: sensitivity,
            remarks: remarks,
            mltId: mltId
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