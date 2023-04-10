import * as React from 'react';
import { useEffect } from 'react';
import { alpha, styled } from '@mui/material/styles';
import { TableRow, TableCell, Box, Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import Student from '../../Interfaces/Student';
import {
  deleteStudent,
  getStudents,
  selectAllStudents,
  setEditStudent,
} from '../../redux/studentSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import ListItemStudent from './ListItemStudent';
import { HeadCell } from '../../Interfaces/List';
import List from '../Common/List';
import { Order } from '../../Types/Order';
import { stableSort, getComparator } from '../../Utils/ListHelper';
import EditStudentModal from './EditStudentModal';
import EnhancedTableToolbar from '../Common/EnhancedTableToolbar';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

// Define Table header
const headCells: HeadCell[] = [
  {
    id: 't_student_id',
    numeric: true,
    disablePadding: false,
    label: 'ID',
  },
  {
    id: 't_student_name',
    numeric: false,
    disablePadding: false,
    label: 'Student name',
  },
  {
    id: 't_major_name',
    numeric: false,
    disablePadding: false,
    label: 'Major',
  },
  {
    id: 't_faculty_name',
    numeric: false,
    disablePadding: false,
    label: 'Faculty',
  },
  {
    id: 't_student_birthday',
    numeric: false,
    disablePadding: false,
    label: 'Date of birth',
  },
  {
    id: 't_student_gender',
    numeric: false,
    disablePadding: false,
    label: 'Gender',
  },
  {
    id: 't_student_address',
    numeric: false,
    disablePadding: false,
    label: 'Address',
  },
  {
    id: 't_student_phone_number',
    numeric: false,
    disablePadding: false,
    label: 'Phone',
  },
];

function ListStudent() {
  const dispatch = useDispatch();
  const myRef = React.useRef<any>();

  // Pagination
  const [order, setOrder] = React.useState<Order>('desc');
  const [orderBy, setOrderBy] = React.useState<keyof Student>('t_studennt_id');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const tablePagination = { order, orderBy, selected, page, rowsPerPage };
  const listStudent = useSelector(selectAllStudents);

  const [openEditModal, setOpenEditModal] = React.useState(false);
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listStudent.length) : 0;
  const loadingListView = useSelector((state: any) => state.students.loading);

  const handleClickEvent = (event: React.MouseEvent<unknown>, name: string | number) => {
    myRef.current?.handleClick(event, name);
  };

  const handleClickAdd = () => {
    dispatch(setEditStudent({}));
    setOpenEditModal(true);
  };

  const handleDeleteStudent = async () => {
    dispatch(deleteStudent(selected));
    setSelected([]);
  };

  useEffect(() => {
    if (loadingListView === false) {
      dispatch(getStudents());
    }
  }, [dispatch, selected, deleteStudent]);
  return (
    <>
      <Box
        sx={{
          ml: '15px',
          display: 'inline-flex',
          flexDirection: 'column',
          paddingTop: '20px',
          rowGap: '10px',
        }}
      >
        <Typography
          sx={{
            flex: '1 1 100%',
            fontSize: '30px',
            fontFamily: 'inherit',
            fontWeight: 500,
            color: 'inherit',
            lineHeight: 1.1,
          }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Student list
        </Typography>
        <Button variant="outlined" onClick={handleClickAdd}>
          Create new Student
        </Button>
        {selected.length > 0 ? (
          <EnhancedTableToolbar deleteItem={handleDeleteStudent} numSelected={selected.length} />
        ) : (
          ''
        )}
        {
          openEditModal &&
          <EditStudentModal
            openEditModal={openEditModal}
            setOpenEditModal={setOpenEditModal}
          />
        }
      </Box>
      <List
        ref={myRef}
        headCells={headCells}
        colSpanNoData={10}
        listData={listStudent}
        tablePagination={tablePagination}
        onOrder={setOrder}
        onOrderBy={setOrderBy}
        onSelected={setSelected}
        onPage={setPage}
        onRowsPerPage={setRowsPerPage}
        selectedColumn={'t_student_id'}
        ListItems={
          emptyRows > 0 ? (
            <StyledTableRow
              style={{
                height: 33 * emptyRows,
              }}
            >
              <TableCell colSpan={10} />
            </StyledTableRow>
          ) : (
            stableSort(listStudent, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = myRef.current?.isSelected(row.t_student_id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <ListItemStudent
                    hanleClick={(event) => handleClickEvent(event, row.t_student_id)}
                    row={row}
                    isItemSelected={isItemSelected}
                    key={index}
                    labelId={labelId}
                    setOpenEditModal={setOpenEditModal}
                  />
                );
              })
          )
        }
      />
    </>
  );
}

export default ListStudent;
