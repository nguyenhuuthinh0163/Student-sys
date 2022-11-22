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
import { useState } from 'react';
import Faculty from '../../Interfaces/Faculty';
import Student from '../../Interfaces/Student';
import { getFaculties } from '../../redux/facultySlice';
import { getMajors } from '../../redux/majorSlice';
import { getStudents } from '../../redux/studentSlice';

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
  // const {
  //   t_student_id,
  //   t_student_name,
  //   t_major_name,
  //   t_major_id,
  //   t_faculty_name,
  //   t_faculty_id,
  //   t_student_birthday,
  //   t_student_gender,
  //   t_student_address,
  //   t_student_phone_number,
  // }: Student = student;
  const [selectFaculty, setSelectFaculty] = useState<number>(t_faculty_id);

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

  const handleChangeFaculty = (event: SelectChangeEvent) => {
    let facultySelected = event.target.value;
    setFaculty(facultySelected);
    dispatch(getMajors(facultySelected));
  };

  const handleSubmit = async () => {
    // Add new
    if (!isEdit) {
      const resultAddNew = await dispatch({ title, content, user: userId });
      unwrapResult(resultAddNew);
      setTitle('');
      setContent('');
      setUserId('');
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
            <InputLabel id="t-student-gender-label">Student major</InputLabel>
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
