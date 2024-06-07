import axios from "axios";
import base_url from "../Util/base_url";

export const loginAPI = async (username, password, token) => {
  try {
    const data = await axios.post(`${base_url}/User/login`, {
      username: username,
      password: password,
    });
    return data;
  } catch (error) {
    console.log(error);
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
    return data;
  } catch (error) {
    console.log(error);
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
  try{
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
    return true;

  } catch (error) {
    console.log(error);
  }
}