import axios from "axios";
import base_url from "../Util/base_url";

export const registerUser = async (userName, password, email, phoneNumber, role) => {
    try {
        const response = await axios.post(`${base_url}/User/signUp`, {
            userName: userName,
            password: password,
            email: email,
            phoneNumber: phoneNumber,
            role: role
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const addLab = async (labName, labLocation, labTelephone) => {
    try {
        await axios.post(`${base_url}/Area/AddLab`, {
            labName: labName,
            labLocation: labLocation,
            labTelephone: labTelephone
        });
        return true;
    } catch (error) {
        console.log(error);
    }
}

export const addPHIArea = async (phiAreaName, mohAreaId) => {
    try {
        await axios.post(`${base_url}/Area/AddPHIArea`, {
            phiAreaName: phiAreaName,
            mohAreaId: mohAreaId
        });
        return true;
    } catch (error) {
        console.log(error);
    }
}

export const addMOHArea = async (mohAreaName, labId) => {
    try {
        await axios.post(`${base_url}/Area/AddMOHArea`, {
            mohAreaName: mohAreaName,
            labId: labId
        });
        return true;
    } catch (error) {
        console.log(error);
    }
}

export const getMLTs = async () => {
    try {
        const response = await axios.get(`${base_url}/User/getMLTs`);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getPHIs = async () => {
    try{
        const response = await axios.get(`${base_url}/User/getPHIs`);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getMOHSupervisors = async () => {
    try{
        const response = await axios.get(`${base_url}/User/getMOHSupervisors`);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getLabs = async () => {
    try {
        const response = await axios.get(`${base_url}/Area/getLabs`);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getPHIAreas = async () => {
    try {
        const response = await axios.get(`${base_url}/Area/getPHIAreas`);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getMOHAreas = async () => {
    try {
        const response = await axios.get(`${base_url}/Area/getMOHAreas`);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const updateLabs = async (labId, labName, labLocation, labTelephone) => {
    try {
        await axios.put(`${base_url}/Area/UpdateLab/${labId}`, {
            labName: labName,
            labLocation: labLocation,
            labTelephone: labTelephone
        });
        return true;
    }
    catch (error) {
        console.log(error);
    }
}

export const updatePHIAreas = async (phiAreaId, phiAreaName, mohAreaId) => {
    try {
        await axios.put(`${base_url}/Area/UpdatePHIArea/${phiAreaId}`, {
            phiAreaName: phiAreaName,
            mohAreaId: mohAreaId
        });
        return true;
    } catch (error) {
        console.log(error);
    }
}

export const updateMOHAreas = async (mohAreaId, mohAreaName, labId) => {
    try {
        await axios.put(`${base_url}/Area/UpdateMOHArea/${mohAreaId}`, {
            mohAreaName: mohAreaName,
            labId: labId
        });
        return true;
    } catch (error) {
        console.log(error);
    }
}

export const assignMLTtoLabs = async (mltId, labId) => {
    try {
        await axios.post(`${base_url}/Userassign/assignMLTtoLabs`, {
            mltId: mltId,
            labId: labId
        });
        return true;
    } catch (error) {
        console.log(error);
    }
}

export const assignPHItoPHIAreas = async (phiId, phiAreaId) => {
    try {
        await axios.post(`${base_url}/Userassign/assignPHItoPHIAreas`, {
            phiId: phiId,
            phiAreaId: phiAreaId
        });
        return true;
    } catch (error) {
        console.log(error);
    }
}

export const assignMOHSupervisortoMOHAreas = async (mohSupervisorId, mohAreaId) => {
    try {
        await axios.post(`${base_url}/Userassign/assignMOHSupervisortoMOHAreas`, {
            mohSupervisorId: mohSupervisorId,
            mohAreaId: mohAreaId
        });
        return true;
    } catch (error) {
        console.log(error);
    }
}

export const deleteUser = async (id) => {
    try {
        await axios.delete(`${base_url}/User/deleteUser/${id}`);
        return true;
    } catch (error) {
        console.log(error);
    }
}


export const deleteLab = async (id) => {
    try {
        await axios.delete(`${base_url}/Area/DeleteLab/${id}`);
        return true;
    } catch (error) {
        console.log(error);
    }
}

export const deletePHIArea = async (id) => {
    try {
        await axios.delete(`${base_url}/Area/DeletePHIArea/${id}`);
        return true;
    } catch (error) {
        console.log(error);
    }
}

export const deleteMOHArea = async (id) => {
    try {
        await axios.delete(`${base_url}/Area/DeleteMOHArea/${id}`);
        return true;
    } catch (error) {
        console.log(error);
    }
}