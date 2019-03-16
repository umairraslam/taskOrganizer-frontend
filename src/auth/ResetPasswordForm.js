import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Field, reduxForm } from 'redux-form'
import Button from '@material-ui/core/Button'
import { renderTextFieldCustom } from '../reusable/reduxForm/FormAttributes'
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import { Typography } from '@material-ui/core';
import { Tooltip, IconButton , Grid } from '@material-ui/core';
import { Info, Lock} from '@material-ui/icons';
import GridContainer from '../reusable/Grid/GridContainer';
import GridItem from '../reusable/Grid/GridItem';

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


const validate = (values, props) => {
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    let errors = {}
    const requiredFields = [
        'password',
        'confirm_password'
    ]

    if (values.password) {
        if (!strongRegex.test(values.password)) {
            errors.password = 'does not meet the password policy requirements'
        }
    }

    if (values.password && values.confirm_password) {
        if (values.password !== values.confirm_password) {
            errors.confirm_password = 'do not match'
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



const ResetPasswordForm = props => {
    const { classes, handleSubmit, submitting } = props
    return (
        <form onSubmit={handleSubmit} className={classes.container} noValidate autoComplete="off">
            <img className={classes.logo} src={logo} alt="logo" />
            <Typography variant="title" gutterBottom>Set your password ?</Typography>
            <Typography variant="body2" gutterBottom>Please set a password for your account</Typography>
            <br />


            <GridContainer>
                <GridItem style={{ display: 'flex' }} lg={12}>
                <Grid xs={2} style={{ justifyContent: 'flex-start' }} item>
                            <Tooltip disableFocusListener={true} title={
                                    <div>
                                        1.Password must be 8 characters long <br />
                                        2.Password must be alpha numeric <br />
                                        3.Password must contain at least 1 capital letter<br />
                                        4.Password must contain at least 1 special character
                                    </div>
                                    } placement="right">
                                    <IconButton style={{padding: '10px', height: '44px', marginTop: '1rem'}}>
                                        <Info />
                                    </IconButton>
                            </Tooltip>
                    </Grid>
                    <Grid lg={12}>
                        <Field
                            name="password"
                            type="password"
                            component={renderTextFieldCustom}
                            label="Password"
                            placeholder="Password"
                            fullWidth/>    
                    </Grid>
                    
                </GridItem>
            </GridContainer>
            <GridContainer>
               <GridItem style={{ display: 'flex' }} lg={12}>
                                     <Grid xs={2} style={{ justifyContent: 'flex-start' }} item>
                                     <Tooltip disableFocusListener={true} title={
                                    <div>
                                        Confirm Password
                                    </div>
                                    } placement="right">
                                    <IconButton style={{padding: '10px', height: '44px', marginTop: '1rem'}}>
                                        <Lock />
                                    </IconButton>
                            </Tooltip>
                                     </Grid>

<Grid lg={12}>


     <Field
                    name="confirm_password"
                    type="password"
                    component={renderTextFieldCustom}
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    fullWidth
                />
</Grid>
                   
                </GridItem>
            </GridContainer>

            <Button type="submit" variant="contained" size="large" disabled={submitting} color="primary" className={classes.btnBlock} >Set Password</Button>
            <br />
            <br />
            <Button component={Link} to="/login" variant="text" size="large" color="secondary" className={classes.btnBlock} >
                Cancel
            </Button>
        </form>
    )
}


export default reduxForm({
    form: 'ResetPasswordForm', // a unique identifier for this form
    validate
})(withStyles(styles)(ResetPasswordForm));