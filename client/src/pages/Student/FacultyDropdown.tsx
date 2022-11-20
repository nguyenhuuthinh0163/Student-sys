import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Faculty from '../../Interfaces/Faculty';
import { getFaculties } from '../../redux/facultySlice';
import { unwrapResult } from '@reduxjs/toolkit';

interface FacultyDropdownProps {
  t_faculty_id: number;
  onChangeFaculty: (property: string) => void;
}
function FacultyDropdown({ t_faculty_id, onChangeFaculty }: FacultyDropdownProps) {
  const dispatch = useDispatch();
  const [faculties, setFaculties] = useState<Array<Faculty>>([]);
  const [selectedFaculty, setSelectedFaculty] = useState<string | number | undefined>(
    t_faculty_id !== 0 ? t_faculty_id : ''
  );

  const handleChangeFaculty = (event: SelectChangeEvent) => {
    let value = event.target.value as string;
    setSelectedFaculty(value);
    onChangeFaculty(value);
  };

  useEffect(function () {
    const getDataFaculties = async () => {
      const result = await dispatch(getFaculties());
      const listFaculty = unwrapResult(result);
      setFaculties(listFaculty);
    };
    getDataFaculties();
  }, []);

  return (
    <>
      <FormControl variant="standard" fullWidth>
        <InputLabel id="t-faculty-name-label">Student Faculty</InputLabel>
        <Select
          labelId="t-faculty-name-label"
          id="t_faculty_name"
          label="Student faculty"
          value={selectedFaculty?.toString()}
          onChange={handleChangeFaculty}
        >
          {faculties.map((row, key) => (
            <MenuItem key={key} value={row.t_faculty_id}>
              {row.t_faculty_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

export default FacultyDropdown;
