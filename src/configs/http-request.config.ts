'use server';
import axios, { AxiosError } from 'axios';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { authOptions } from 'src/app/api/auth/[...nextauth]/route';
import {
  ErrorResponse,
  TErrorResponseData
} from 'src/types/error-response.type';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

const logRequestDetail = false;

axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getServerSession(authOptions);
    const accessToken = session?.user.mainProfile.accessToken || '';

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    if (logRequestDetail) {
      const METHOD = config.method;
      const REQUEST_HEADERS = config.headers;
      const REQUEST_BODY = config.data;
      const REQUEST_URL = `${config.baseURL}${config.url}`;
      console.log(
        JSON.stringify(
          { REQUEST_URL, METHOD, REQUEST_HEADERS, REQUEST_BODY },
          null,
          2
        )
      );
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<TErrorResponseData>) => {
    if (error.response) {
      const errorStatusCode = error.response.status;
      const errorResponseData = error.response.data;
      const errorMessage = errorResponseData.message || 'Unknown error';
      console.log('Request failed', errorResponseData);
      if (errorStatusCode === 401) {
        redirect('/logout');
      }
      throw new ErrorResponse(errorMessage, errorResponseData);
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };
