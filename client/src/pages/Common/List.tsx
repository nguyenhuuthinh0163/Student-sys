import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';

import { ListProps } from '../../Interfaces/List';
import EnhancedTableHead from './EnhancedTableHead';
const { useRef, useImperativeHandle } = React;

const List = React.forwardRef(
  (
    {
      listData,
      headCells,
      ListItems,
      tablePagination,
      onOrder,
      onOrderBy,
      onSelected,
      onPage,
      onRowsPerPage,
      selectedColumn,
    }: ListProps,
    ref
  ) => {
    const { order, orderBy, selected, page, rowsPerPage } = tablePagination;
    const handleRequestSort = (event: React.MouseEvent<unknown>, property: number | string) => {
      const isAsc = orderBy === property && order === 'asc';
      onOrder(isAsc ? 'desc' : 'asc');
      onOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        const newSelected = listData.map((n) => n[selectedColumn]);
        onSelected(newSelected);
        return;
      }
      onSelected([]);
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

      onSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
      onPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      onRowsPerPage(parseInt(event.target.value, 10));
      onPage(0);
    };

    const isSelected = (name: string | number) => selected.indexOf(name.toString()) !== -1;

    // Avoid a layout jump when reaching the last page with empty listData.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listData.length) : 0;

    useImperativeHandle(ref, () => ({
      handleClick,
      isSelected,
    }));

    return (
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          {/* <EnhancedTableToolbar title={title} numSelected={selected.length} /> */}
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={listData.length}
                headCells={headCells}
              />
              <TableBody>{ListItems}</TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={listData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    );
  }
);

export default List;
