import axios from "axios";
import base_url from "../Util/base_url";
import { toast } from "react-toastify";

export const getMediaQualityRecords = async (mltId, searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, sortBy, isAscending, token) => {
    try {
        const response = await axios.get(`${base_url}/MediaQualityControl/GetMediaQualityControlRecords`, {
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
        if (error.response) {
            if (error.response.status === 404) {
                const errorMessage = error.response.data;
                toast.error(errorMessage);
            } else {
                toast.error('An error occurred. Please try again.');
            }
        } else {
            toast.error('An error occurred. Please try again.');
        }
        console.log(error);
    }
}

export const addMediaQualityControlRecord = async (dateTime, mediaId, sterility, stability, sensitivity, remarks, mltId, labId, token) => {
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
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        toast.success('Media Quality Control Record added successfully.');

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

export const updateMediaQualityControlRecord = async (updateId, dateTime, mediaId, sterility, stability, sensitivity, remarks, mltId, token) => {
    try {
        await axios.put(`${base_url}/MediaQualityControl/UpdateMediaQualityControlRecord/${updateId}`, {
            dateTime: dateTime,
            mediaId: mediaId,
            sterility: sterility,
            stability: stability,
            sensitivity: sensitivity,
            remarks: remarks,
            mltId: mltId
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        toast.success('Media Quality Control Record updated successfully.');

        return true
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

export const deleteMediaQualityControlRecord = async (recordId, token) => {
    try {
        await axios.delete(`${base_url}/MediaQualityControl/DeleteMediaQualityControlRecord/${recordId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        toast.success('Media Quality Control Record deleted successfully.');

        return true;
    } catch (error) {
        toast.error('An error occurred. Please try again.');
        console.log(error);
    }
}