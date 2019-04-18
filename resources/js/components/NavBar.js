import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
//import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
//import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import '../assets/css/index.css';
import logo from '../assets/images/logo0.png';
import mainLogo from '../assets/images/logo.png';

const drawerWidth = 240;

const styles = theme => ({

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },

  toolbar: theme.mixins.toolbar,
});

function ClippedDrawer(props) {
  const { classes } = props;

  return (
    <div >
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className="topBarColor">
          <Typography variant="h6" color="inherit" noWrap>
             <img className="logo"  src={logo} alt="Mood India"/>     
             <img className="mainLogo" src={mainLogo} alt="Mood India"/> 
          </Typography>
        </Toolbar>
      </AppBar>
        <Drawer  className={classes.drawer} variant="permanent"  classes={{ paper: classes.drawerPaper, }} >
            <div className={classes.toolbar} />
            <List>
              <ListItem button component="a" href="/">
                  <ListItemText primary="Add Notification" />
              </ListItem>

              <ListItem button component="a" href="/NotificationList">
                  <ListItemText primary="Notification List" />
              </ListItem>

              <ListItem button component="a" href="/Report">
                  <ListItemText primary="Report" />
              </ListItem>              
            </List>
         </Drawer>
    </div>
  );
}

ClippedDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClippedDrawer);



/* START  OLD CODE FOR TOP BAR */

// import React from 'react';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import '../assets/css/index.css';
// import logo from '../assets/images/logo0.png';
// import mainLogo from '../assets/images/logo.png';

// const NavBar = () => {
//     return(
//         <div>
//             <AppBar position="static">
//                 <Toolbar className="topBarColor">
//                     <Typography variant="title" color="inherit">
//                          <img className="logo"  src={logo} alt="Mood India"/>     
//                          <img className="mainLogo" src={mainLogo} alt="Mood India"/> 
//                     </Typography>
//                 </Toolbar>
//             </AppBar>
//         </div>
//     )
// }
// export default NavBar;

/* END OLD CODE FOR TOP BAR  */
