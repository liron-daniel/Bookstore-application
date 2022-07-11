import React from "react";
import './form-input-container.styles.css';

import FormLabel from "../form-label/FormLabel.component.jsx";
import FormInputText from "../form-input-text/FormInputText.component.jsx";

const FormInputContainer = (props) => {
    return (
        <div className="form-input-container">
            <FormLabel htmlFor={props.id} text={props.labelText}/>

            <FormInputText id={props.id} type={props.type} require={props.required} handleInput={props.handleInput} placeholder={props.placeholder}/>

            {!props.isValid && <div className="error-message">{props.errorMessage}</div>}
        </div>
    );
};

export default FormInputContainer;