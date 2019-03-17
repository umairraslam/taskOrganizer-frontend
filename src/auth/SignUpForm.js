import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Field, reduxForm } from 'redux-form'
import { Button, InputLabel, MenuItem } from '@material-ui/core';
import asyncValidate from '../reusable/reduxForm/asyncValidate'
import { renderTextField, renderCheckbox, renderTextFieldCustom, renderSelectField } from '../reusable/reduxForm/FormAttributes'
import "react-datepicker/dist/react-datepicker.css";
import '../App.css';
import { Delete } from "@material-ui/icons";
import logo from '../logo.svg';
import { Typography } from '@material-ui/core';

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
    },
    groupFields: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    marginAround: {
        margin: '1.2rem'
    }

});

const validate = values => {
    const errors = {}
    const requiredFields = [
        'firstName',
        'lastName',
        'email'
    ]

    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = ' is required'
        }
    })
    return errors
}



class SignUpForm extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }


    render() {
        const { classes, handleSubmit, submitting } = this.props
        return (
            <div>

                <form onSubmit={handleSubmit} className={classes.container} noValidate autoComplete="off">
                    <img className={classes.logo} src={logo} alt="logo" />
                    <Typography variant="title" gutterBottom>Sign Up</Typography>
                    <br />
                    <Field
                        name="firstName"
                        type="text"
                        component={renderTextField}
                        label="First Name"
                        fullWidth
                        InputLabelProps={{ shrink: true, }}
                    />

                    <Field
                        name="lastName"
                        type="text"
                        component={renderTextField}
                        label="Last Name"
                        fullWidth
                        InputLabelProps={{ shrink: true, }}
                    />

                    <Field
                        name="email"
                        type="text"
                        component={renderTextField}
                        label="Email"
                        fullWidth
                        InputLabelProps={{ shrink: true, }}
                    />

                    <Field
                        name="role"
                        type="text"
                        component={renderTextField}
                        label="Role"
                        fullWidth
                        InputLabelProps={{ shrink: true, }}
                    />

                    <Field
                        name="dob"
                        type="date"
                        component={renderTextFieldCustom}
                        label="Date of Birth"
                        InputLabelProps={{ shrink: true, }}
                        required={true}
                        fullWidth={true}

                    />

                    <Field
                        name="password"
                        type="password"
                        component={renderTextFieldCustom}
                        label="Password"
                        InputLabelProps={{ shrink: true, }}
                        required={true}
                        fullWidth={true}

                    />

                    <Field
                        name="confirmPassword"
                        type="password"
                        component={renderTextFieldCustom}
                        label="Confirm Password"
                        InputLabelProps={{ shrink: true, }}
                        required={true}
                        fullWidth={true}

                    />

                    <Button type="submit" variant="contained" size="large" disabled={submitting} color="primary" className={classes.btnBlock} >{this.props.buttonText}</Button>
                </form>
            </div>
        )

    }
}


export default reduxForm({
    form: 'SignUpForm', // a unique identifier for this form
    validate,
    asyncValidate
})(withStyles(styles)(SignUpForm));