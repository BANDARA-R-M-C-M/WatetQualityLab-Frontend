import axios from "axios";
import base_url from "../Util/base_url";

export const getNewReports = async (mohId) => {
  try {
    const response = await axios.get(`${base_url}/WCReport/newreports`, {
        // headers: {
        //     Authorization: `Bearer ${token}`
        // },
        params: {
            mohId: mohId
        },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};