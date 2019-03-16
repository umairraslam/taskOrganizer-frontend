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
    'password'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'required'
    }
  })
  return errors
}



const SignInForm = props => {
  const { classes, handleSubmit, submitting } = props
  return (
    <form onSubmit={handleSubmit} className={classes.container} noValidate autoComplete="off">
    <img className={classes.logo} src={logo} alt="logo" />
        <Field
          name="email"
          type="email"
          component={renderTextField}
          label="Email"
          fullWidth
          InputLabelProps={{ shrink: true, }}
        />
        <Field 
          name="password" 
          type="password" 
          component={renderTextField} 
          label="Password"
          fullWidth
          InputLabelProps={{ shrink: true, }}
        />
      <Button type="submit" variant="contained" size="large" disabled={submitting} color="primary" className={classes.btnBlock} >Login</Button>
      <p style={{marginTop: '1rem'}}><Link to="/forgotpassword" display="body1" style={{color: '#999'}}>Forgot your password?</Link></p>
    </form>
  )
}


export default reduxForm({
  form: 'SignInForm', // a unique identifier for this form
  validate,
  asyncValidate
})(withStyles(styles)(SignInForm));