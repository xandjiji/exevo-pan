import React from 'react';
import LabeledText from './LabeledText.styled';
import Warning from '../../assets/warning.png';

export default ({ children, label, warning, warningText }) => {
    return (
        <LabeledText warning={warning}>
            <span className="label">{label} {warning ? <img src={Warning} alt="Warning" title={warningText} /> : null}</span>
            {children}
        </LabeledText>
    )
}