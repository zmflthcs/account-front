import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import {connect} from 'react-redux';
import Cookies from 'js-cookie';
import { setUserInfo } from '../modules/user';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  logo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem'
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  userImage: {
    marginRight: '1rem'
  },
  userNickname: {
    fontSize: '1.2rem',
  },
  logoutButton: {
    padding: '6px 10px 6px 11px',
    backgroundColor: '#ccd0d4',
    borderRadius: '14px',
    fontSize: '11px',
    color: '#fff',
    border: 'none',
    transition: 'background-color 0.5s ease-out',
    "&:hover": {
      cursor: 'pointer',
      backgroundColor: 'black',
    }
  },
  userWrapper: {
    justifyContent: 'space-around'
  }
}));

function NavBar({window, nickname, userImage, setUserInfo}) {

  
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logoutButtonClicked = () => {
    Cookies.remove('token');
    setUserInfo('','');
  }

  const drawer = (
    <div>
      <div className={`${classes.toolbar} ${classes.logo}`}>
         <RiMoneyDollarCircleFill/>
                <span>Homepage</span>
      </div>
      <Divider />
      <List>
        {nickname.length>0 && (
          <ListItem className={classes.userWrapper}>
            <Avatar src={userImage} className={classes.userImage}/>
            <Typography component="h2" className={classes.userNickname}>{nickname}</Typography>
            <div>
              <button className={classes.logoutButton} onClick={logoutButtonClicked}>로그아웃</button>
            </div>
        </ListItem>
        )}
          
          <ListItem button component={NavLink} to='/' > 
            <ListItemText inset={false} primary={'가계부'}/>
          </ListItem>
         
          <ListItem button component={NavLink} to='/categories'> 
            <ListItemText primary={'카테고리'}/>
          </ListItem>
      </List> 
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" noWrap>
            AccountBook
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  )
        }

export default connect(({user})=>({
  nickname: user.nickname,
  userImage: user.userImage
}) ,{setUserInfo})(NavBar);
