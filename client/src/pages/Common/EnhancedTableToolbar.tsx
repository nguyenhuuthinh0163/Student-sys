import { Toolbar, alpha, Typography, Tooltip, IconButton, Box } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import DeleteIcon from '@mui/icons-material/Delete';
import { EnhancedTableToolbarProps } from '../../Interfaces/List';

const EnhancedTableToolbar = ({ numSelected }: EnhancedTableToolbarProps) => {
  return (
    <Box sx={{ borderColor: 'grey.500', borderRadius: '16px' }}>
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
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} Selected
        </Typography>
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
    </Box>
  );
};

export default EnhancedTableToolbar;
