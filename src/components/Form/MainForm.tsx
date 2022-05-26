import React from "react";
import { Input, Button, InputNumber, message } from 'antd';
import "./MainForm.css";
import { Field, reduxForm, InjectedFormProps, WrappedFieldProps, WrappedFieldMetaProps, reset } from 'redux-form'
import { acceptOnlyNumber, maxFileSize, numberRange, required } from "./validations";
import { getUploadedFiles, IUploadIdPayload, uploadFile } from "../../services/api";
import { store } from "../../state/store";
import { setItems } from "../../state/reducers/tableReducer";


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
    }} />
  </div>
  )
}

const resetForm = (fileInput: HTMLInputElement) => {
  store.dispatch(reset("filedata"))
  fileInput!.value = ''
}

const onSubmit = async (values: IUploadIdPayload & { uploadFle: string }): Promise<void> => {
  const fileInput: HTMLInputElement = document.querySelector('input[type=file]')!
  const file = fileInput!.files![0]
  let formData = new FormData();
  formData.append("file", file)

  const notValidFile = maxFileSize(file)
  if (notValidFile) {
    message.error(notValidFile)
    return
  }

  await uploadFile({name: values.name, height: +values.height }, formData)
  message.success('File is uploaded successfully!')

  const newItems = await getUploadedFiles()
  store.dispatch(setItems(newItems))

  resetForm(fileInput)
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
          <Field name="uploadFle" component={renderFileUpload} type="file" validate={[required]}/>
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