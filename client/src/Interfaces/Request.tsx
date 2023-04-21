import { Axios, AxiosRequestConfig } from 'axios';

export type AuthorizedRequest = AxiosRequestConfig & { Authorization: string };
