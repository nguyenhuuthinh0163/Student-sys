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
  FormHelperText,
  Alert,
} from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Faculty from '../../Interfaces/Faculty';
import { getFaculties, selectAllFaculties } from '../../redux/facultySlice';
import { getMajors, selectAllMajors } from '../../redux/majorSlice';
import { getStudents, postStudent, putStudent, selectEditStudent } from '../../redux/studentSlice';
import ErrorText from '../Common/ErrorText';

interface EditStudentModalProps {
  openEditModal: boolean;
  setOpenEditModal: (property: boolean) => void;
  // setListStudent: (property: Student[]) => void;
  faculties?: Faculty[];
}

interface errorMessageType {
  t_student_name: string[];
  t_major_id: string[];
  t_faculty_id: string[];
  t_student_birthday: string[];
  t_student_gender: string[];
  t_student_address: string[];
  t_student_phone_number: string[];
}

function EditStudentModal({ openEditModal, setOpenEditModal }: EditStudentModalProps) {
  const dispatch = useDispatch();
  const editStudent = useSelector(selectEditStudent);
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
  const [errorMessage, setErrorMessage] = useState<errorMessageType | null>(null);
  const isEdit = Object.keys(editStudent).length !== 0;

  const handleClose = () => {
    resetCloseForm();
  };

  const resetCloseForm = () => {
    setStudentName('');
    setFaculty('');
    setMajor('');
    setBirthDay('');
    setGender('');
    setAddress('');
    setPhone('');
    setOpenEditModal(false);
    setErrorMessage(null);
    dispatch(getStudents());
  };

  const handleChangeFaculty = (event: SelectChangeEvent) => {
    let facultySelected = event.target.value;
    setFaculty(facultySelected);
    dispatch(getMajors(facultySelected));
  };

  const handleSubmit = async () => {
    setErrorMessage(null);
    // Add new
    if (!isEdit) {
      dispatch(
        postStudent({
          t_student_name: studentName,
          t_major_id: major,
          t_faculty_id: faculty,
          t_student_birthday: birthDay,
          t_student_gender: gender,
          t_student_address: address,
          t_student_phone_number: phone,
        })
      )
        .unwrap()
        .then((payload: any) => {
          resetCloseForm();
        })
        .catch((error: any) => {
          setErrorMessage(error.error_message);
        });
    } else {
      dispatch(
        putStudent({
          t_student_id: editStudent.t_student_id,
          t_student_name: studentName,
          t_major_id: major,
          t_faculty_id: faculty,
          t_student_birthday: birthDay,
          t_student_gender: gender,
          t_student_address: address,
          t_student_phone_number: phone,
        })
      )
        .unwrap()
        .then((payload: any) => {
          resetCloseForm();
        })
        .catch((error: any) => {
          setErrorMessage(error.error_message);
        });
    }
  };

  useEffect(() => {
    if (listFacultyLoading === false) {
      dispatch(getFaculties());
    }
    if (Object.keys(editStudent).length !== 0) {
      setStudentName(editStudent.t_student_name);
      setFaculty(editStudent.t_faculty_id.toString());
      dispatch(getMajors(major));
      setMajor(editStudent.t_major_id.toString());
      setBirthDay(editStudent.t_student_birthday);
      setGender(editStudent.t_student_gender);
      setAddress(editStudent.t_student_address);
      setPhone(editStudent.t_student_phone_number);
    }
  }, [dispatch, editStudent]);

  return (
    <>
      <Dialog open={openEditModal} onClose={handleClose}>
        <DialogTitle>{!isEdit ? 'Create new student' : 'Edit student'}</DialogTitle>
        <DialogContent>
          <TextField
            error={errorMessage?.t_student_name !== undefined}
            helperText={<ErrorText textContent={errorMessage?.t_student_name[0]} />}
            margin="dense"
            id="t_student_name"
            label="Student name"
            type="text"
            fullWidth
            variant="standard"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value as string)}
          />
          <FormControl
            variant="standard"
            fullWidth
            error={errorMessage?.t_faculty_id !== undefined}
          >
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
            <FormHelperText>
              <ErrorText textContent={errorMessage?.t_faculty_id[0]} />
            </FormHelperText>
          </FormControl>
          <FormControl variant="standard" fullWidth error={errorMessage?.t_major_id !== undefined}>
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
            <FormHelperText>
              <ErrorText textContent={errorMessage?.t_major_id[0]} />
            </FormHelperText>
          </FormControl>
          <TextField
            error={errorMessage?.t_student_birthday !== undefined}
            helperText={<ErrorText textContent={errorMessage?.t_student_birthday[0]} />}
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
          <FormControl
            variant="standard"
            fullWidth
            error={errorMessage?.t_student_gender !== undefined}
          >
            <InputLabel id="t-student-gender-label">Gender</InputLabel>
            <Select
              labelId="t-student-gender-label"
              id="t_student_gender"
              label="Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <MenuItem value={1}>Male</MenuItem>
              <MenuItem value={0}>Female</MenuItem>
            </Select>
            <FormHelperText>
              <ErrorText textContent={errorMessage?.t_student_gender[0]} />
            </FormHelperText>
          </FormControl>
          <TextField
            error={errorMessage?.t_student_address !== undefined}
            helperText={<ErrorText textContent={errorMessage?.t_student_address[0]} />}
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
            error={errorMessage?.t_student_phone_number !== undefined}
            helperText={<ErrorText textContent={errorMessage?.t_student_phone_number[0]} />}
            margin="dense"
            id="t_student_phone_number"
            label="Phone number"
            type="text"
            fullWidth
            variant="standard"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errorMessage ? (
            <Alert severity="error">There are some errors, please check it !</Alert>
          ) : (
            ' '
          )}
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
