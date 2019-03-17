import TextField from '@material-ui/core/TextField';
import React from 'react';
import Select from '@material-ui/core/Select';
import { FormControl, InputLabel, Checkbox } from '@material-ui/core';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import DateAndTimePickers from '../DatePicker/DateAndTimePickers';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export const renderTextField = ({
  input,
  label,
  value,
  required,
  meta: { touched, error },
  ...custom
}) => (
    <div>
      <TextField
        label={label}
        error={touched && error}
        required={!required ? true : false}
        defaultValue={value}
        style={{ marginBottom: '18px' }}
        {...input}
        {...custom}
      />
      {touched && ((error && <p className="inline-error">{label} {error}</p>))}
    </div>

  )

export const renderTextFieldCustom = ({
  input,
  label,
  value,
  meta: { touched, error },
  ...custom
}) => (
    <div className="fieldWrapper">
      <TextField
        label={label}
        error={touched && error}
        required={true}
        defaultValue={value}
        style={{ marginBottom: '18px' }}
        {...input}
        {...custom}
      />
      {touched && ((error &&
        <p className="inline-error">{label} {error}</p>))}
    </div>

  )



export const renderTextArea = ({
  input,
  label,
  value,
  required,
  meta: { touched, error },
  ...custom
}) => (
    <div className="fieldWrapper">
      <TextField
        variant="outlined"
        rows="4"
        multiline
        label={label}
        error={touched && error}
        required={required ? true : false}
        // required={true}
        defaultValue={value}
        style={{ marginBottom: '18px' }}
        {...input}
        {...custom}
      />
      {touched && ((error &&
        <p className="inline-error">{label} {error}</p>))}
    </div>

  )

export const renderSelectField = ({
  input,
  label,
  value,
  id,
  htmlFor,
  name,
  meta: { touched, error },
  children,
  ...custom
}) => (
    <div>
      <InputLabel htmlFor={htmlFor}>{label}</InputLabel>
      <Select
        label={label}
        value={value}
        displayEmpty={true}
        inputProps={{
          name: name,
          id: id,
        }}
        error={touched && error}
        {...input}
        onChange={(event, index, value) => { input.onChange(event.target.value.length > 0 ? event.target.value : event.target.value = "") }}
        children={children}
        {...custom}
      />
      {touched && ((error &&
        <p style={{ marginTop: '5px' }} className="inline-error">{label} {error}</p>))}
    </div>

  )



export const renderWithNoneAsNoSelection = ({
  input,
  label,
  value,
  id,
  htmlFor,
  name,
  meta: { touched, error },
  children,
  ...custom
}) => (
    <div>
      <InputLabel htmlFor={htmlFor}>{label}</InputLabel>
      {console.log(value)}
      <Select
        label={label}
        value={value}
        displayEmpty={true}
        inputProps={{
          name: name,
          id: id,
        }}
        error={touched && error}
        {...input}
        onChange={(event, index, value) => { input.onChange(event.target.value.length > 1 ? event.target.value : event.target.value = "") }}
        children={children}
        {...custom}
      />
      {touched && ((error &&
        <p style={{ marginTop: '5px' }} className="inline-error">{label} {error}</p>))}
    </div>

  )

export const renderSelectFieldRequired = ({
  input,
  label,
  value,
  id,
  required,
  meta: { touched, error },
  children,
  ...custom
}) => (

    <FormControl required>
      <InputLabel htmlFor="age-native-required">{label}</InputLabel>
      <Select
        label={label}
        value={value}
        displayEmpty={true}
        inputProps={{
          name: 'select',
          id: 'select-role',
        }}
        error={touched && error}
        {...input}
        onChange={(event, index, value) => input.onChange(event.target.value)}
        children={children}
        {...custom}
      />

    </FormControl>



  )



export const renderSelectFieldCountry = ({
  input,
  label,
  value,
  id,
  meta: { touched, error },
  children,
  ...custom
}) => (
    <Select
      label={label}
      value={value}
      displayEmpty={true}
      inputProps={{
        name: 'select',
        id: 'select-country',
      }}
      error={touched && error}
      {...input}
      onChange={(event, index, value) => input.onChange(event.target.value)}
      children={children}
      {...custom}
    />
  )


export const renderCheckbox = ({ input, label }) => (

  <FormControlLabel
    control={
      <Checkbox
        checked={input.value}
        onCheck={input.onChange}
      />
    }
    label={label}
    {...input}

  />
)

const adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);

export const FileInput = ({
  input: { value: omitValue, onChange, onBlur, ...inputProps },
  meta: omitMeta,
  ...props
}) => {
  return (
    <input
      onChange={adaptFileEventToValue(onChange)}
      onBlur={adaptFileEventToValue(onBlur)}
      type="file"
      inputProps={{
        name: 'fileUpload',
        id: 'file-upload',
      }}
      {...props.input}
      {...props}
    />
  );
};


