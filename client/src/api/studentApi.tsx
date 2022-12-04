import axios from 'axios';
import ListStudentId from '../Interfaces/ListStudentId';
import Student from '../Interfaces/Student';

const studentApi = {
  getStudents: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios
          .get('http://127.0.0.1:8000/api/students')
          .then((res) => {
            const result = res.data.map(function (item: Student) {
              return {
                t_student_id: item.t_student_id,
                t_student_name: item.t_student_name,
                t_major_name: item.t_major_name,
                t_major_id: item.t_major_id,
                t_faculty_name: item.t_faculty_name,
                t_faculty_id: item.t_faculty_id,
                t_student_birthday: item.t_student_birthday,
                t_student_gender: item.t_student_gender,
                t_student_address: item.t_student_address,
                t_student_phone_number: item.t_student_phone_number,
              };
            });
            resolve(result);
          })
          .catch((error) => {
            reject(error);
          });
      }, 0);
    });
  },
  postStudent: (data: Student) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios
          .post('http://127.0.0.1:8000/api/students', {
            t_student_name: data.t_student_name,
            t_major_id: data.t_major_id,
            t_faculty_id: data.t_faculty_id,
            t_student_birthday: data.t_student_birthday,
            t_student_gender: data.t_student_gender,
            t_student_address: data.t_student_address,
            t_student_phone_number: data.t_student_phone_number,
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
  putStudent: (data: Student) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios
          .put('http://127.0.0.1:8000/api/students/' + data.t_student_id, {
            t_student_name: data.t_student_name,
            t_major_id: data.t_major_id,
            t_faculty_id: data.t_faculty_id,
            t_student_birthday: data.t_student_birthday,
            t_student_gender: data.t_student_gender,
            t_student_address: data.t_student_address,
            t_student_phone_number: data.t_student_phone_number,
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
  deleteStudent: (t_studennt_ids: ListStudentId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Array.isArray(t_studennt_ids)) {
          axios
            .delete('http://127.0.0.1:8000/api/students', {
              data: {
                t_studennt_ids: t_studennt_ids,
              },
            })
            .then((response) => {
              resolve(response.data);
            })
            .catch((error) => {
              reject(error.response);
            });
        }
      }, 0);
    });
  },
};

export default studentApi;
