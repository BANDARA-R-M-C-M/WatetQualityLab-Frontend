import axios from "axios";
import base_url from "../Util/base_url";

export const getPendingSamples = async (mltId, searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, sortBy, isAscending) => {
  try {
    const response = await axios.get(`${base_url}/WCSample/GetPendingSamples`, {
      // headers: {
      //     Authorization: `Bearer ${token}`
      // },
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
};

export const getAcceptedSamples = async (mltId, searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, sortBy, isAscending) => {
  try {
    const response = await axios.get(`${base_url}/WCSample/GetAcceptedSamples`, {
      // headers: {
      //     Authorization: `Bearer ${token}`
      // },
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
};

export const getAddedReports = async (mltId, searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, sortBy, isAscending) => {
  try {
    const response = await axios.get(`${base_url}/WCReport/getAddedReports`, {
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

export const getReportPDF = async (reportId) => {
  try {
    const response = await axios.get(`${base_url}/WCReport/GetReportPDF`, {
      responseType: 'blob',
      params: {
        reportId: reportId
      }
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const getSampleCount = async (mltId, searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, sortBy, isAscending) => {
  try {
    const response = await axios.get(`${base_url}/WCSample/GetSampleCount`, {
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

export const submitReport = async (myRefNo, PresumptiveColiformCount, analyzedDate, EcoliCount, AppearanceOfSample, Remarks, MltId, SampleId, LabId) => {
  try {
    await axios.post(`${base_url}/WCReport/AddWCReport`, {
      myRefNo: myRefNo,
      presumptiveColiformCount: PresumptiveColiformCount,
      analyzedDate: analyzedDate,
      ecoliCount: EcoliCount,
      appearanceOfSample: AppearanceOfSample,
      remarks: Remarks,
      mltId: MltId,
      sampleId: SampleId,
      labId: LabId
    });
    return true;
  } catch (error) {
    console.log(error);
  }
}

export const generateReport = async (ReportRefId) => {
  try {
    await axios.post(`${base_url}/Report/uploadPDF`, {
      params: {
        reportRefId: ReportRefId
      }
    });
  } catch (error) {
    console.log(error);
  }
}

export const updateStatus = async (sampleId, Status, Comment) => {
  try {
    await axios.put(`${base_url}/WCSample/updateSampleStatus`, {
      sampleId: sampleId,
      status: Status,
      comment: Comment
    });
    return true;
  } catch (error) {
    console.log(error);
  }
};

export const updateWCReport = async (ReportRefId, myRefNo, AppearanceOfSample, PresumptiveColiformCount, EcoliCount, Results) => {
  try {
    await axios.put(`${base_url}/WCReport/updateWCReport/${ReportRefId}`, {
      myRefNo: myRefNo,
      appearanceOfSample: AppearanceOfSample,
      presumptiveColiformCount: PresumptiveColiformCount,
      ecoliCount: EcoliCount,
      remarks: Results
    });
    return true;
  } catch (error) {
    console.log(error);
  }
};

export const deleteWCReport = async (reportId) => {
  try {
    await axios.delete(`${base_url}/WCReport/deleteWCReport/${reportId}`);
    return true;
  } catch (error) {
    console.log(error);
  }
};