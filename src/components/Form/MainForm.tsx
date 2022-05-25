import React, { useState } from "react";
import { Input, Button } from 'antd';
import "./MainForm.css";
import FileUpload from "../FileUpload/FileUpload";

const MainForm: React.FC = () => {
  const [name] = useState("")
  const [height] = useState("")

  return (
    <div className="main-form-wrapper">
      <div className="main-form">
        <div className="main-form-inputs">
          <div className="name-input input-item">
            <label htmlFor="name" >Name <span className="required-star">*</span></label>
            <Input size="large" value={name}/>
          </div>
          <div className="height-input input-item">
            <label htmlFor="name" >Height <span className="required-star">*</span></label>
            <Input size="large" value={height}/>
          </div>
        </div>
        <div className="main-form-file-upload">
          <FileUpload />
        </div>
      </div>
      <Button type="primary" block>
        Submit
      </Button>
    </div>
  );
}

export default MainForm;