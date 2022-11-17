import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { getMajors } from '../../redux/majorSlice';
import Major from '../../Interfaces/Major';

interface MajorDropdownProps {
  t_faculty_id: number;
}
function MajorDropdown({ t_faculty_id }: MajorDropdownProps) {
  const dispatch = useDispatch();
  const [majors, setMajors] = useState<Array<Major>>([]);
  const [selectMajor, setSelectMajor] = useState<string | undefined>('');

  const handleChangeMajor = (event: SelectChangeEvent) => {
    setSelectMajor(event.target.value);
  };

  useEffect(function () {
    const getDataMajors = async () => {
      const result = await dispatch(getMajors(t_faculty_id));
      const listMajor = unwrapResult(result);
      setMajors(listMajor);
    };
    getDataMajors();
  }, []);

  return (
    <>
      <FormControl variant="standard" fullWidth>
        <InputLabel id="t-major-name-label">Student major</InputLabel>
        <Select
          labelId="t-major-name-label"
          id="t_major_name"
          label="Student major"
          value={selectMajor}
          onChange={handleChangeMajor}
        >
          {majors.map((row, key) => (
            <MenuItem key={key} value={row.t_major_id}>
              {row.t_major_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

export default MajorDropdown;
