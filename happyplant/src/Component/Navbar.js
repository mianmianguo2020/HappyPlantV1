import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SpaIcon from '@material-ui/icons/Spa';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from "react-router-dom";
import Form from './Form';
import { withRouter } from 'react-router-dom';
import './NavBar.css'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(4),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    fontFamily: "'Pacifico', cursive",
    color: 'darkgreen',
    padding:'5px',
    fontSize:'large'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  barColor: {
    backgroundColor: '#ffffff00',
    color: 'black',
    boxShadow: '5px 10px 18px #888888'
  },
  positions: {
    justifyContent: 'space-evenly',
  },
}));

function Navbar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => { setAnchorEl(event.currentTarget); }; 
  const handleMobileMenuClose = () => { setMobileMoreAnchorEl(null); };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => { setMobileMoreAnchorEl(event.currentTarget); };

  const handleLogout = () => {
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("user")
    handleMenuClose();
    props.logout()
    props.history.push({ pathname: '/' })
  }

  const renderMyPost = () => {
    props.history.push({ pathname: '/mygarden', state: { data: [{ coverImg: '', postStory: 'sample post story', comments: [] }] } })
    handleMenuClose();
  }

  const menuId = 'primary-search-account-menu';

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      style={{top:"40px"}}
    >
      <MenuItem style={{ 'color': 'seagreen' }} onClick={renderMyPost} >My Garden</MenuItem>
      <MenuItem style={{ 'color': 'seagreen' }} onClick={handleLogout}>Log Out</MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Form redirect={props.redirect} setRedirect={props.setRedirect} >
      {!props.isLoggedIn ? <Link style={{ 'textDecoration': 'none', 'color': 'seagreen' }} to="/" >
        <MenuItem >
          <IconButton aria-label="" className={classes.button} >
            <HomeIcon />
          </IconButton>
          <p >HomePage</p>
        </MenuItem>
      </Link> : '' }
      <Link style={{ 'textDecoration': 'none', 'color': 'seagreen' }} to="/feeds" >
        <MenuItem >
          <IconButton aria-label="">
            <SpaIcon />
          </IconButton>
          <p >My Garden</p>
        </MenuItem>
      </Link>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
        >
          <AccountCircle style={{ 'textDecoration': 'none', 'color': 'seagreen' }} />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      </Form>
    </Menu>
  );
  return (
    <div className={classes.grow}>
      <div>
        <AppBar position="static" className={classes.barColor}>
          <Toolbar>
            <Typography className={classes.title}  noWrap >
            HappyPlant
          </Typography>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop + ' ' + classes.positions}>
              <Form redirect={props.redirect} setRedirect={props.setRedirect} />
              {!props.isLoggedIn ? (<Link to="/" >
                <IconButton color="inherit" style={{ 'textDecoration': 'none', 'color': 'seagreen' }}>
                  <HomeIcon />
                </IconButton>
              </Link> ) : ''}
              {!props.isLoggedIn ? '': <Link style={{ 'textDecoration': 'none', 'color': 'seagreen' }} to="/feeds" >
                <IconButton  color="inherit">
                  <SpaIcon />
                </IconButton>
              </Link>}
              {!props.isLoggedIn ? '':  <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                style={{ 'textDecoration': 'none', 'color': 'seagreen' }}
              >
                <AccountCircle />
              </IconButton>}

             
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                style={{ 'textDecoration': 'none', 'color': 'seagreen' }}
              >
                <MoreIcon />
              </IconButton>
            </div>
        {renderMobileMenu}
        {renderMenu}

          </Toolbar>
        </AppBar>


      </div>
    </div>
  );
}

export default withRouter(Navbar);
