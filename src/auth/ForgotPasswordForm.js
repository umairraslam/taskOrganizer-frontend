import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Field, reduxForm } from 'redux-form'
import Button from '@material-ui/core/Button'
import { renderTextFieldCustom } from '../reusable/reduxForm/FormAttributes';
import logo from '../logo.svg';
import {Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

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
        'email'
    ]

    if(values.email){
        console.log(values.email)
        if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
            errors.email = 'address is invalid'
        }
    }

    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    })
    return errors
}



const ForgotPasswordForm = props => {
    const { classes, handleSubmit, submitting } = props
    return (
        <form onSubmit={handleSubmit} className={classes.container} noValidate autoComplete="off">
            <img className={classes.logo} src={logo} alt="logo" />

            <Typography variant="title" gutterBottom>Forgot your password ?</Typography>
            <Typography variant="body2" gutterBottom>Please enter your email address to reset your password</Typography>
            <br/>
            <Field
                name="email"
                type="email"
                component={renderTextFieldCustom}
                label="Email"
                fullWidth
                InputLabelProps={{ shrink: true, }}
            />
            <Button type="submit" variant="contained" size="large" disabled={submitting} color="primary" className={classes.btnBlock} >Send Email</Button>
            <br/>
            <br/>
            <Button component={Link} to="/login" variant="text" size="large" color="secondary" className={classes.btnBlock} >
                    Cancel
            </Button>
        </form>
    )
}


export default reduxForm({
    form: 'ForgotPasswordForm', // a unique identifier for this form
    validate
})(withStyles(styles)(ForgotPasswordForm));