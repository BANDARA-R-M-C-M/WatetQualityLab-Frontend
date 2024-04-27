import axios from "axios";
import base_url from "../Util/base_url";

export const getNewReports = async (mohId) => {
  try {
    const data = await axios.get(`${base_url}/WCReport/newreports`, {
        // headers: {
        //     Authorization: `Bearer ${token}`
        // },
        params: {
            mohId: mohId
        },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};