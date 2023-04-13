import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import {
  pageInterface,
  LinkStudentList,
  LinkFacultyList,
  LinkMajorList,
  Profile,
  Logout,
} from '../../Routes';
import { styled } from '@mui/material/styles';

const pages: Array<pageInterface> = [LinkStudentList, LinkFacultyList, LinkMajorList];
const settings: Array<pageInterface> = [Profile, Logout];

const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [activeMenu, setActiveMenu] = useState<string>('');

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickMenu = (name: string) => {
    setActiveMenu(name);
  };

  return (
    <>
      <StyledAppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AssignmentIndIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Student Management
            </Typography>
            <AssignmentIndIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <NavLink
                  to={page.route}
                  key={page.name}
                  style={{
                    textDecoration: 'none',
                    borderBottom: page.name === activeMenu ? '2px inset white' : '',
                    backgroundColor: page.name === activeMenu ? '#AEBDCA' : '',
                  }}
                  onClick={() => handleClickMenu(page.name)}
                >
                  <Button
                    key={page.name}
                    sx={{
                      my: 2,
                      color: 'white',
                      display: 'block',
                    }}
                  >
                    {page.name}
                  </Button>
                </NavLink>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="avatar.png" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </StyledAppBar>
    </>
  );
};

const StyledAppBar = styled(AppBar)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#7895B2',
  },
}));

export default Header;
