import axios from "axios";
import base_url from "../Util/base_url";

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
            headers: {
                Authorization: `Bearer ${token}`
            },
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
        });
        return true;
    } catch (error) {
        console.log(error);
    }
}

export const updateInstrumentalQualityControlRecord = async (updateId, dateTime, instrumentId, temperatureFluctuation, pressureGradient, timer, sterility, stability, remarks, mltId, token) => {
    try {
        await axios.put(`${base_url}/InstrumentalQualityControl/UpdateInstrumentalQualityControlRecord/${updateId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            dateTime: dateTime,
            instrumentId: instrumentId,
            temperatureFluctuation: temperatureFluctuation,
            pressureGradient: pressureGradient,
            timer: timer,
            sterility: sterility,
            stability: stability,
            remarks: remarks,
            mltId: mltId
        });
        return true
    } catch (error) {
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
        return true;
    } catch (error) {
        console.log(error);
    }
}