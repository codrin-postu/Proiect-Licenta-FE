import axios from "axios";
import { BASE_URL } from "../common/constants";
import { retryRefreshToken } from "../common/functions";

const getLoginToken = async (user) => {
  try {
    const res = await axios.post(`${BASE_URL}/token`, user, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

const logout = async () => {
  try {
    const authToken = localStorage.getItem("access_token");

    const res = await axios.post(
      `${BASE_URL}/admin/logout`,
      { refresh_token: localStorage.getItem("refresh_token") },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      await retryRefreshToken();
      return logout();
    } else {
      throw error;
    }
  }
};

const refreshToken = async (refreshToken) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/token/refresh`,
      { refresh: refreshToken },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export { getLoginToken, refreshToken, logout };
