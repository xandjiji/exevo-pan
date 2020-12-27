import React from 'react';
import SideDrawer from './SideDrawer.styled';
import FilterGroup from '../FilterGroup';
import Tag from '../Tag';
import AutocompleteInput from '../AutocompleteInput';
import RangeSlider from '../RangeSlider';

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

                <FilterGroup title="Vocation" display="flex">
                    <Tag clickable>Knight</Tag>
                    <Tag clickable>Paladin</Tag>
                    <Tag clickable>Sorcerer</Tag>
                    <Tag clickable>Druid</Tag>
                </FilterGroup>

                <FilterGroup title="PvP" display="flex">
                    <Tag clickable>Optional</Tag>
                    <Tag clickable>Open</Tag>
                    <Tag clickable>Hardcore</Tag>
                    <Tag clickable>Retro</Tag>
                    <Tag clickable>Retro Hardcore</Tag>
                </FilterGroup>

                <FilterGroup title="BattlEye" display="flex">
                    <Tag clickable>Green</Tag>
                    <Tag clickable>Yellow</Tag>
                </FilterGroup>

                <FilterGroup title="Server" display="flex">
                    <AutocompleteInput items={ServerNames} placeholder="Choose a server" />
                </FilterGroup>

                <FilterGroup title="Level" display="flex">
                    <RangeSlider initialValue={2} min={2} max={1000} />
                </FilterGroup>

                <FilterGroup title="Skill" display="block">
                    <RangeSlider initialValue={10} min={10} max={130} />

                    <div className="skills-wrapper">
                        <Tag clickable>Magic</Tag>
                        <Tag clickable>Distance</Tag>
                        <Tag clickable>Club</Tag>
                        <Tag clickable>Sword</Tag>
                        <Tag clickable>Axe</Tag>
                        <Tag clickable>All meelee</Tag>
                    </div>
                </FilterGroup>
            </div>
        </SideDrawer>
    )
}