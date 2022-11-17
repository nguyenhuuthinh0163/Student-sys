interface Student {
  [key: string | number]: string | number;
  t_student_id: number;
  t_student_name: string;
  t_major_name: string;
  t_major_id: number;
  t_faculty_name: string;
  t_faculty_id: number;
  t_student_birthday: string;
  t_student_gender: string;
  t_student_address: string;
  t_student_phone_number: string;
}

export default Student;
