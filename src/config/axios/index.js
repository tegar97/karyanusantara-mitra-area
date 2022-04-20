import axios, { AxiosRequestConfig } from "axios";
import { baseUrl } from "../../constant/baseUrl";
axios.defaults.baseURL = `${baseUrl}/api`;

export default async function callApi({
  url,
  method,
  data,
  headers,
}) {
  const response = await axios({
    url,
    method,
    data,
    headers: {
      Authorization: headers,
    },
  }).catch((err) => err.response);

  if (response?.status > 300) {
    const res = {
      error: true,
      message: response?.data?.meta?.message
        ? response?.data?.meta?.message
        : response?.data,
      data: null,
    };
    return res;
  }
  const res = {
    error: false,
    message: "success",
    data: response.data.data,
  };

  return res;
}
