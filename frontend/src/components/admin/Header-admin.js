import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";

import RegisterForm from "./RegisterForm";
import LoginForm from "../LoginForm";
// eslint-disable-next-line import/order

export default function Header() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const signOut = () => {
    setAnchorElUser(null);
    navigate("/admin");
    localStorage.removeItem("auth_token");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters className="container">
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none"
            }}>
            <Link to="/admin/buildings" style={{ textDecoration: 'none', color : 'white'}} >Admin Land</Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "center"
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" }
              }}>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography>
                  <Link to="/admin/buildings" style={{ textDecoration: 'none', color : 'violet'}}>Buildings</Link>
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography>
                  <Link to="/admin/users" style={{ textDecoration: 'none', color : 'violet'}}>Users</Link>
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography>
                  <Link to="/admin/buildings" style={{ textDecoration: 'none', color : 'violet'}}>Bookings</Link>
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none"
            }}>
            Admin Land
          </Typography>
          <Box
            sx={{
              justifyContent: "flex-end",
              pr: "50px",
              flexGrow: 1,
              display: { xs: "none", md: "flex" }
            }}>
            <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
              <Link to="/admin/buildings" style={{ textDecoration: 'none', color : 'white'}}>Buildings</Link>
            </Button>
            <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
              <Link to="/admin/users" style={{ textDecoration: 'none', color : 'white'}}>Users</Link>
            </Button>
            <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
              <Link to="/admin/workstations" style={{ textDecoration: 'none', color : 'white'}}>Workstations</Link>
            </Button>
            <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
              <RegisterForm />
            </Button>
            <Button sx={{ my: 2, color: "white", display: "block" }}>
              <LoginForm />
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Main Page</Typography>
              </MenuItem>
              <MenuItem onClick={signOut}>
                <Typography textAlign="center">Sign Out</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
