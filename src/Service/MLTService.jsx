import axios from "axios";
import base_url from "../Util/base_url";

export const getNewSamples = async (mltId) => {
  try {
    const response = await axios.get(`${base_url}/WCReport/newsamples`, {
      // headers: {
      //     Authorization: `Bearer ${token}`
      // },
      params: {
        mltId: mltId
      }
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getAddedReports = async (mltId) => {
  try {
    const response = await axios.get(`${base_url}/WCReport/getAddedReports`, {
      params: {
        mltId: mltId
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

export const previewReport = async (sampleId, StateOfChlorination, CollectingSource, DateOfCollection, AnalyzedDate, ReportRefId, IssuedDate,
  PresumptiveColiformCount, EcoliCount, AppearanceOfSample, Results, LabName, LabLocation, LabTelephone) => {
  try {
    const response = await axios.post(`${base_url}/WCReport/generatePdf`, {
      sampleId: sampleId,
      stateOfChlorination: StateOfChlorination,
      collectingSource: CollectingSource,
      dateOfCollection: DateOfCollection,
      analyzedDate: AnalyzedDate,
      reportRefId: ReportRefId,
      issuedDate: IssuedDate,
      presumptiveColiformCount: PresumptiveColiformCount,
      ecoliCount: EcoliCount,
      appearanceOfSample: AppearanceOfSample,
      results: Results,
      labName: LabName,
      labLocation: LabLocation,
      labTelephone: LabTelephone
    }, {
      responseType: 'blob'
    }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateStatus = async (sampleId, Status, Comment) => {
  try {
    await axios.put(`${base_url}/WCReport/updateSampleStatus`, {
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
      results: Results
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