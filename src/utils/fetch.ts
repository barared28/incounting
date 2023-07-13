import axios from "axios";
import Cookies from "js-cookie";
import { clearAllAuthCookie } from "./cookies";

// TODO: handle notfif error

interface IPropsFetch {
  method: "get" | "post" | "put" | "delete";
  path: string;
  payload?: any;
  params?: any;
  contentType?: string;
  baseUrl?: string;
  onUploadProgress?: () => {};
  onDownloadProgress?: () => {};
  tokenRequired?: boolean;
}

const BASE_URL = import.meta.env.VITE_API_URL;

const fetch = async (props: IPropsFetch) => {
  const {
    method,
    path,
    payload = {},
    params = {},
    contentType = "application/json",
    baseUrl = BASE_URL,
    onUploadProgress = () => {},
    onDownloadProgress = () => {},
    tokenRequired = true,
  } = props;
  const token = Cookies.get("token");
  const url = `${baseUrl}/${path}`;
  try {
    const headers: any = {
      "Content-Type": contentType || "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    } else if (tokenRequired) {
      // throw new Error("token required");
    }

    const config = {
      url,
      method,
      params,
      headers,
      onUploadProgress,
      onDownloadProgress,
      data: payload,
    };

    const response = await axios(config);
    return response.data;
  } catch (error: any) {
    if (error.response.status === 401) {
      clearAllAuthCookie();
      location.reload();
    }
    throw error;
  } finally {
  }
};

export default fetch;
