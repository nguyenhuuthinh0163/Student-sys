import * as React from 'react';
import { useEffect } from 'react';
import { alpha, styled } from '@mui/material/styles';
import { TableRow, TableCell, Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

import Student from '../../Interfaces/Student';
import { getStudents } from '../../redux/studentSlice';
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
    disablePadding: true,
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
    numeric: true,
    disablePadding: false,
    label: 'Phone',
  },
];

function ListStudent() {
  const dispatch = useDispatch();
  const myRef = React.useRef<any>();

  // Pagination
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Student>('t_studennt_id');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const tablePagination = { order, orderBy, selected, page, rowsPerPage };
  const [listData, setListData] = React.useState<Array<Student>>([]);
  const [openEditMoal, setOpenEditMoal] = React.useState(false);
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listData.length) : 0;

  const handleClickEvent = (event: React.MouseEvent<unknown>, name: string | number) => {
    myRef.current?.handleClick(event, name);
  };

  useEffect(
    function () {
      const getDataStudents = async () => {
        const result = await dispatch(getStudents());
        const students = unwrapResult(result);
        setListData(students);
      };
      getDataStudents();
    },
    [order, orderBy, selected, page, rowsPerPage]
  );
  return (
    <>
      <Box
        sx={{
          ml: '15px',
          display: 'inline-flex',
          flexDirection: 'column',
          paddingBottom: '50px',
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
        {selected.length > 0 ? <EnhancedTableToolbar numSelected={selected.length} /> : ''}
        <EditStudentModal openEditMoal={openEditMoal} setOpenEditMoal={setOpenEditMoal} />
      </Box>
      <List
        ref={myRef}
        headCells={headCells}
        colSpanNoData={9}
        listData={listData}
        tablePagination={tablePagination}
        onOrder={setOrder}
        onOrderBy={setOrderBy}
        onSelected={setSelected}
        onPage={setPage}
        onRowsPerPage={setRowsPerPage}
        selectedColumn={'t_student_name'}
        ListItems={
          emptyRows > 0 ? (
            <StyledTableRow
              style={{
                height: 33 * emptyRows,
              }}
            >
              <TableCell colSpan={9} />
            </StyledTableRow>
          ) : (
            stableSort(listData, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = myRef.current?.isSelected(row.t_student_name);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <ListItemStudent
                    hanleClick={(event) => handleClickEvent(event, row.t_student_name)}
                    row={row}
                    isItemSelected={isItemSelected}
                    key={index}
                    labelId={labelId}
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
