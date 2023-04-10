import axios from 'axios';
import User from '../Interfaces/User';

const authApi = {
  postRegister: (user: User) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            axios
              .post('http://localhost:44444/api/v1/register', {
                name: user.name,
                email: user.email,
                password: user.password,
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
  postLogin: (user: User) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            axios
              .post('http://localhost:44444/api/v1/login', {
                email: user.email,
                password: user.password,
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
  postLogout: () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            axios
              .post('http://localhost:44444/api/v1/logout')
              .then((response) => {
                resolve(response.data);
              })
              .catch((error) => {
                reject(error.response);
              });
          }, 0);
    });
  },
  getProfile: (email: String) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            axios
              .post('http://localhost:44444/api/v1/profile', {
                email: email
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

export default authApi;
