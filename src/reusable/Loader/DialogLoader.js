import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import LinearProgress from '@material-ui/core/LinearProgress';

const dialogLoaderStyles = theme => ({
  root: {
    /* flexGrow: 1, */
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    zIndex: '12000',
    position: 'fixed',
    touchAction: 'none',
    backgroundColor: 'rgba(0, 0, 0, 0.30)',
  },
  position: {
    //top : theme.spacing.unit 
  }
});

function DialogLoader(props) {
  const { classes } = props;
  return (
    <div aria-label="dialog-loader-container">
     {props.showDialogLoader && 
     <div aria-label="dialog-loader-background" className={classes.root}>
        <LinearProgress className={classes.position}/>
      </div>
     }
     </div>
  );
}

DialogLoader.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => {
  return {
    showDialogLoader: state.loader.showDialogLoader
  };
};

export default withRouter(connect(mapStateToProps)(withStyles(dialogLoaderStyles)(DialogLoader)));