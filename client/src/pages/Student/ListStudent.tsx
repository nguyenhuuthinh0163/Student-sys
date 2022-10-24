import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { TableRow, TableCell, tableCellClasses } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface Data {
  [key: string | number]: string | number;
  t_student_id: number;
  t_student_name: string;
  t_major_name: string;
  t_faculty_name: string;
  t_student_birthday: string;
  t_student_gender: string;
  t_student_address: string;
  t_student_phone_number: string;
}

function createData(
  t_student_id: number,
  t_student_name: string,
  t_major_name: string,
  t_faculty_name: string,
  t_student_birthday: string,
  t_student_gender: string,
  t_student_address: string,
  t_student_phone_number: string
): Data {
  return {
    t_student_id,
    t_student_name,
    t_major_name,
    t_faculty_name,
    t_student_birthday,
    t_student_gender,
    t_student_address,
    t_student_phone_number,
  };
}

const rows = [
  createData(1, 'Thinh', 'Software Engineer', 'Information Technology', '06/07/1996', 'Male', '6/1 Pham Van Nghi, Tp Da Nang', '+84335492537'),
  createData(2, 'Thang', 'Software Engineer', 'Information Technology', '06/07/1996', 'Male', '6/1 Pham Van Nghi, Tp Da Nang', '+84335492537'),
  createData(3, 'Hiep', 'Software Engineer', 'Information Technology', '06/07/1996', 'Male', '6/1 Pham Van Nghi, Tp Da Nang', '+84335492537'),
  createData(4, 'Minh', 'Software Engineer', 'Information Technology', '06/07/1996', 'Male', '6/1 Pham Van Nghi, Tp Da Nang', '+84335492537'),
  createData(5, 'Can', 'Software Engineer', 'Information Technology', '06/07/1996', 'Male', '6/1 Pham Van Nghi, Tp Da Nang', '+84335492537'),
  createData(6, 'Trinh', 'Software Engineer', 'Information Technology', '06/07/1996', 'Male', '6/1 Pham Van Nghi, Tp Da Nang', '+84335492537'),
  createData(7, 'Tu', 'Software Engineer', 'Information Technology', '06/07/1996', 'Male', '6/1 Pham Van Nghi, Tp Da Nang', '+84335492537'),
  createData(11, 'Huy', 'Software Engineer', 'Information Technology', '06/07/1996', 'Male', '6/1 Pham Van Nghi, Tp Da Nang', '+84335492537'),
  createData(23, 'Viet', 'Software Engineer', 'Information Technology', '06/07/1996', 'Male', '6/1 Pham Van Nghi, Tp Da Nang', '+84335492537'),
  createData(25, 'Kim', 'Software Engineer', 'Information Technology', '06/07/1996', 'Male', '6/1 Pham Van Nghi, Tp Da Nang', '+84335492537'),
  createData(30, 'Nguyen', 'Software Engineer', 'Information Technology', '06/07/1996', 'Male', '6/1 Pham Van Nghi, Tp Da Nang', '+84335492537')
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

// Define Table header
const headCells: readonly HeadCell[] = [
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

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: keyof Data;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          Nutrition
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

function ListStudent() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('t_studennt_id');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.t_student_name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string | number) => {
    const selectedIndex = selected.indexOf(name.toString());
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name.toString());
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string | number) => selected.indexOf(name.toString()) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.t_student_name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <StyledTableRow
                      hover
                      onClick={(event) => handleClick(event, row.t_student_name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell component="th" align="right" id={labelId} scope="row" padding="none">
                        {row.t_student_id}
                      </TableCell>
                      <TableCell align="left">{row.t_student_name}</TableCell>
                      <TableCell align="left">{row.t_major_name}</TableCell>
                      <TableCell align="left">{row.t_faculty_name}</TableCell>
                      <TableCell align="left">{row.t_student_birthday}</TableCell>
                      <TableCell align="left">{row.t_student_gender}</TableCell>
                      <TableCell align="left">{row.t_student_address}</TableCell>
                      <TableCell align="left">{row.t_student_phone_number}</TableCell>
                    </StyledTableRow>
                  );
                })}
              {emptyRows > 0 && (
                <StyledTableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}

export default ListStudent;
