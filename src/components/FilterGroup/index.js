import React, { memo } from 'react';
import FilterGroup from './FilterGroup.styled';

export default memo(({ className, title, display, badge, children }) => {
    return (
        <FilterGroup className={className} display={display}>
            {title ?
                <span>{title} {badge ? badge : null}</span>
                :
                null}
            {children}
        </FilterGroup>
    )
})