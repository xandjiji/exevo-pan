import React from 'react';
import SideDrawer from './SideDrawer.styled';
import FilterGroup from '../FilterGroup';
import Tag from '../Tag';

import ArrowIcon from '../../assets/svgs/arrowBack.svg';

export default ({ backAction }) => {
    return (
        <SideDrawer className="shadow">
            <div className="drawer-header inner-container shadow">
                <ArrowIcon className="clickable" onClick={backAction} />
                Filters
            </div>

            <div className="items-wrapper inner-container">

                <FilterGroup title="Vocation">
                    <Tag>Knight</Tag>
                    <Tag>Paladin</Tag>
                    <Tag>Sorcerer</Tag>
                    <Tag>Druid</Tag>
                </FilterGroup>

                <FilterGroup title="PvP">
                    <Tag>Optional</Tag>
                    <Tag>Open</Tag>
                    <Tag>Hardcore</Tag>
                    <Tag>Retro</Tag>
                    <Tag>Retro Hardcore</Tag>
                </FilterGroup>

                <FilterGroup title="BattlEye">
                    <Tag>Green</Tag>
                    <Tag>Yellow</Tag>
                </FilterGroup>
            </div>
        </SideDrawer>
    )
}