import React from 'react';
import BigCalendar from 'react-big-calendar'
import moment from 'moment';
import dates from './dates';
import { Button } from '@material-ui/core';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AddTaskForm from './AddTask';
import CustomDialog from '../reusable/Dialog/CustomDialog';
import { addTask, getTasksByUser } from '../actions/task';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {Add}  from "@material-ui/icons";

const styles = theme => ({
    button: {
        float: 'right'
    },
    marginAround: {
        margin: '1.2rem'
    }
});
class TaskContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showAddTaskDialog: false,
            initialValues:{}
        };

        this.closeTaskDialog = this.closeTaskDialog.bind(this);
        this.showDialog = this.showDialog.bind(this);
        this.submitTaskForm = this.submitTaskForm.bind(this);
        this.addEventOnClick = this.addEventOnClick.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(getTasksByUser(this.props.user._id));
    }

    showDialog() {
        console.log("addTask")
        this.setState({
            showAddTaskDialog: true
        });
    }
    addEventOnClick(timeSlot) {
        console.log(timeSlot);
        console.log(typeof timeSlot.start);
        // let myDate = moment(timeSlot.start,"dd YYYY-MM-DD")
        let myDate = Date.parse(timeSlot.start)

        console.log(myDate)
        myDate = new Date(myDate);
        console.log(myDate.toLocaleDateString())
        this.setState({
            showAddTaskDialog: true,
            initialValues: {
                            title:'', 
                            start: myDate.getFullYear() + "-" + ((myDate.getMonth()+1)<=9?"0"+(myDate.getMonth()+1): (myDate.getMonth()+1)) + "-" + (myDate.getDate()<=9?"0"+myDate.getDate():myDate.getDate()), 
                            selectStartHour: (myDate.getHours()<=9)?"0"+myDate.getHours():myDate.getHours().toString(), 
                            selectStartMinute: (myDate.getMinutes()<=9)?"0"+myDate.getMinutes():myDate.getMinutes().toString(),
                            end: myDate.getFullYear() + "-" + ((myDate.getMonth()+1)<=9?"0"+(myDate.getMonth()+1): (myDate.getMonth()+1)) + "-" + (myDate.getDate()<=9?"0"+myDate.getDate():myDate.getDate()), 
                            selectEndHour: (myDate.getHours()<=9)?"0"+myDate.getHours():myDate.getHours().toString(), 
                            selectEndMinute: ((myDate.getMinutes()+15)<=9)?"0"+(myDate.getMinutes()+15):(myDate.getMinutes()+15).toString(),
                            desc:''
                        }
        });
    }
    closeTaskDialog() {
        this.setState({
            showAddTaskDialog: false
        });
    }
    submitTaskForm(values) {
        console.log(values)
        values["userId"] = this.props.user._id;
        
        if(values.allDay == false){
            let spSt = values.start.split("-");
            let startDate = new Date(spSt[0], parseInt(spSt[1])-1,spSt[2], parseInt(values.selectStartHour), parseInt(values.selectStartMinute));
            values.start = startDate;
    
            spSt = values.end.split("-");
            let endDate = new Date(spSt[0], parseInt(spSt[1])-1,spSt[2], parseInt(values.selectEndHour), parseInt(values.selectEndMinute));
            values.end = endDate;    
        }
        delete values["selectStartHour"];
        delete values["selectEndHour"];
        delete values["selectStartMinute"];
        delete values["selectEndMinute"];
        this.setState({
            showAddTaskDialog: false
        });
        this.props.dispatch(addTask(values));

    }
    render() {
        let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])
        const localizer = BigCalendar.momentLocalizer(moment);
        const { classes } = this.props;
        return (
            <div>
                <div style={{ display: "flex", justifyContent: "space-between", float:"right" }}>
                    <Button onClick={this.showDialog} className={classes.marginAround} alignt="right" variant="contained" color="primary" ><Add/> Add Task</Button>
                </div>
                <div style={{ display: "inline-block", height: 700, width: '100%' }}>
                {this.props.tasks && <BigCalendar
                    selectable
                    events={this.props.tasks}
                    views={allViews}
                    step={60}
                    showMultiDayTimes
                    max={dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')}
                    defaultDate={new Date()}
                    localizer={localizer}
                    onSelectSlot={this.addEventOnClick}
                />}
                </div>
                <CustomDialog
                    width="xs"
                    handleMount={this.state.showAddTaskDialog}
                    dialogTitle={"Add Task"}
                    dialogContent={<AddTaskForm initialValues={this.state.initialValues ? this.state.initialValues : ""} onSubmit={this.submitTaskForm} />}
                    topCloseButton={true}
                    handleUnmount={this.closeTaskDialog}
                />
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

export default withRouter(connect(mapStateToProps)(withStyles(styles)(TaskContainer)));  