import React from "react";
import { Input, Button, InputNumber, message } from 'antd';
import "./MainForm.css";
import { Field, reduxForm, InjectedFormProps, WrappedFieldProps, WrappedFieldMetaProps } from 'redux-form'
import { acceptOnlyNumber, maxFileSize, numberRange, required } from "./validations";


const errorMessage = (meta: WrappedFieldMetaProps): JSX.Element | null => {
  return (meta && meta.invalid && meta.error && meta.touched && <span className="error-message">{meta.error}</span>)
}

// Custom inputs for styling purposes
const renderNameInput = (props: WrappedFieldProps & WrappedFieldMetaProps): JSX.Element => {
  return (
    <div>
      <Input size="large" {...props.input } status={props.meta.error && props.meta.touched ? "error" : ''} maxLength={100}/>
      {errorMessage(props.meta)}
    </div>
  )
}
const renderHeightInput = (props: WrappedFieldProps & WrappedFieldMetaProps): JSX.Element => {
  return (<div>
    <InputNumber size="large" {...props.input } max={500} min={0} style={{ width: '100%' }} status={props.meta.error && props.meta.touched ? "error" : ''}/>
    {errorMessage(props.meta)}
  </div>
  )
}

const renderFileUpload = (props: WrappedFieldProps & WrappedFieldMetaProps): JSX.Element => {
  return (<div>
    <input type="file" onChange={(e) => {
      e.preventDefault()
      props.input.onChange(e.target.files![0].name)
    }}/>
  </div>
  )
}

  // values is actually typed as any o_0
  // https://github.com/DefinitelyTyped/DefinitelyTyped/blob/9ce52af612e29ff0bac4317bde78d0acab29afdb/types/redux-form/v6/lib/Form.d.ts#L5
  const onSubmit = (values: any) => {
    const fileInput: HTMLInputElement | null = document.querySelector('input[type=file]')
    const file = fileInput?.files?.[0]

    const notValidFile = maxFileSize(file)
    if (notValidFile) {
      message.error(notValidFile)
      return
    }
  }

const MainForm: React.FC = (props) => {
  const { handleSubmit, valid } = props as InjectedFormProps

  return (
    <form onSubmit={handleSubmit}>
      <div className="main-form-wrapper">
        <div className="main-form">
          <div className="main-form-inputs">
            <div className="name-input input-item">
              <label htmlFor="name" >Name <span className="required-star">*</span></label>
              <Field name="name" component={renderNameInput} type="text" validate={required}/>
            </div>
            <div className="height-input input-item">
              <label htmlFor="height" >Height <span className="required-star">*</span></label>
              <Field name="height" component={renderHeightInput} type="number" validate={[required, acceptOnlyNumber, numberRange]}/>
            </div>
          </div>
          <div className="main-form-file-upload">
          <Field name="file" component={renderFileUpload} type="file" validate={[required]}/>
          </div>
        </div>
        <Button type="primary" block htmlType="submit" disabled={!valid}>
          Submit
        </Button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'filedata',
  onSubmit,
})(MainForm)