import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Field, reduxForm } from 'redux-form'
import Button from '@material-ui/core/Button'
import asyncValidate from '../reusable/reduxForm/asyncValidate'
import { renderTextField } from '../reusable/reduxForm/FormAttributes'
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import '../App.css';

const styles = theme => ({
  container: {
  
  },
  btnBlock: {
    width: '100%',
    padding: '1rem'
  },
  logo: {
    width: '160px',
    position: 'relative',
    marginBottom: '1.5rem',
  }
});

const validate = values => {
  const errors = {}
  const requiredFields = [
    'email',
    'oldPassword',
    'password',
    'confirmNewPassword'
  ]
  
  if(values.confirmNewPassword && values.password){
      if(values.confirmNewPassword !== values.password){
        errors.confirmNewPassword = " does not match."
        return errors;
      }
  }
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'is required'
    }
  })
  return errors
}



const ChangePasswordInternalForm = props => {
  const { classes, handleSubmit, submitting } = props
  return (
    <form onSubmit={handleSubmit} className={classes.container} noValidate autoComplete="off">
    
        <Field
          name="oldPassword"
          type="password"
          component={renderTextField}
          label="Old Password"
          fullWidth
          InputLabelProps={{ shrink: true, }}
        />
        <Field
          name="password"
          type="password"
          component={renderTextField}
          label="New Password"
          fullWidth
          InputLabelProps={{ shrink: true, }}
        />
        <Field
          name="confirmNewPassword"
          type="password"
          component={renderTextField}
          label="Confirm New Password"
          fullWidth
          InputLabelProps={{ shrink: true, }}
        />
      <Button type="submit" variant="contained" size="large" disabled={submitting} color="primary" className={classes.btnBlock} >Change Password</Button>
      
    </form>
  )
}


export default reduxForm({
  form: 'ChangePasswordInternalForm', // a unique identifier for this form
  validate
})(withStyles(styles)(ChangePasswordInternalForm));