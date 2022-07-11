import React from "react";
import './form-input-text.styles.css';

const FormInputContainer = (props) => {
    return (
        <input
            className="form-input" 
            id={props.id} 
            type={props.type ? props.type : 'text'} 
            required={props.required} 
            onInput={props.handleInput}
            placeholder={props.placeholder ? props.placeholder : ''}
            step="any"
        />
    );
};

export default FormInputContainer;