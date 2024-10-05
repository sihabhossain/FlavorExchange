import envConfig from "@/config/envConfig";
import { getNewAccessToken } from "@/services/auth";
import axios from "axios";
import { cookies } from "next/headers";

const axiosInstance = axios.create({
  baseURL: envConfig.baseApi,
});

axiosInstance.interceptors.request.use(
  function (config) {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    // Set accessToken from cookies in the headers if it exists
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const config = error.config;

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;

      try {
        // Get a new access token
        const res = await getNewAccessToken();
        const newAccessToken = res.data.accessToken;

        // Update the authorization header with the new token
        config.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // Set the new access token in cookies
        const cookieStore = cookies();
        cookieStore.set("accessToken", newAccessToken, { path: "/" });

        // Retry the original request with the new token
        return axiosInstance(config);
      } catch (error) {
        return Promise.reject(error);
      }
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
