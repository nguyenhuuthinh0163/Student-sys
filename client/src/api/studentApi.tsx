import axios from 'axios';
import Student from '../Interfaces/Student';

const studentApi = {
  getStudents: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios.get('http://127.0.0.1:8000/api/students').then((res) => {
          const result = res.data.map(function (item: Student) {
            return {
              t_student_id: item.t_student_id,
              t_student_name: item.t_student_name,
              t_major_name: item.t_major_name,
              t_faculty_name: item.t_faculty_name,
              t_student_birthday: item.t_student_birthday,
              t_student_gender: item.t_student_gender,
              t_student_address: item.t_student_address,
              t_student_phone_number: item.t_student_phone_number,
            };
          });
          resolve(result);
        });
      }, 0);
    });
  },
};

export default studentApi;
