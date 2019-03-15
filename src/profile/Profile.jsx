import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    button: {
        float: 'right'
    },
    marginAround: {
        margin: '1.2rem'
    }
});
class Profile extends React.Component {
    render(){
        return(
            <div>
                User Profile Here
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        user: state.auth.user.user,
        showSuccessSnackbar: state.snackbar.showSuccessSnackbar,
        showErrorSnackbar: state.snackbar.showErrorSnackbar,
        message: state.snackbar.message,
        tasks: state.task.tasks
    };
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Profile)));  
