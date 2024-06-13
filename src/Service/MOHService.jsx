import axios from "axios";
import base_url from "../Util/base_url";
import { toast } from "react-toastify";

export const getNewReports = async (mohId, searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, sortBy, isAscending, token) => {
  try {
    const response = await axios.get(`${base_url}/WCReport/newreports`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
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

export const getContaminationDetails = async (mohId, searchTerm, searchParameter, searchParameterType, pageNumber, pageSize, year, month, token) => {
  try {
    const response = await axios.get(`${base_url}/WCReport/GetContaminationDetails`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        UserId: mohId,
        SearchTerm: searchTerm,
        SearchParameter: searchParameter,
        SearchParameterType: searchParameterType,
        PageNumber: pageNumber,
        PageSize: pageSize,
        Year: year,
        Month: month
      },
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