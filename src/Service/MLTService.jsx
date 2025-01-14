import axios from "axios";
import base_url from "../Util/base_url";
import { toast } from 'react-toastify';

export const getPendingSamples = async (mltId, searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, sortBy, isAscending, token) => {
  try {
    const response = await axios.get(`${base_url}/WCSample/GetPendingSamples`, {
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
};

export const getAcceptedSamples = async (mltId, searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, sortBy, isAscending, token) => {
  try {
    const response = await axios.get(`${base_url}/WCSample/GetAcceptedSamples`, {
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
};

export const getComments = async (token) => {
  try {
    const response = await axios.get(`${base_url}/WCReport/GetComments`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getAddedReports = async (mltId, searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, sortBy, isAscending, token) => {
  try {
    const response = await axios.get(`${base_url}/WCReport/getAddedReports`, {
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

export const getReportPDF = async (reportId, token) => {
  try {
    const response = await axios.get(`${base_url}/WCReport/GetReportPDF`, {
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        reportId: reportId
      }
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const getSampleCount = async (mltId, searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, sortBy, isAscending, token) => {
  try {
    const response = await axios.get(`${base_url}/WCSample/GetSampleCount`, {
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

export const getSampleCountReport = async (mltId, year, token) => {
  try {
    const response = await axios.get(`${base_url}/WCSample/GetSampleCountReport`, {
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        MltId: mltId,
        Year: year
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

export const getMonthlySampleDetails = async (mltId, searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, year, month, token) => {
  try {
    const response = await axios.get(`${base_url}/WCSample/GetMonthlySamples`, {
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
        Year: year,
        Month: month
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

export const submitReport = async (myRefNo, PresumptiveColiformCount, analyzedDate, EcoliCount, AppearanceOfSample, Remarks, IsContaminated, MltId, SampleId, LabId, token) => {
  try {
    await axios.post(`${base_url}/WCReport/AddWCReport`, {
      myRefNo: myRefNo,
      presumptiveColiformCount: PresumptiveColiformCount,
      analyzedDate: analyzedDate,
      ecoliCount: EcoliCount,
      appearanceOfSample: AppearanceOfSample,
      remarks: Remarks,
      contaminated: IsContaminated,
      mltId: MltId,
      sampleId: SampleId,
      labId: LabId
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    toast.success('Report submitted successfully.');

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

export const generateReport = async (ReportRefId, token) => {
  try {
    await axios.post(`${base_url}/Report/uploadPDF`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        reportRefId: ReportRefId
      }
    });
  } catch (error) {
    console.log(error);
  }
}

export const updateStatus = async (sampleId, Status, Comment, token) => {
  try {
    await axios.put(`${base_url}/WCSample/updateSampleStatus`, {
      sampleId: sampleId,
      status: Status,
      comment: Comment
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
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
      }
    } else {
      toast.error('An error occurred. Please try again.');
    }
    console.log(error);
  }
};

export const updateWCReport = async (ReportRefId, myRefNo, AppearanceOfSample, PresumptiveColiformCount, EcoliCount, Results, Contaminated, token) => {
  try {
    await axios.put(`${base_url}/WCReport/updateWCReport/${ReportRefId}`, {
      myRefNo: myRefNo,
      appearanceOfSample: AppearanceOfSample,
      presumptiveColiformCount: PresumptiveColiformCount,
      ecoliCount: EcoliCount,
      remarks: Results,
      contaminated: Contaminated
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    toast.success('Report updated successfully.');

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
      }
    } else {
      toast.error('An error occurred. Please try again.');
    }
    console.log(error);
  }
};

export const deleteWCReport = async (reportId, token) => {
  try {
    await axios.delete(`${base_url}/WCReport/deleteWCReport/${reportId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    toast.success('Report deleted successfully.');

    return true;
  } catch (error) {
    toast.error('An error occurred. Please try again.');
    console.log(error);
  }
};