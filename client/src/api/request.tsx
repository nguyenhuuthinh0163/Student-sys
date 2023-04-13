/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import { useSelector } from 'react-redux';
import { API_URL } from '../../constant';
import { selectAccessToken } from '../redux/authSlice';

const api = {
  request: (suffixUrl: string, method: string, data?: any) => {
    const accessToken = useSelector(selectAccessToken);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios({
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          method: method,
          url: `${API_URL}${suffixUrl}`,
          data: data,
        })
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
