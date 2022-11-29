import { alpha, styled } from '@mui/material/styles';
import { TableRow, TableCell, Checkbox } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { ListItemProps } from '../../Interfaces/List';
import Student from '../../Interfaces/Student';
import { displayGender } from '../../Utils/ListHelper';

interface ListItemStudentProps extends ListItemProps {
  row: Student;
  hanleClick: (event: React.MouseEvent<unknown>, property: number) => void;
}
function ListItemStudent({ row, isItemSelected, labelId, hanleClick }: ListItemStudentProps) {
  return (
    <StyledTableRow
      hover
      onClick={(event) => hanleClick(event, row.t_student_id)}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      selected={isItemSelected}
    >
      <TableCell padding="checkbox" width={10}>
        <Checkbox
          color="primary"
          checked={isItemSelected}
          inputProps={{
            'aria-labelledby': labelId,
          }}
        />
      </TableCell>
      <TableCell align="left" width={50}>
        <EditIcon sx={{ fontSize: 20, cursor: 'pointer' }} />
      </TableCell>
      <TableCell component="th" align="right" id={labelId} scope="row" padding="none" width={50}>
        {row.t_student_id}
      </TableCell>
      <TableCell align="left" width={200}>
        {row.t_student_name}
      </TableCell>
      <TableCell align="left" width={275}>
        {row.t_major_name}
      </TableCell>
      <TableCell align="left" width={275}>
        {row.t_faculty_name}
      </TableCell>
      <TableCell align="left" width={219}>
        {row.t_student_birthday}
      </TableCell>
      <TableCell align="left" width={100}>
        {displayGender(row.t_student_gender)}
      </TableCell>
      <TableCell align="left" width={300}>
        {row.t_student_address}
      </TableCell>
      <TableCell align="left">{row.t_student_phone_number}</TableCell>
    </StyledTableRow>
  );
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default ListItemStudent;
