import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Field, reduxForm } from 'redux-form'
import { Button, InputLabel, MenuItem } from '@material-ui/core';
import asyncValidate from '../reusable/reduxForm/asyncValidate'
import { renderTextField, renderCheckbox, renderTextFieldCustom, renderSelectField } from '../reusable/reduxForm/FormAttributes'
import "react-datepicker/dist/react-datepicker.css";
import '../App.css';
import { Delete } from "@material-ui/icons";

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
        'title',
        'start'
    ]
    if (values.end) {
        let spSt = values.start.split("-");
        let startDate = new Date(spSt[0], parseInt(spSt[1]) - 1, spSt[2], parseInt(values.selectStartHour ? values.selectStartHour : "00"), parseInt(values.selectStartMinute ? values.selectStartMinute : "00"));

        spSt = values.end.split("-");
        let endDate = new Date(spSt[0], parseInt(spSt[1]) - 1, spSt[2], parseInt(values.selectEndHour ? values.selectEndHour : "00"), parseInt(values.selectEndMinute ? values.selectEndMinute : "00"));

        if (Date.parse(endDate) <= Date.parse(startDate)) {
            errors["end"] = " must be greater than start date"
        }

    }
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = ' is required'
        }
    })
    return errors
}



class AddTaskForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allDayEvent: false
        }
        this.toggleAllDay = this.toggleAllDay.bind(this);
    }

    componentDidMount() {
        console.log("AddTaskForm ComponentDidMount");
        console.log(this.props)
        if(this.props.initialValues){
            this.setState({
                allDayEvent: this.props.initialValues.allDay
            })    
        }
    }

    toggleAllDay(event) {
        let temp = this.state.allDayEvent;
        console.log(temp)
        console.log(event.target.checked)
        this.setState({
            allDayEvent: event.target.checked
        });
    }

    deleteTask() {
        this.props.showDeleteDialog();
    }

    render() {
        const { classes, handleSubmit, submitting } = this.props
        return (
            <div>
              {this.props.initialValues && this.props.initialValues.id && <div style={{ display: "flex", justifyContent: "space-between", float: "right" }}>
            <Button onClick={()=>this.deleteTask()} alignt="right" variant="contained" color="primary" ><Delete/></Button>
        </div>}

            <form onSubmit={handleSubmit} className={classes.container} noValidate autoComplete="off">
                <Field
                    name="title"
                    type="text"
                    component={renderTextField}
                    label="Title"
                    fullWidth
                    InputLabelProps={{ shrink: true, }}
                />

                <Field
                    name="start"
                    type="date"
                    component={renderTextFieldCustom}
                    label="Start Date"
                    InputLabelProps={{ shrink: true, }}
                    required={true}
                    fullWidth={true}

                />
                <div className={classes.groupFields}>
                    <InputLabel htmlFor="select-start-hour"></InputLabel>
                    <Field
                        required={true}
                        name="selectStartHour"
                        component={renderSelectField}
                    //fullWidth

                    >
                        <MenuItem value="">Hour</MenuItem>
                        <MenuItem value="00">00</MenuItem>
                        <MenuItem value="01" >01</MenuItem>
                        <MenuItem value="02">02</MenuItem>
                        <MenuItem value="03">03</MenuItem>
                        <MenuItem value="04">04</MenuItem>
                        <MenuItem value="05">05</MenuItem>
                        <MenuItem value="06">06</MenuItem>
                        <MenuItem value="07">07</MenuItem>
                        <MenuItem value="08">08</MenuItem>
                        <MenuItem value="09">09</MenuItem>
                        <MenuItem value="10">10</MenuItem>
                        <MenuItem value="11">11</MenuItem>
                        <MenuItem value="12">12</MenuItem>
                        <MenuItem value="13">13</MenuItem>
                        <MenuItem value="14">14</MenuItem>
                        <MenuItem value="15">15</MenuItem>
                        <MenuItem value="16">16</MenuItem>
                        <MenuItem value="17">17</MenuItem>
                        <MenuItem value="18">18</MenuItem>
                        <MenuItem value="19">19</MenuItem>
                        <MenuItem value="20">20</MenuItem>
                        <MenuItem value="21">21</MenuItem>
                        <MenuItem value="22">22</MenuItem>
                        <MenuItem value="23">23</MenuItem>
                    </Field>

                    <InputLabel htmlFor="select-start-minute"></InputLabel>
                    <Field
                        required={true}
                        name="selectStartMinute"
                        component={renderSelectField}
                    //fullWidth
                    >
                        <MenuItem value="">Minutes</MenuItem>
                        <MenuItem value="00">00</MenuItem>
                        <MenuItem value="05" >05</MenuItem>
                        <MenuItem value="10">10</MenuItem>
                        <MenuItem value="15">15</MenuItem>
                        <MenuItem value="20">20</MenuItem>
                        <MenuItem value="25">25</MenuItem>
                        <MenuItem value="30">30</MenuItem>
                        <MenuItem value="35">35</MenuItem>
                        <MenuItem value="40">40</MenuItem>
                        <MenuItem value="45">45</MenuItem>
                        <MenuItem value="50">50</MenuItem>
                        <MenuItem value="55">55</MenuItem>
                    </Field></div>

                <br />
                {!this.state.allDayEvent && <div>
                    <Field
                        name="end"
                        type="date"
                        component={renderTextFieldCustom}
                        label="End Date"
                        InputLabelProps={{ shrink: true, }}
                        required={true}
                        fullWidth={true}

                    />

                    <div className={classes.groupFields}><InputLabel htmlFor="select-end-hour"></InputLabel>
                        <Field
                            required={true}
                            name="selectEndHour"
                            component={renderSelectField}

                        //fullWidth

                        >
                            <MenuItem value="">Hour</MenuItem>
                            <MenuItem value="00">00</MenuItem>
                            <MenuItem value="01" >01</MenuItem>
                            <MenuItem value="02">02</MenuItem>
                            <MenuItem value="03">03</MenuItem>
                            <MenuItem value="04">04</MenuItem>
                            <MenuItem value="05">05</MenuItem>
                            <MenuItem value="06">06</MenuItem>
                            <MenuItem value="07">07</MenuItem>
                            <MenuItem value="08">08</MenuItem>
                            <MenuItem value="09">09</MenuItem>
                            <MenuItem value="10">10</MenuItem>
                            <MenuItem value="11">11</MenuItem>
                            <MenuItem value="12">12</MenuItem>
                            <MenuItem value="13">13</MenuItem>
                            <MenuItem value="14">14</MenuItem>
                            <MenuItem value="15">15</MenuItem>
                            <MenuItem value="16">16</MenuItem>
                            <MenuItem value="17">17</MenuItem>
                            <MenuItem value="18">18</MenuItem>
                            <MenuItem value="19">19</MenuItem>
                            <MenuItem value="20">20</MenuItem>
                            <MenuItem value="21">21</MenuItem>
                            <MenuItem value="22">22</MenuItem>
                            <MenuItem value="23">23</MenuItem>
                        </Field>

                        <InputLabel htmlFor="select-end-minute"></InputLabel>
                        <Field
                            required={true}
                            name="selectEndMinute"
                            component={renderSelectField}

                        //fullWidth
                        >
                            <MenuItem value="">Minutes</MenuItem>
                            <MenuItem value="00">00</MenuItem>
                            <MenuItem value="05" >05</MenuItem>
                            <MenuItem value="10">10</MenuItem>
                            <MenuItem value="15">15</MenuItem>
                            <MenuItem value="20">20</MenuItem>
                            <MenuItem value="25">25</MenuItem>
                            <MenuItem value="30">30</MenuItem>
                            <MenuItem value="35">35</MenuItem>
                            <MenuItem value="40">40</MenuItem>
                            <MenuItem value="45">45</MenuItem>
                            <MenuItem value="50">50</MenuItem>
                            <MenuItem value="55">55</MenuItem>
                        </Field>
                    </div></div>}

                <Field
                    name="allDay"
                    type="checkbox"
                    component={renderCheckbox}
                    label="All Day"
                    onChange={this.toggleAllDay}
                    //fullWidth
                    InputLabelProps={{ shrink: true, }}
                />

                <Field
                    name="desc"
                    type="text"
                    component={renderTextField}
                    label="Description"
                    fullWidth
                    InputLabelProps={{ shrink: true, }}
                />
                <Button type="submit" variant="contained" size="large" disabled={submitting} color="primary" className={classes.btnBlock} >{this.props.buttonText}</Button>
            </form>
            </div>
        )

    }
}


export default reduxForm({
    form: 'AddTaskForm', // a unique identifier for this form
    validate,
    asyncValidate
})(withStyles(styles)(AddTaskForm));