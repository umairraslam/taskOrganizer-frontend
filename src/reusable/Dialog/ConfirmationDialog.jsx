import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from '@material-ui/core';

class ConfirmationDialog extends React.Component {


  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          maxWidth={this.props.maxWidth ? this.props.maxWidth : false}
          onClose={this.props.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{this.props.dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Typography variant="body2">{this.props.dialogContent}</Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleFinalApproval} disabled={this.props.required ? true : false} color="primary"> 
              {this.props.buttonOneTitle}
            </Button>
            <Button onClick={this.props.handleClose} variant="flat" color="secondary" autoFocus>
              {this.props.buttonTwoTitle}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ConfirmationDialog;