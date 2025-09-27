import axios, { AxiosRequestConfig } from "axios";
import { wait } from "../utils";

class BaseMethods {
  static getHeaders(isFile: boolean = false): Record<string, string> {
    const headers: Record<string, string> = {};
    if (!isFile) {
      headers["Content-Type"] = "application/json";
    }
    return headers;
  }

  static getHeadersAuth(
    isFile: boolean = false,
    inputToken?: string
  ): Record<string, string> {
    const headers = BaseMethods.getHeaders(isFile);
    const token = inputToken || localStorage.getItem("sktoken") || "";
    headers["Authorization"] = `Bearer ${token}`;
    return headers;
  }

  static async postRequest<T, V>(
    url: string,
    body: T,
    required_auth: boolean,
    queryParams?: Record<string, string>,
    inputToken?: string
  ): Promise<V> {
    try {
      const headers = required_auth
        ? BaseMethods.getHeadersAuth(false, inputToken)
        : BaseMethods.getHeaders();

      const config: AxiosRequestConfig = {
        headers,
        params: queryParams,
      };
      console.log("before");
      const { data } = await axios.post<V>(url, body, config);
      console.log("after");
      await wait();
      return data;
    } catch (error) {
      throw BaseMethods.handleError(error);
    }
  }

  static async getRequest<T>(
    url: string,
    required_auth: boolean,
    queryParams?: Record<string, string>,
    inputToken?: string
  ): Promise<T> {
    try {
      const headers = required_auth
        ? BaseMethods.getHeadersAuth(false, inputToken)
        : BaseMethods.getHeaders();

      const config: AxiosRequestConfig = {
        headers,
        params: queryParams,
      };

      const { data } = await axios.get<T>(url, config);

      await wait();
      return data;
    } catch (error) {
      throw BaseMethods.handleError(error);
    }
  }

  static async patchRequest<T>(
    url: string,
    body: any,
    required_auth: boolean,
    queryParams?: Record<string, string>
  ): Promise<T> {
    try {
      const headers = required_auth
        ? BaseMethods.getHeadersAuth()
        : BaseMethods.getHeaders();

      const config: AxiosRequestConfig = {
        headers,
        params: queryParams,
      };

      const { data } = await axios.patch<T>(url, body, config);
      await wait();
      return data;
    } catch (error) {
      throw BaseMethods.handleError(error);
    }
  }

  static async putRequest<T>(
    url: string,
    body: any,
    required_auth: boolean,
    queryParams?: Record<string, string>
  ): Promise<T> {
    try {
      const headers = required_auth
        ? BaseMethods.getHeadersAuth()
        : BaseMethods.getHeaders();

      const config: AxiosRequestConfig = {
        headers,
        params: queryParams,
      };

      const { data } = await axios.put<T>(url, body, config);
      await wait();
      return data;
    } catch (error) {
      throw BaseMethods.handleError(error);
    }
  }

  static async deleteRequest<T>(
    url: string,
    body: any,
    required_auth: boolean
  ): Promise<T> {
    try {
      const headers = required_auth
        ? BaseMethods.getHeadersAuth()
        : BaseMethods.getHeaders();

      const config: AxiosRequestConfig = {
        headers,
        data: body, // important pour DELETE avec body
      };

      const { data } = await axios.delete<T>(url, config);
      await wait();
      return data;
    } catch (error) {
      throw BaseMethods.handleError(error);
    }
  }

  private static handleError(error: unknown): Error {
    if (axios.isAxiosError(error)) {
      const serverMessage = error.response?.data?.message || error.message;
      return new Error(serverMessage);
    }
    return new Error("An unknown error occurred");
  }
}

export default BaseMethods;
