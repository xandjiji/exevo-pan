import React, { memo } from 'react';
import InformationBadge from './InformationBadge.styled';

export default memo(({ icon, text, color }) => {
    return (
        <InformationBadge color={color}>
            {icon}
            {text ? <div className="shadow">{text}</div> : null}
        </InformationBadge>
    )
});