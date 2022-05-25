import React from "react";
import { Input, Button, InputNumber } from 'antd';
import "./MainForm.css";
import FileUpload from "../FileUpload/FileUpload";
import { Field, reduxForm, InjectedFormProps, WrappedFieldProps, WrappedFieldMetaProps } from 'redux-form'


const errorMessage = (meta: WrappedFieldMetaProps): JSX.Element | null => {
  return (meta.error && meta.touched ? <span className="error-message">{meta.error}</span> : null)
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
    <FileUpload />
    {errorMessage(props.meta)}
  </div>
  )
}

// values is actually typed as any o_0
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/9ce52af612e29ff0bac4317bde78d0acab29afdb/types/redux-form/v6/lib/Form.d.ts#L5
const onSubmit = (values: any) => {
  console.log(values);
}

// Validations
const required = (v: any): string | undefined => {
  if (!v) return 'This field is required'

  return undefined
}

const acceptOnlyNumber = (v: any): string | undefined => {
  if (isNaN(v)) return 'Value should be a valid number'

  return undefined
}


const numberRange = (v: any): string | undefined => {
  if (v && v > 500) return 'Value cant be more than 500'
  if (v && v < 0) return 'Value cant be less than 0'

  return undefined
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
          <Field name="name" component={renderFileUpload} type="file"/>
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
  // a unique name for the form
  form: 'filedata',
  onSubmit
})(MainForm)

// const MainForm: React.FC = () => {
//   const [name, setName] = useState("")
//   const [height, setHeight] = useState(0)



  // return (

  // );
// }