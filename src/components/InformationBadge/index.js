import React, { memo } from 'react';
import InformationBadge from './InformationBadge.styled';

const positioning = {
    top: 'bottom',
    bottom: 'top'
}

export default memo(({ className, icon, text, color, position = 'top' }) => {
    return (
        <InformationBadge className={`information-badge ${className}`} color={color} position={positioning[position]}>
            {icon}
            {text ? <div className="shadow">{text}</div> : null}
        </InformationBadge>
    )
});