import axios from 'axios';
import Major from '../Interfaces/Major';

const majorApi = {
  getMajors: (t_faculty_id: number) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios
          .get('http://127.0.0.1:8000/api/majors', {
            params: {
              t_faculty_id: t_faculty_id,
            },
          })
          .then((res) => {
            const result = res.data.map(function (item: Major) {
              return {
                t_major_id: item.t_major_id,
                t_faculty_id: t_faculty_id,
                t_major_name: item.t_major_name,
              };
            });
            resolve(result);
          });
      }, 0);
    });
  },
};

export default majorApi;
