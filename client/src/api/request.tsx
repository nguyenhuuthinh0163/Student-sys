import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../redux/authSlice';
import { API_URL, LOG_SUFFIX, REG_SUFFIX } from '../Constant/env';
import { AuthorizedRequest } from '../Interfaces/Request';

const api = {
  request: (suffixUrl: string, method: string, data?: any) => {
    const accessToken = localStorage.getItem('accessToken');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const optionRequest = {
          headers: {
            Accept: 'application/json',
            Authorization: '',
          },
          method: method,
          url: `${API_URL}${suffixUrl}`,
          data: data,
        };
        if (![LOG_SUFFIX, REG_SUFFIX].includes(suffixUrl) && accessToken) {
          optionRequest.headers.Authorization = `Bearer ${accessToken}`;
        }
        axios(optionRequest)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error.response);
          });
      }, 0);
    });
  },
};

export default api;
