import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "../common/dropDownComponent/DropDown";
import "./PreChatForm.css";

const PreChatForm = () => {

    const helpForDropDownOptions = [
        { label: 'Myself', value: 'Myself' },
        { label: 'Family Member', value: 'Family Member' }
    ];
    const reasonForHelpDropDownOptions = [
        { label: 'Getting started with home delivery', value: 'Getting started with home delivery' },
        { label: 'Medication coverage and pricing', value: 'Medication coverage and pricing' },
        { label: 'My Prescriptions', value: 'My Prescriptions' },
        { label: 'My Account', value: 'My Account' },
        { label: 'Other Account', value: 'Other Account' }
    ];
    const moreDetailsDropDownOptions = [
        { label: 'Mailing Address/Fax Number', value: 'Mailing Address/Fax Number' },
        { label: 'Other', value: 'Other' }
    ];

    const [helpForValue, setHelpForValue] = useState('');
    const [reasonForHelpValue, setReasonForHelpValue] = useState('');
    const [moreDetailsValue, setMoreDetailsValue] = useState('');
    const navigate = useNavigate();

    const handleHelpForValueChange = (event) => {
        setHelpForValue(event.target.value);
    };
    const handleReasonForHelpChange = (event) => {
        setReasonForHelpValue(event.target.value);
    };
    const handleMoreDetailsValueChange = (event) => {
        setMoreDetailsValue(event.target.value);
    };
    const handleOnClick = () => {
        navigate("/chat");
    }

    return (
        <div className="chat-app">
            <div className="chat-window">
                <div className="messages">
                    <Dropdown
                        label="Who are you getting help for?"
                        options={helpForDropDownOptions}
                        value={helpForValue}
                        onChange={handleHelpForValueChange}
                    />
                    <Dropdown
                        label="What can we help with you?"
                        options={reasonForHelpDropDownOptions}
                        value={reasonForHelpValue}
                        onChange={handleReasonForHelpChange}
                    />
                    <Dropdown
                        label="Tell us a little more"
                        options={moreDetailsDropDownOptions}
                        value={moreDetailsValue}
                        onChange={handleMoreDetailsValueChange}
                    />
                    <div className="start-chat-button">
                        <button onClick={handleOnClick}>
                            Start Chat
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreChatForm;