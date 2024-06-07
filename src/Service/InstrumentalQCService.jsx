import axios from "axios";
import base_url from "../Util/base_url";
import { toast } from "react-toastify";

export const getInstrumentalQualityRecords = async (mltId, searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, sortBy, isAscending, token) => {
    try {
        const response = await axios.get(`${base_url}/InstrumentalQualityControl/GetInstrumentalQualityControlRecords`, {
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

export const addInstrumentalQualityControlRecord = async (dateTime, instrumentId, temperatureFluctuation, pressureGradient, timer, sterility, stability, remarks, mltId, labId, token) => {
    try {
        await axios.post(`${base_url}/InstrumentalQualityControl/AddInstrumentalQualityControlRecord`, {
            dateTime: dateTime,
            instrumentId: instrumentId,
            temperatureFluctuation: temperatureFluctuation,
            pressureGradient: pressureGradient,
            timer: timer,
            sterility: sterility,
            stability: stability,
            remarks: remarks,
            mltId: mltId,
            labId: labId
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        toast.success('Instrumental Quality Control Record added successfully.');

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

export const updateInstrumentalQualityControlRecord = async (updateId, dateTime, instrumentId, temperatureFluctuation, pressureGradient, timer, sterility, stability, remarks, mltId, token) => {
    try {
        await axios.put(`${base_url}/InstrumentalQualityControl/UpdateInstrumentalQualityControlRecord/${updateId}`, {
            dateTime: dateTime,
            instrumentId: instrumentId,
            temperatureFluctuation: temperatureFluctuation,
            pressureGradient: pressureGradient,
            timer: timer,
            sterility: sterility,
            stability: stability,
            remarks: remarks,
            mltId: mltId
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        toast.success('Instrumental Quality Control Record updated successfully.');

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

export const deleteInstrumentalQualityControlRecord = async (recordId, token) => {
    try {
        await axios.delete(`${base_url}/InstrumentalQualityControl/DeleteInstrumentalQualityControlRecord/${recordId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        toast.success('Instrumental Quality Control Record deleted successfully.');

        return true;
    } catch (error) {
        toast.error('An error occurred. Please try again.');
        console.log(error);
    }
}