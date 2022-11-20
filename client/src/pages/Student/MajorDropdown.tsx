import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { getMajors } from '../../redux/majorSlice';
import Major from '../../Interfaces/Major';

interface MajorDropdownProps {
  default_t_faculty_id: number;
  t_major_id: number;
}
function MajorDropdown({ default_t_faculty_id, t_major_id }: MajorDropdownProps) {
  const dispatch = useDispatch();
  const [majors, setMajors] = useState<Array<Major>>([]);
  const [selectMajor, setSelectMajor] = useState<string | number | undefined>(
    t_major_id !== 0 ? t_major_id : ''
  );

  const handleChangeMajor = (event: SelectChangeEvent) => {
    setSelectMajor(event.target.value as string);
  };

  useEffect(
    function () {
      const getDataMajors = async () => {
        const result = await dispatch(getMajors(default_t_faculty_id));
        const listMajor = unwrapResult(result);
        setMajors(listMajor);
      };
      getDataMajors();
    },
    [default_t_faculty_id, selectMajor]
  );

  return (
    <>
      <FormControl variant="standard" fullWidth>
        <InputLabel id="t-major-name-label">Student major</InputLabel>
        <Select
          labelId="t-major-name-label"
          id="t_major_name"
          label="Student major"
          value={selectMajor?.toString()}
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
