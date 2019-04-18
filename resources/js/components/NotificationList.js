import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import '../assets/css/index.css';
import NavBar from './NavBar.js';
const styles = theme => ({
  root: {
    display: 'flex',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  
  toolbar: theme.mixins.toolbar,
}); 

const columns = [
  {
   name: "name",
   label: "Name",
   options: {
    filter: true,
    sort: true,
   }
  },
  {
   name: "company",
   label: "Company",
   options: {
    filter: true,
    sort: false,
   }
  },
  {
   name: "city",
   label: "City",
   options: {
    filter: true,
    sort: false,
   }
  },
  {
   name: "state",
   label: "State",
   options: {
    filter: true,
    sort: false,
   }
  },
 ];
  
 const data = [
  { name: "Joe James", company: "Test Corp", city: "Yonkers", state: "NY" },
  { name: "John Walsh", company: "Test Corp", city: "Hartford", state: "CT" },
  { name: "Bob Herm", company: "Test Corp", city: "Tampa", state: "FL" },
  { name: "James Houston", company: "Test Corp", city: "Dallas", state: "TX" },
 ];
  
 const options = {
   filterType: 'checkbox',
 };

class NotificationList extends React.Component {
 render() {
  const { classes } = this.props;
    return (
      <div className={classes.root}> 
          <NavBar /> 
            <main className={classes.content}>
              <div className={classes.toolbar} />
                <div className="addScreennBackground"> 
                    <MUIDataTable
                    title={"Employee List"}
                    data={data}
                    columns={columns}
                    options={options}
                  />
                </div>
            </main>                      
      </div>                
    );
  }
}

NotificationList.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(NotificationList);

