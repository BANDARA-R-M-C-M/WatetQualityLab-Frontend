import axios from "axios";
import base_url from "../Util/base_url";

export const getInstrumentalQualityRecords = async (mltId, instrumentId, pageNumber, pageSize, sortBy, isAscending) => {
    try {
        const response = await axios.get(`${base_url}/InstrumentalQualityControl/GetInstrumentalQualityControlRecords`, {
            params: {
                UserId: mltId,
                InstrumentId: instrumentId,
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

export const addInstrumentalQualityControlRecord = async (dateTime, instrumentId, temperatureFluctuation, pressureGradient, timer, sterility, stability, remarks, mltId, labId) => {
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
        });
        return true;
    } catch (error) {
        console.log(error);
    }
}

export const updateInstrumentalQualityControlRecord = async (updateId, dateTime, instrumentId, temperatureFluctuation, pressureGradient, timer, sterility, stability, remarks, mltId) => {
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
        });
        return true
    } catch (error) {
        console.log(error);
    }
}

export const deleteInstrumentalQualityControlRecord = async (recordId) => {
    try {
        await axios.delete(`${base_url}/InstrumentalQualityControl/DeleteInstrumentalQualityControlRecord/${recordId}`);
        return true;
    } catch (error) {
        console.log(error);
    }
}