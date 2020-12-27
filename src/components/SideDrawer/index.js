import React from 'react';
import SideDrawer from './SideDrawer.styled';
import FilterGroup from '../FilterGroup';
import Tag from '../Tag';
import AutocompleteInput from '../AutocompleteInput';

import ArrowIcon from '../../assets/svgs/arrowBack.svg';

import ServerNames from '../../../serverNames.json';

export default ({ backAction }) => {
    return (
        <SideDrawer className="shadow">
            <div className="drawer-header inner-container shadow">
                <ArrowIcon className="clickable" onClick={backAction} />
                Filters
            </div>

            <div className="items-wrapper inner-container">

                <FilterGroup title="Vocation">
                    <Tag clickable>Knight</Tag>
                    <Tag clickable>Paladin</Tag>
                    <Tag clickable>Sorcerer</Tag>
                    <Tag clickable>Druid</Tag>
                </FilterGroup>

                <FilterGroup title="PvP">
                    <Tag clickable>Optional</Tag>
                    <Tag clickable>Open</Tag>
                    <Tag clickable>Hardcore</Tag>
                    <Tag clickable>Retro</Tag>
                    <Tag clickable>Retro Hardcore</Tag>
                </FilterGroup>

                <FilterGroup title="BattlEye">
                    <Tag clickable>Green</Tag>
                    <Tag clickable>Yellow</Tag>
                </FilterGroup>

                <FilterGroup title="Server">
                    <AutocompleteInput items={ServerNames} placeholder="Choose a server" />
                </FilterGroup>

            </div>
        </SideDrawer>
    )
}