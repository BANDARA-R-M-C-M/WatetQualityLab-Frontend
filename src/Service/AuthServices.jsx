import axios from "axios";
import base_url from "../Util/base_url";
import { toast } from "react-toastify";

export const loginAPI = async (username, password, token) => {
  try {
    const data = await axios.post(`${base_url}/User/login`, {
      username: username,
      password: password,
    });
    return data;
  } catch (error) {
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
  }
};

export const registerAPI = async (email, username, password, token) => {
  try {
    const data = await axios.post(`${base_url}/User/signup`, {
      email: email,
      username: username,
      password: password,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    toast.success('User registered successfully.');

    return data;
  } catch (error) {
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
  }
};

export const getUserDetails = async (token) => {
  try {
    const data = await axios.get(`${base_url}/User/getUserDetails`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUserDetails = async (userId, username, email, phoneNumber, imageUrl, token) => {
  try {
    await axios.put(`${base_url}/User/updateUser/${userId}`, {
      username: username,
      email: email,
      phoneNumber: phoneNumber,
      imageUrl: imageUrl
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    toast.success('User details updated successfully.');

    return true;
  } catch (error) {
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
  }
}