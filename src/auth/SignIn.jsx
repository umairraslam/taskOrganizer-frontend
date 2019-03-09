import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import SignInForm from './SignInForm';
import { loginUser } from '../actions/auth';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.doLogin = this.doLogin.bind(this);

    }

    doLogin(values) {
        console.log(values)
        this.props.dispatch(loginUser({ email: values.email.toString().toLowerCase(), password: values.password }));
    }

    render() {
        const { classes } = this.props;
        let { from } = { from: { pathname: '/app' } };
        
        if (this.props.isAuthenticated) { // eslint-disable-line
            return (
              <Redirect to={from} />
            );
        } 
        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <SignInForm onSubmit={this.doLogin} />
                </Paper>
            </main>
        );
    }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => {
    return {
        isProcessing: state.auth.isProcessing,
        isProcessed: state.auth.isProcessed,
        token: state.auth.token,
        user: state.auth.user,
        isAuthenticated: state.auth.isAuthenticated
    };
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(SignIn)));
