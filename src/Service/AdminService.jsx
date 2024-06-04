import axios from "axios";
import base_url from "../Util/base_url";

export const fetchLocations = async (location) => {
    try {
        const response = await axios.get(`${base_url}/WCSample/GetCities`, {
            params: {
                query: location
            }
        });
        
        const cityNames = response.data.predictions.map(prediction => prediction.structured_formatting.main_text);

        return cityNames;
    } catch (error) {
        console.error('Error fetching cities:', error);
        return [];
    }
};

export const registerUser = async (id, userName, password, email, phoneNumber, role, token) => {
    try {
        const response = await axios.post(`${base_url}/User/signUp`, {
            id: id,
            userName: userName,
            password: password,
            email: email,
            phoneNumber: phoneNumber,
            role: role
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const addLab = async (labName, labLocation, labTelephone, token) => {
    try {
        await axios.post(`${base_url}/Area/AddLab`, {
            labName: labName,
            labLocation: labLocation,
            labTelephone: labTelephone
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return true;
    } catch (error) {
        console.log(error);
    }
}

export const addPHIArea = async (phiAreaName, mohAreaId, token) => {
    try {
        await axios.post(`${base_url}/Area/AddPHIArea`, {
            phiAreaName: phiAreaName,
            mohAreaId: mohAreaId
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return true;
    } catch (error) {
        console.log(error);
    }
}

export const addMOHArea = async (mohAreaName, labId, token) => {
    try {
        await axios.post(`${base_url}/Area/AddMOHArea`, {
            mohAreaName: mohAreaName,
            labId: labId
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        return true;
    } catch (error) {
        console.log(error);
    }
}

export const getMLTs = async (searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, sortBy, isAscending, token) => {
    try {
        const response = await axios.get(`${base_url}/User/getMLTs`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
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

export const getPHIs = async (searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, sortBy, isAscending, token) => {
    try {
        const response = await axios.get(`${base_url}/User/getPHIs`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
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

export const getMOHSupervisors = async (searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, sortBy, isAscending, token) => {
    try {
        const response = await axios.get(`${base_url}/User/getMOHSupervisors`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
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

export const getLabs = async (searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, sortBy, isAscending, token) => {
    try {
        const response = await axios.get(`${base_url}/Area/getLabs`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
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

export const getPHIAreas = async (searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, sortBy, isAscending, token) => {
    try {
        const response = await axios.get(`${base_url}/Area/getPHIAreas`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
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

export const getMOHAreas = async (searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, sortBy, isAscending, token) => {
    try {
        const response = await axios.get(`${base_url}/Area/getMOHAreas`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
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

export const updateLabs = async (labId, labName, labLocation, labTelephone, token) => {
    try {
        await axios.put(`${base_url}/Area/UpdateLab/${labId}`, {
            labName: labName,
            labLocation: labLocation,
            labTelephone: labTelephone
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return true;
    }
    catch (error) {
        console.log(error);
    }
}

export const updatePHIAreas = async (phiAreaId, phiAreaName, mohAreaId, token) => {
    try {
        await axios.put(`${base_url}/Area/UpdatePHIArea/${phiAreaId}`, {
            phiAreaName: phiAreaName,
            mohAreaId: mohAreaId
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return true;
    } catch (error) {
        console.log(error);
    }
}

export const updateMOHAreas = async (mohAreaId, mohAreaName, labId, token) => {
    try {
        await axios.put(`${base_url}/Area/UpdateMOHArea/${mohAreaId}`, {
            mohAreaName: mohAreaName,
            labId: labId
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return true;
    } catch (error) {
        console.log(error);
    }
}

export const assignMLTtoLabs = async (mltId, labId, token) => {
    try {
        await axios.post(`${base_url}/Userassign/AssignMLTtoLabs`, {
            mltId: mltId,
            labId: labId
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return true;
    } catch (error) {
        console.log(error);
    }
}

export const assignPHItoPHIAreas = async (phiId, phiAreaId, token) => {
    try {
        await axios.post(`${base_url}/Userassign/AssignPHItoPHIAreas`, {
            phiId: phiId,
            phiAreaId: phiAreaId
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return true;
    } catch (error) {
        console.log(error);
    }
}

export const assignMOHSupervisortoMOHAreas = async (mohSupervisorId, mohAreaId, token) => {
    try {
        await axios.post(`${base_url}/Userassign/AssignMOHSupervisortoMOHAreas`, {
            mohSupervisorId: mohSupervisorId,
            mohAreaId: mohAreaId
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return true;
    } catch (error) {
        console.log(error);
    }
}

export const deleteUser = async (id, token) => {
    try {
        await axios.delete(`${base_url}/User/deleteUser/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return true;
    } catch (error) {
        console.log(error);
    }
}


export const deleteLab = async (id, token) => {
    try {
        await axios.delete(`${base_url}/Area/DeleteLab/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return true;
    } catch (error) {
        console.log(error);
    }
}

export const deletePHIArea = async (id, token) => {
    try {
        await axios.delete(`${base_url}/Area/DeletePHIArea/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return true;
    } catch (error) {
        console.log(error);
    }
}

export const deleteMOHArea = async (id, token) => {
    try {
        await axios.delete(`${base_url}/Area/DeleteMOHArea/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return true;
    } catch (error) {
        console.log(error);
    }
}