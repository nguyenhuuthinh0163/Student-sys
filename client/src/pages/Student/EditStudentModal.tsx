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
  SelectChangeEvent,
} from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Faculty from '../../Interfaces/Faculty';
import Student from '../../Interfaces/Student';
import { getFaculties, selectAllFaculties } from '../../redux/facultySlice';
import { getMajors, selectAllMajors } from '../../redux/majorSlice';
import { postStudent } from '../../redux/studentSlice';

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
  const dispatch = useDispatch();
  const [studentName, setStudentName] = useState<string>('');
  const [faculty, setFaculty] = useState<string>('');
  const [major, setMajor] = useState<string>('');
  const [birthDay, setBirthDay] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const listFaculty = useSelector(selectAllFaculties);
  const listMajor = useSelector(selectAllMajors);
  const listFacultyLoading = useSelector(
    (state: { faculties: { loading: boolean } }) => state.faculties.loading
  );
  const handleClose = () => {
    setOpenEditMoal(false);
  };

  const resetForm = () => {
    setStudentName('');
    setFaculty('');
    setMajor('');
    setBirthDay('');
    setGender('');
    setAddress('');
    setPhone('');
  };

  const handleChangeFaculty = (event: SelectChangeEvent) => {
    let facultySelected = event.target.value;
    setFaculty(facultySelected);
    dispatch(getMajors(facultySelected));
  };

  const handleSubmit = async () => {
    // Add new
    if (!isEdit) {
      const resultAddNew = await dispatch(
        postStudent({
          t_student_name: studentName,
          t_major_id: major,
          t_faculty_id: faculty,
          t_student_birthday: birthDay,
          t_student_gender: gender,
          t_student_address: address,
          t_student_phone_number: '+84' + phone,
        })
      );
      unwrapResult(resultAddNew);
      console.log(resultAddNew);

      resetForm();
    } else {
      // Edit
    }
  };

  useEffect(() => {
    if (listFacultyLoading === false) {
      dispatch(getFaculties());
    }
  }, [dispatch]);

  return (
    <>
      <Dialog open={openEditMoal} onClose={handleClose}>
        <DialogTitle>{!isEdit ? 'Create new student' : 'Edit student'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="t_student_name"
            label="Student name"
            type="text"
            fullWidth
            variant="standard"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value as string)}
          />
          <FormControl variant="standard" fullWidth>
            <InputLabel id="t-faculty-name-label">Student Faculty</InputLabel>
            <Select
              labelId="t-faculty-name-label"
              id="t_faculty_name"
              label="Student faculty"
              value={faculty}
              onChange={handleChangeFaculty}
            >
              {listFaculty.map((row, key) => (
                <MenuItem key={key} value={row.t_faculty_id}>
                  {row.t_faculty_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="standard" fullWidth>
            <InputLabel id="t-major-name-label">Student major</InputLabel>
            <Select
              labelId="t-major-name-label"
              id="t_major_name"
              label="Student major"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
            >
              {listMajor.map((row, key) => (
                <MenuItem key={key} value={row.t_major_id}>
                  {row.t_major_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            id="t_student_birthday"
            label="Birthday"
            type="date"
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            value={birthDay}
            onChange={(e) => setBirthDay(e.target.value)}
          />
          <FormControl variant="standard" fullWidth>
            <InputLabel id="t-student-gender-label">Gender</InputLabel>
            <Select
              labelId="t-student-gender-label"
              id="t_student_gender"
              label="Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <MenuItem value={1}>Nam</MenuItem>
              <MenuItem value={0}>Nữ</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            id="t_student_address"
            label="Student address"
            type="text"
            fullWidth
            variant="standard"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            margin="dense"
            id="t_student_phone_number"
            label="Phone number"
            type="text"
            fullWidth
            variant="standard"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
