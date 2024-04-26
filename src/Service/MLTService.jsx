import axios from "axios";
import base_url from "../Util/base_url";

export const sampleAPI = async (userId) => {
  try {
    const data = await axios.get(`${base_url}/WCReport/newsamples`, {
        // headers: {
        //     Authorization: `Bearer ${token}`
        // },
        params: {
            userId: userId
        },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

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