import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from '@mui/material';
import { useState } from 'react';
import Faculty from '../../Interfaces/Faculty';
import Student from '../../Interfaces/Student';
import FacultyDropdown from './FacultyDropdown';
import MajorDropdown from './MajorDropdown';

interface EditStudentModalProps {
  openEditMoal: boolean;
  setOpenEditMoal: (property: boolean) => void;
  isEdit: boolean;
  student: Student;
  faculties?: Faculty[];
}

function EditStudentModal({
  openEditMoal,
  setOpenEditMoal,
  isEdit,
  student,
}: EditStudentModalProps) {
  const {
    // t_student_id,
    t_student_name,
    // t_major_name,
    t_major_id,
    // t_faculty_name,
    t_faculty_id,
    t_student_birthday,
    t_student_gender,
    t_student_address,
    t_student_phone_number,
  }: Student = student;
  const [selectFaculty, setSelectFaculty] = useState<number>(t_faculty_id);

  const handleClose = () => {
    setOpenEditMoal(false);
  };

  const handleSubmit = () => {
    setOpenEditMoal(false);
  };

  const handleChangeFacultyValue = (value: string) => {
    setSelectFaculty(parseInt(value));
  };

  return (
    <>
      <Dialog open={openEditMoal} onClose={handleClose}>
        <DialogTitle>{!isEdit ? 'Create new student' : 'Edit student'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="t_student_name"
            label="Student name"
            type="text"
            fullWidth
            variant="standard"
            value={t_student_name}
          />
          <FacultyDropdown onChangeFaculty={handleChangeFacultyValue} t_faculty_id={t_faculty_id} />
          <MajorDropdown default_t_faculty_id={selectFaculty} t_major_id={t_major_id} />
          <TextField
            autoFocus
            margin="dense"
            id="t_faculty_name"
            label="Faculty"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="t_student_birthday"
            label="Birthday"
            type="text"
            fullWidth
            variant="standard"
            value={t_student_birthday}
          />
          <TextField
            autoFocus
            margin="dense"
            id="t_student_gender"
            label="Gender"
            type="text"
            fullWidth
            variant="standard"
            value={t_student_gender}
          />
          <TextField
            autoFocus
            margin="dense"
            id="t_student_address"
            label="Student address"
            type="text"
            fullWidth
            variant="standard"
            value={t_student_address}
          />
          <TextField
            autoFocus
            margin="dense"
            id="t_student_phone_number"
            label="Phone number"
            type="text"
            fullWidth
            variant="standard"
            value={t_student_phone_number}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>{!isEdit ? 'Create' : 'Update'}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditStudentModal;
