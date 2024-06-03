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
      headers: {
        Authorization: `Bearer ${token}`
      },
      email: email,
      username: username,
      password: password,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

