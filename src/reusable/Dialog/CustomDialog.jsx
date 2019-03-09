
import React from 'react';
import classNames from "classnames";
import PropTypes from 'prop-types';
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import { Button, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';

import DialogLoader from '../Loader/DialogLoader';

const customDialogStyle = theme => ({
  root: {
    overflow: 'hidden'
  },
  customDialogContent: {
    overflow: 'hidden',
    '& table tr td:first-child':{
      padding: '0.4rem 0 !important'
    }
  },
  customDialogContentPlain: {
    padding: '0 !important'
  },
  customDialogActionColored:{
    background: '#263238',
    padding:10,
    margin: 0
  },
  closeButton:{
    position:"absolute",
    right:theme.spacing.unit*1,
    top:theme.spacing.unit*1,
    zIndex:1000
  }
});

class CustomDialog extends React.Component {

  render() {
    const { classes,className, handleMount, handleUnmount, width, alignHeader, alignContent, fullScreen,
      dialogTitle, dialogContentText, dialogContent, dialogActions, dialogActionCloseContent,topCloseButton,
    plain, actionsColored} = this.props;
      const dialogContentClasses = classNames({
        [classes.customDialogContent]: true,
        [classes.customDialogContentPlain]: plain,
        [className]: className !== undefined
      });
      const dialogActionClasses = classNames({
        [classes.customDialogActionColored]: actionsColored,
        [className]: className !== undefined
      });

  return (
      <div>
        <DialogLoader />
        <Dialog
          fullScreen = {fullScreen? true : false}
          open={handleMount}
          onClose={handleUnmount}
          fullWidth={width? true: false}
          maxWidth={width}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          style={this.props.showDialogLoader  !== true  ? {} : { display: 'none' }} 
        >
          {topCloseButton && 
            <IconButton className={classes.closeButton} variant="" autoFocus onClick={handleUnmount} >
              <Close />
            </IconButton>}
          
          {dialogTitle ? <DialogTitle id="alert-dialog-title" align={alignHeader? alignHeader : "left"}>{dialogTitle}</DialogTitle> :null}
          
          <DialogContent className={dialogContentClasses} align={alignContent? alignContent : "left"}>
          {dialogContentText ? 
            <DialogContentText id="alert-dialog-description">
            {dialogContentText}
            </DialogContentText>:null}
            {dialogContent}
          </DialogContent>
          {(dialogActions || dialogActionCloseContent) && <DialogActions className={dialogActionClasses}>
          {dialogActionCloseContent && <Button variant="flat" color="secondary" onClick={handleUnmount} autoFocus >
              {dialogActionCloseContent}
            </Button>
            }
          {dialogActions}
          </DialogActions>}
        </Dialog>
      </div>
    );
  }
}

CustomDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    dialogTitle:PropTypes.string,
    dialogContentText:PropTypes.string,
    dialogContent:PropTypes.node,
    dialogActions:PropTypes.node,
    dialogActionCloseContent:PropTypes.object,
    width:PropTypes.object,
    handleMount:PropTypes.bool,
    handleUnmount:PropTypes.func,
    plain:PropTypes.bool,
    actionsColored:PropTypes.bool,
    alignHeader:PropTypes.string,
    alignContent:PropTypes.string,
    fullScreen:PropTypes.bool,
  };
  
const mapStateToProps = state => {
  return {
    showDialogLoader: state.loader.showDialogLoader
  };
};

export default  withRouter(connect(mapStateToProps)(withStyles(customDialogStyle)(CustomDialog)));