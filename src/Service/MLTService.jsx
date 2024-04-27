import axios from "axios";
import base_url from "../Util/base_url";

export const getNewSamples = async (mltId) => {
  try {
    const data = await axios.get(`${base_url}/WCReport/newsamples`, {
        // headers: {
        //     Authorization: `Bearer ${token}`
        // },
        params: {
            mltId: mltId
        },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const submitReport = async (ReportRefId, PresumptiveColiformCount, IssuedDate, EcoliCount, AppearanceOfSample, Results, Remarks, SampleId, LabId) => {
  try {
    await axios.post(`${base_url}/WCReport/AddWCReport`, {
      reportRefId: ReportRefId,
      presumptiveColiformCount: PresumptiveColiformCount,
      issuedDate: IssuedDate,
      ecoliCount: EcoliCount,
      appearanceOfSample: AppearanceOfSample,
      results: Results,
      remarks: Remarks,
      sampleId: SampleId,
      labId: LabId
    });
    return true;
  } catch (error) {
    console.log(error);
  }
}

export const updateStatus = async (sampleId, Status) => {
  try {
    await axios.put(`${base_url}/WCReport/updateSampleStatus`, {
      sampleId: sampleId,
      status: Status
    });
    return true;
  } catch (error) {
    console.log(error);
  }
};