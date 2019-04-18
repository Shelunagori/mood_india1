import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
//import 'date-fns';
//import Grid from '@material-ui/core/Grid';
//import DateFnsUtils from '@date-io/date-fns';
//import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
//import TabComp from './FullTab.js';
//import TextEditors from './textEditort.js';
import '../assets/css/index.css';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import {DropzoneArea} from 'material-ui-dropzone';
import NavBar from './NavBar.js';
import '../assets/css/index.css';
import { browserHistory } from 'history'
import axios from 'axios';
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
  button: {
    margin: theme.spacing.unit,
    backgroundColor:'#e29d34 !important',
    color:'#fff',
    marginTop:20,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 180,
  },

  width500:{
    width : 500
  },

  width250:{
    width : 250
  },
  
  width200:{
    width : 200
  },

  width300:{
    width : 300
  },

  width1000:{
    width : 1000
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  formHeader: {
    ...theme.typography.button,
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing.unit,
    width:1000,
  },
});
class addNotification extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      locations: [],
      location:'',
      countries: [],
      country:'',
      states: [],
      stateval:'',            
      agegroups:[],
      agegroup: '',
      genders:[],
      gender: '',
      incomes : [],
      income: '',
      maritials:[],
      maritial: '',
      languages: [],
      language: '',
      device_types:[],
      device_type: '',
      groups:[],
      group:'',
      polls:[],
      poll:'',
      selectedDate: new Date('2014-08-18T21:11:54'),
      selectedTime: '',
      image: '',
      message:'',
    };
    this.onChangeImage = this.onChangeImage.bind(this);
  }

  onChangeImage(e) {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length)
          return;
    this.createImage(files[0]);
  }
  createImage(file) {
    let reader = new FileReader();
    reader.onload = (e) => {
      this.setState({
        image: e.target.result
      })
    };
    reader.readAsDataURL(file);
  }

  componentDidMount () {
    axios.get('/api/countries').then(response => {
      this.setState({
        countries: response.data
      })
    });
    axios.get('/api/agegroups').then(response => {
      this.setState({
        agegroups: response.data
      })
    });   

    axios.get('/api/genders').then(response => {
      this.setState({
        genders: response.data
      })
    });   

    axios.get('/api/income_level').then(response => {
      this.setState({
        incomes: response.data
      })
    });   
    axios.get('/api/maritial').then(response => {
      this.setState({
        maritials: response.data
      })
    });

    axios.get('/api/device').then(response => {
      this.setState({
        device_types: response.data
      })
    });               
    axios.get('/api/group').then(response => {
      this.setState({
        groups: response.data
      })
    }); 
    axios.get('/api/poll').then(response => {
      this.setState({
        polls: response.data
      })
    });  
    axios.get('/api/language').then(response => {
      this.setState({
        languages: response.data
      })
    });     
    
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
      if(name == 'country')
      {
        axios.get(`/api/states_para/${event.target.value}`)
        .then(response => {
          this.setState({ 
            states: response.data
          })
        }).catch(function (error) {
          console.log(error);
        });        
      }  

      if(name == 'stateval')
      {    
          axios.get(`/api/location_para/${this.state.country}/${event.target.value}`)
          .then(response => {
            this.setState({ 
              locations: response.data
              })
          }).catch(function (error) {
            console.log(error);
          });
      }

  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  handleTimeChange = time => {
    this.setState({ selectedTime: time });
  };


  handleSubmit(e) {
    e.preventDefault(); 
    axios
        .post('/save_data', {
          location: this.state.location,
          agegroup: this.state.agegroup,
          gender:this.state.gender,
          location:this.state.location,
          agegroup: this.state.agegroup,
          income: this.state.income,
          maritial: this.state.maritial,
          language: this.state.language,
          device_type: this.state.device_type,
          group:this.state.group,
          poll:this.state.poll,
          selectedDate: this.state.selectedDate,
          selectedTime:this.state.selectedTime,
          title:this.state.title,
          message:this.state.message,
          image: this.state.image,         
        })
        .then(response => {
          if(response == 'success')
          {

          }else
          {
           window.location.replace("/send_notification/"+response['data']);
          }
        });

  }

  render() { 
    const { countries,states,locations,agegroups,genders,incomes,maritials,languages,device_types,groups,polls } = this.state;
    const { classes } = this.props;
    
    const { selectedDate } = this.state.selectedDate; 
    const { selectedTime } = this.state.selectedTime; 
    this.handleSubmit = this.handleSubmit.bind(this);  
    return (
      <div className={classes.root}> 
      <NavBar />
      <main className={classes.content}>
          <div className={classes.toolbar} />
          <div className="addScreennBackground">
          <form action="/" method="POST" encType="multipart/form-data" onSubmit={ this.handleSubmit }  className={classes.container} noValidate autoComplete="off">
              <div className={classes.formHeader}>{"Add Notification"}</div> 

              <TextField
                  id="outlined-select-country"
                  select
                  label="Select Country"
                  className={[classes.textField, classes.width300].join(' ')}
                  value={this.state.country}
                  onChange={this.handleChange('country')}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="Please select Country "
                  margin="normal"
                  variant="outlined"
                >
                  {countries.map(country => (
                    <MenuItem key={country.country} value={country.country}>
                      {country.country}
                    </MenuItem>
                  ))}
                </TextField>  

                <TextField
                  id="outlined-select-stateval"
                  select
                  label="Select State"
                  className={[classes.textField, classes.width300].join(' ')}
                  value={this.state.stateval}
                  onChange={this.handleChange('stateval')}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="Please select state "
                  margin="normal"
                  variant="outlined"
                >
                  {states && states.map(stateval => (
                    <MenuItem key={stateval.state} value={stateval.state}>
                      {stateval.state}
                    </MenuItem>
                  ))}
                </TextField>  
                <TextField
                  id="outlined-select-location"
                  select
                  label="Select Location"
                  className={[classes.textField, classes.width300].join(' ')}
                  value={this.state.location}
                  onChange={this.handleChange('location')}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="Please select location "
                  margin="normal"
                  variant="outlined"
                >
                  {locations && locations.map(location => (
                    <MenuItem key={location.city} value={location.city}>
                      {location.city}
                    </MenuItem>
                  ))}
                </TextField>        
                  
                <TextField
                  id="outlined-select-agegroup"
                  select
                  label="Select Age Group"
                  className={classes.textField}
                  value={this.state.agegroup}
                  onChange={this.handleChange('agegroup')}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="Please select Age group "
                  margin="normal"
                  variant="outlined"
                >
                  {agegroups.map(agegroup => (
                    <MenuItem key={agegroup.age} value={agegroup.age}>
                      {agegroup.age}
                    </MenuItem>
                  ))}
                </TextField>  

                <TextField
                  id="outlined-select-gender"
                  select
                  label="Select Gender"
                  className={classes.textField}
                  value={this.state.gender}
                  onChange={this.handleChange('gender')}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="Please select Gender "
                  margin="normal"
                  variant="outlined"
                >
                  {genders.map(gender => (
                    <MenuItem key={gender.value} value={gender.value}>
                      {gender.label}
                    </MenuItem>
                  ))}
                </TextField> 

              
                <TextField
                  id="outlined-select-income"
                  select
                  label="Select Income"
                  className={classes.textField}
                  value={this.state.income}
                  onChange={this.handleChange('income')}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="Please Select Income "
                  margin="normal"
                  variant="outlined"
                >
                  {incomes.map(income => (
                    <MenuItem key={income.income_level} value={income.income_level}>
                      {income.income_level}
                    </MenuItem>
                  ))}
                </TextField> 

                <TextField
                  id="outlined-select-maritial"
                  select
                  label="Select Maritial"
                  className={classes.textField}
                  value={this.state.maritial}
                  onChange={this.handleChange('maritial')}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="Please Select Maritial "
                  margin="normal"
                  variant="outlined"
                >
                  {maritials.map(maritial => (
                    <MenuItem key={maritial.value} value={maritial.value}>
                      {maritial.label}
                    </MenuItem>
                  ))}
                </TextField> 

                <TextField
                  id="outlined-select-language"
                  select
                  label="Select Language"
                  className={[classes.textField, classes.width200].join(' ')}
                  value={this.state.language}
                  onChange={this.handleChange('language')}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="Please Select Language "
                  margin="normal"
                  variant="outlined"
                >
                  {languages.map(language => (
                    <MenuItem key={language.value} value={language.value}>
                      {language.label}
                    </MenuItem>
                  ))}
                </TextField> 

                <TextField
                  id="outlined-select-group"
                  select
                  label="Select Group"
                  className={[classes.textField, classes.width200].join(' ')}
                  value={this.state.group}
                  onChange={this.handleChange('group')}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="Please Select Group "
                  margin="normal"
                  variant="outlined"
                >
                  {groups.map(group => (
                    <MenuItem key={group.value} value={group.value}>
                      {group.label}
                    </MenuItem>
                  ))}
                </TextField> 

                <TextField
                  id="outlined-select-poll"
                  select
                  label="Select Polls"
                  className={[classes.textField, classes.width200].join(' ')}
                  value={this.state.poll}
                  onChange={this.handleChange('poll')}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="Please Select Poll "
                  margin="normal"
                  variant="outlined"
                >
                  {polls.map(poll => (
                    <MenuItem key={poll.value} value={poll.value}>
                      {poll.label}
                    </MenuItem>
                  ))}
                </TextField> 


                <TextField
                  id="outlined-select-device-type"
                  select
                  label="Select Device Type"
                  className={[classes.textField, classes.width200].join(' ')}
                  value={this.state.device_type}
                  onChange={this.handleChange('device_type')}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="Please Select Device Type "
                  margin="normal"
                  variant="outlined"
                >
                  {device_types.map(device_type => (
                    <MenuItem key={device_type.value} value={device_type.value}>
                      {device_type.label}
                    </MenuItem>
                  ))}
                </TextField> 
                              
                <div className="datetimeDiv">
                   <input type="date" onChange={this.handleChange('selectedDate')}  className="datetimecls" />  
                   <input type="time" onChange={this.handleChange('selectedTime')} className="timedatecls" />   
                </div>
                { /* <MuiPickersUtilsProvider utils={DateFnsUtils}>                        
                      <DatePicker
                        margin="normal"
                        className={[classes.textField, classes.width500].join(' ')}
                        label="Date picker"
                        value={selectedDate}
                        onChange={this.handleDateChange}
                      />
                      <TimePicker
                        margin="normal"
                        className={[classes.textField, classes.width500].join(' ')}
                        label="Time picker"
                        value={selectedTime}
                        onChange={this.handleTimeChange}
                      />       
                  </MuiPickersUtilsProvider> */ }

              <TextField
                  id="outlined-title"
                  label="Title"
                  className={[classes.textField,classes.width1000].join(' ')}
                  onChange={this.handleChange('title')}
                  margin="normal"
                  variant="outlined"
                />
  
                <div className="tabmaindiv">
                    <textarea onChange={this.handleChange('message')} className={[classes.textField,classes.width1000]} rows="4" cols="50"></textarea>
                    {/*<TabComp />*/} 
                </div>             
                             
                { /*<DropzoneArea className="dropZones"  onChange={this.handleChange.bind(this)}  /> */ }   


                <input type="file"  onChange={this.onChangeImage} />


                <Button type="submit" variant="contained" className={classes.button}>
                  Submit {}
                  <Icon className={classes.rightIcon}>send</Icon>
                </Button>
              </form>
          </div>
      </main>        
      </div>                
    );
  }
}

addNotification.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(addNotification);