import React from 'react';
import FilterGroup from './FilterGroup.styled';

export default ({ title, children }) => {
    return (
        <FilterGroup>
            {title ? <span>{title}</span> : null}
            {children}
        </FilterGroup>
    )
}