import React from 'react';
import BigCalendar from 'react-big-calendar'
import moment from 'moment';
import dates from './dates';
import { Button } from '@material-ui/core';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AddTaskForm from './AddTask';
import CustomDialog from '../reusable/Dialog/CustomDialog';
import { addTask, getTasksByUser, updateTask } from '../actions/task';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Add } from "@material-ui/icons";

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
            initialValues: null,
            selectedEvent: {},
            updateFlag: false
        };

        this.closeTaskDialog = this.closeTaskDialog.bind(this);
        this.showDialog = this.showDialog.bind(this);
        this.submitTaskForm = this.submitTaskForm.bind(this);
        this.addEventOnClick = this.addEventOnClick.bind(this);
        this.onSelectEvent = this.onSelectEvent.bind(this);
        this.updateTask = this.updateTask.bind(this);
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
        let myDate = Date.parse(timeSlot.start)
        myDate = new Date(myDate);
        this.setState({
            showAddTaskDialog: true,
            updateFlag: false,
            initialValues: {
                title: '',
                start: myDate.getFullYear() + "-" + ((myDate.getMonth() + 1) <= 9 ? "0" + (myDate.getMonth() + 1) : (myDate.getMonth() + 1)) + "-" + (myDate.getDate() <= 9 ? "0" + myDate.getDate() : myDate.getDate()),
                selectStartHour: (myDate.getHours() <= 9) ? "0" + myDate.getHours() : myDate.getHours().toString(),
                selectStartMinute: (myDate.getMinutes() <= 9) ? "0" + myDate.getMinutes() : myDate.getMinutes().toString(),
                end: myDate.getFullYear() + "-" + ((myDate.getMonth() + 1) <= 9 ? "0" + (myDate.getMonth() + 1) : (myDate.getMonth() + 1)) + "-" + (myDate.getDate() <= 9 ? "0" + myDate.getDate() : myDate.getDate()),
                selectEndHour: (myDate.getHours() <= 9) ? "0" + myDate.getHours() : myDate.getHours().toString(),
                selectEndMinute: ((myDate.getMinutes() + 15) <= 9) ? "0" + (myDate.getMinutes() + 15) : (myDate.getMinutes() + 15).toString(),
                desc: '',
                allDay: false
            }
        });
    }
    closeTaskDialog() {
        this.setState({
            showAddTaskDialog: false,
            initialValues: null,
            updateFlag: false
        });
    }
    submitTaskForm(values) {
        console.log(values)
        values["userId"] = this.props.user._id;

        let spSt = values.start.split("-");
        let startDate = new Date(spSt[0], parseInt(spSt[1]) - 1, spSt[2], parseInt(values.selectStartHour), parseInt(values.selectStartMinute));
        values.start = startDate;

        if(values.allDay == false){
            spSt = values.end.split("-");
            let endDate = new Date(spSt[0], parseInt(spSt[1]) - 1, spSt[2], parseInt(values.selectEndHour), parseInt(values.selectEndMinute));
            values.end = endDate;    
        } else{
            let endDate = new Date(spSt[0], parseInt(spSt[1]) - 1, spSt[2], parseInt("23"), parseInt("59"));
            values.end = endDate;    
        }

        delete values["selectStartHour"];
        delete values["selectEndHour"];
        delete values["selectStartMinute"];
        delete values["selectEndMinute"];
        this.setState({
            showAddTaskDialog: false,
            initialValues: null,
            updateFlag: false
        });
        this.props.dispatch(addTask(values));

    }
    updateTask(values) {

        console.log(values)
        console.log(this.props)
        values["userId"] = this.props.user._id;
        console.log(values)
        let spSt = values.start.split("-");
        let startDate = new Date(spSt[0], parseInt(spSt[1]) - 1, spSt[2], parseInt(values.selectStartHour), parseInt(values.selectStartMinute));
        values.start = startDate;

        if(values.allDay == false){
            spSt = values.end.split("-");
            let endDate = new Date(spSt[0], parseInt(spSt[1]) - 1, spSt[2], parseInt(values.selectEndHour), parseInt(values.selectEndMinute));
            values.end = endDate;    
        } else{
            let endDate = new Date(spSt[0], parseInt(spSt[1]) - 1, spSt[2], parseInt("23"), parseInt("55"));
            values.end = endDate;    
        }

        delete values["selectStartHour"];
        delete values["selectEndHour"];
        delete values["selectStartMinute"];
        delete values["selectEndMinute"];
        this.setState({
            showAddTaskDialog: false,
            initialValues: null,
            updateFlag: false
        });
        this.props.dispatch(updateTask(values, this.state.selectedEvent._id));



    }
    onSelectEvent(timeSlot) {
        console.log(timeSlot)
        let myDate = Date.parse(timeSlot.start)
        myDate = new Date(myDate);

        let myDateEnd = Date.parse(timeSlot.end)
        myDateEnd = new Date(myDateEnd);

        this.setState({
            selectedEvent: timeSlot,
            showAddTaskDialog: true,
            updateFlag: true,
            initialValues: {
                title: timeSlot.title,
                start: myDate.getFullYear() + "-" + ((myDate.getMonth() + 1) <= 9 ? "0" + (myDate.getMonth() + 1) : (myDate.getMonth() + 1)) + "-" + (myDate.getDate() <= 9 ? "0" + myDate.getDate() : myDate.getDate()),
                selectStartHour: (myDate.getHours() <= 9) ? "0" + myDate.getHours() : myDate.getHours().toString(),
                selectStartMinute: (myDate.getMinutes() <= 9) ? "0" + myDate.getMinutes() : myDate.getMinutes().toString(),
                end: myDateEnd.getFullYear() + "-" + ((myDateEnd.getMonth() + 1) <= 9 ? "0" + (myDateEnd.getMonth() + 1) : (myDateEnd.getMonth() + 1)) + "-" + (myDateEnd.getDate() <= 9 ? "0" + myDateEnd.getDate() : myDateEnd.getDate()),
                selectEndHour: (myDateEnd.getHours() <= 9) ? "0" + myDateEnd.getHours() : myDateEnd.getHours().toString(),
                selectEndMinute: ((myDateEnd.getMinutes()) <= 9) ? "0" + (myDateEnd.getMinutes()) : (myDateEnd.getMinutes()).toString(),
                desc: timeSlot.desc,
                allDay: timeSlot.allDay
            }
        });
    }
    render() {
        let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])
        const localizer = BigCalendar.momentLocalizer(moment);
        const { classes } = this.props;
        return (
            <div>
                <div style={{ display: "flex", justifyContent: "space-between", float: "right" }}>
                    <Button onClick={this.showDialog} className={classes.marginAround} alignt="right" variant="contained" color="primary" ><Add /> Add Task</Button>
                </div>
                <div style={{ display: "inline-block", height: 700, width: '100%' }}>
                    {this.props.tasks && <BigCalendar
                        selectable
                        popup
                        events={this.props.tasks}
                        views={allViews}
                        step={60}
                        showMultiDayTimes
                        max={dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')}
                        defaultDate={new Date()}
                        localizer={localizer}
                        onSelectSlot={this.addEventOnClick}
                        onSelectEvent={this.onSelectEvent}
                    />}
                </div>
                <CustomDialog
                    width="xs"
                    handleMount={this.state.showAddTaskDialog}
                    dialogTitle={this.state.updateFlag ? "Update Task" : "Create Task"}
                    dialogContent={<AddTaskForm initialValues={this.state.initialValues ? this.state.initialValues : ""} onSubmit={this.state.initialValues ? this.updateTask : this.submitTaskForm} buttonText={this.state.updateFlag ? "Update Task" : "Create Task"} />}
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