import React, { memo }  from 'react';
import FilterGroup from './FilterGroup.styled';

export default memo(({ title, display, children }) => {
    return (
        <FilterGroup display={display}>
            {title ? <span>{title}</span> : null}
            {children}
        </FilterGroup>
    )
})