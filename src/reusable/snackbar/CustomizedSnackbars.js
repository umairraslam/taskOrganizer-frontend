import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {CheckCircle, Error, Info, Close, Warning} from '@material-ui/icons';

import {green, amber} from '@material-ui/core/colors';
import {IconButton} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withStyles } from '@material-ui/core/styles';

const variantIcon = {
  success: CheckCircle,
  warning: Warning,
  error: Error,
  info: Info,
};

const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <Close className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles2 = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});

class CustomizedSnackbars extends React.Component {
  state = {
    open: false,
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  render() {
   /*  const { classes } = this.props; */

    return (
      <div>
        {/* <Button className={classes.margin} onClick={this.handleClick}>
          Open success snackbar
        </Button> */}
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={this.props.open}
          autoHideDuration={6000}
          onClose={this.props.close}
        >
          <MySnackbarContentWrapper
            onClose={this.props.close}
            variant={this.props.variant}
            message={this.props.Message}
          />
        </Snackbar>
        {/* <MySnackbarContentWrapper
          variant="error"
          className={classes.margin}
          message="This is an error message!"
        />
        <MySnackbarContentWrapper
          variant="warning"
          className={classes.margin}
          message="This is a warning message!"
        />
        <MySnackbarContentWrapper
          variant="info"
          className={classes.margin}
          message="This is an information message!"
        />
        <MySnackbarContentWrapper
          variant="success"
          className={classes.margin}
          message="This is a success message!"
        /> */}
      </div>
    );
  }
}

CustomizedSnackbars.propTypes = {
 /*  classes: PropTypes.object.isRequired, */
};

export default withStyles(styles2)(CustomizedSnackbars);