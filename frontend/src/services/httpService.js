import Axios from "axios";
const { baseURL } = require("../config");

const API_URL = `${baseURL}/api/`;
const axios = Axios.create({
  withCredentials: true,
});

export default {
  get(endpoint, data) {
    return ajax(endpoint, "GET", data);
  },
  post(endpoint, data) {
    return ajax(endpoint, "POST", data);
  },
  put(endpoint, data) {
    return ajax(endpoint, "PUT", data);
  },
  delete(endpoint, data) {
    return ajax(endpoint, "DELETE", data);
  },
};

async function ajax(endpoint, method = "get", data = null) {
  try {
    const res = await axios({
      url: `${API_URL}${endpoint}`,
      method,
      data,
    });
    return res.data;
  } catch (err) {
    if (!err.response)
      return {
        error: {
          message: "Oops, there is a problem with the server, please try again",
          status: 500,
        },
      };
    return {
      error: {
        message: err.response.data,
        status: err.response.status,
      },
    };
  }
}
