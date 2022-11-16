import axios from 'axios';
import Faculty from '../Interfaces/Faculty';

const facultyApi = {
  getFaculties: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios.get('http://127.0.0.1:8000/api/faculties').then((res) => {
          const result = res.data.map(function (item: Faculty) {
            return {
              t_faculty_id: item.t_faculty_id,
              t_faculty_name: item.t_faculty_name,
            };
          });
          resolve(result);
        });
      }, 0);
    });
  },
};

export default facultyApi;
