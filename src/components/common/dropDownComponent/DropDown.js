import React from "react";
import './DropDown.css';

const Dropdown = ({ label, value, options, onChange }) => {
    return (
        <label className="label-font">
            {label}
            <br/>
            <select className="dropdown-test" value={value} onChange={onChange}>
                <option>Select...</option>
                {options.map((option) => (
                    <option value={option.value}>{option.label}</option>
                ))}
            </select>
        </label>
    );
};

export default Dropdown;