import React from 'react';
import FilterGroup from './FilterGroup.styled';

export default ({ title, display, children }) => {
    return (
        <FilterGroup display={display}>
            {title ? <span>{title}</span> : null}
            {children}
        </FilterGroup>
    )
}