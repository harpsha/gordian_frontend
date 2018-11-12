import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import Cart from '@material-ui/icons/ShoppingCart'


const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },

  message : {
    marginLeft : '36%',
  },
  
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
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
});

class PrimarySearchAppBar extends React.Component {
  

  render() {
 
    const { classes } = this.props;
                   
    const showcart = false
  return (
      <div >
        <AppBar position="fixed">
          <Toolbar >
            
              <Typography className={classes.title} variant="h5" color="inherit" noWrap>
               Flight Booking Prototype
              </Typography>
              
              <Typography className={classes.message}  variant="h2" color="inherit" >
              {this.props.title}
              </Typography>
              
              <div className={classes.grow} />
              <div>
                
              <IconButton color="inherit"  onClick={this.props.showcartPage}>
                { (this.props.showcart && this.props.cartItems) ? 
                              <Badge badgeContent={1} color="secondary">
                                 <Cart />
                              </Badge> 
                             : 
                             (this.props.showcart) ? 
                              <Cart />
                             :
                             "" }
              </IconButton> 
              </div>
          </Toolbar>
        </AppBar>
        
      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrimarySearchAppBar);





