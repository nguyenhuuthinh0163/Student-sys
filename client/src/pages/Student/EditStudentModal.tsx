import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Faculty from '../../Interfaces/Faculty';
import Student from '../../Interfaces/Student';
import { getFaculties } from '../../redux/facultySlice';

interface EditStudentModalProps {
  openEditMoal: boolean;
  setOpenEditMoal: (property: boolean) => void;
  isEdit: boolean;
  student?: Student;
  faculties?: Faculty[];
}

function EditStudentModal({
  openEditMoal,
  setOpenEditMoal,
  isEdit,
  student,
  faculties,
}: EditStudentModalProps) {
  const dispatch = useDispatch();
  // const [statusDialog, setStatusDialog] = useState<boolean>(false);
  // const [faculties, setFaculties] = useState<Array<Faculty>>([]);
  // const [studentForm, setStudentForm] = useState<Partial<Student>>({});
  console.log(faculties);

  // t_student_name, t_major_name, t_faculty_name, t_student_birthday, t_student_gender, t_student_address, t_student_phone_number
  const handleClose = () => {
    setOpenEditMoal(false);
  };

  const handleSubmit = () => {
    setOpenEditMoal(false);
  };

  useEffect(
    function () {
      // const getDataFaculties = async () => {
      //   const result = await dispatch(getFaculties());
      //   const listFaculty = unwrapResult(result);
      //   setFaculties(listFaculty);
      // };
      // getDataFaculties();
    },
    [faculties]
  );

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
          />
          <FormControl variant="standard" fullWidth>
            <InputLabel id="t-major-name-label">Student major</InputLabel>
            <Select labelId="t-major-name-label" id="t_major_name" label="Student major">
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
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
          />
          <TextField
            autoFocus
            margin="dense"
            id="t_student_gender"
            label="Gender"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="t_student_address"
            label="Student address"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="t_student_phone_number"
            label="Phone number"
            type="text"
            fullWidth
            variant="standard"
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
