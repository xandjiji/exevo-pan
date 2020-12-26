import React from 'react';
import FilterGroup from './FilterGroup.styled';

export default ({ title, children }) => {
    return (
        <FilterGroup>
            <span>{title}</span>
            {children}
        </FilterGroup>
    )
}