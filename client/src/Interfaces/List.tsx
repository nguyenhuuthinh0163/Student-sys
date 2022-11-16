import { Order } from '../Types/Order';

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string | number) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string | number;
  rowCount: number;
  headCells: HeadCell[];
}

interface HeadCell {
  disablePadding: boolean;
  id: string | number;
  label: string;
  numeric: boolean;
}

interface ListProps {
  listData: Array<any>;
  headCells: HeadCell[];
  ListItems: JSX.Element | JSX.Element[];
  colSpanNoData: number;
  tablePagination: {
    order: Order;
    orderBy: string | number;
    selected: readonly string[];
    page: number;
    rowsPerPage: number;
  };
  onOrder: (property: Order) => void;
  onOrderBy: (property: string | number) => void;
  onSelected: (property: readonly string[]) => void;
  onPage: (property: number) => void;
  onRowsPerPage: (property: number) => void;
  selectedColumn: string;
}

interface ListItemProps {
  isItemSelected: boolean;
  labelId: string;
}

interface ListItemCellProps {
  row: Object | Array<any>;
  id: number;
  labelId: string;
  isItemSelected: boolean;
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

export {
  ListItemProps,
  ListItemCellProps,
  EnhancedTableProps,
  EnhancedTableToolbarProps,
  HeadCell,
  ListProps,
};
