import axios from "axios";
import base_url from "../Util/base_url";

export const getNewReports = async (mohId, searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, sortBy, isAscending) => {
  try {
    const response = await axios.get(`${base_url}/WCReport/newreports`, {
        // headers: {
        //     Authorization: `Bearer ${token}`
        // },
        params: {
          UserId: mohId,
          SearchTerm: searchTerm,
          SearchParameter: searchParameter,
          SearchParameterType: searchParameterType,
          PageNumber: pageNumber,
          PageSize: pageSize,
          SortBy: sortBy,
          IsAscending: isAscending
        },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};