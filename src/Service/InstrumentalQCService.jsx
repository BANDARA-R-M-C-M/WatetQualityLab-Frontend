import axios from "axios";
import base_url from "../Util/base_url";

export const getInstrumentalQualityRecords = async (mltId) => {
    try {
        const response = await axios.get(`${base_url}/InstrumentalQualityControl/GetInstrumentalQualityControlRecords`, {
            params: {
                mltId: mltId
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const addInstrumentalQualityControlRecord = async (dateTime, instrument, temperatureFluctuation, pressureGradient, timer, sterility, stability, remarks, mltId, labId) => {
    try {
        await axios.post(`${base_url}/InstrumentalQualityControl/AddInstrumentalQualityControlRecord`, {
            dateTime: dateTime,
            instrument: instrument,
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

export const updateInstrumentalQualityControlRecord = async (dateTime, instrument, temperatureFluctuation, pressureGradient, timer, sterility, stability, remarks) => {
    try {
        await axios.put(`${base_url}/InstrumentalQualityControl/UpdateInstrumentalQualityControlRecord`, {
            dateTime: dateTime,
            instrument: instrument,
            temperatureFluctuation: temperatureFluctuation,
            pressureGradient: pressureGradient,
            timer: timer,
            sterility: sterility,
            stability: stability,
            remarks: remarks
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