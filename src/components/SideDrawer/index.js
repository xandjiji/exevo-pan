import React, { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import { Route, useHistory } from 'react-router-dom';
import SideDrawer from './SideDrawer.styled';
import FilterGroup from '../FilterGroup';
import { Chip, SliderInput, RangeSliderInput } from 'components/Atoms';
import { Tooltip } from 'components/Organisms';
import AutocompleteInput from '../AutocompleteInput';
import DrawerFooter from '../DrawerFooter';

import { ReactComponent as ArrowIcon } from '../../assets/svgs/arrowBack.svg';
import { ReactComponent as ResetIcon } from '../../assets/svgs/reset.svg';

import Rook from '../../assets/rook.png'
import Knight from '../../assets/knight.png'
import Paladin from '../../assets/paladin.png'
import Sorcerer from '../../assets/sorcerer.png'
import Druid from '../../assets/druid.png'
import Magic from '../../assets/magic.png';
import Distance from '../../assets/distance.png';
import Club from '../../assets/club.png';
import Sword from '../../assets/sword.png';
import Axe from '../../assets/axe.png';
import Dove from '../../assets/dove.png';
import OrangeSkull from '../../assets/orangeSkull.png';
import WhiteSkull from '../../assets/whiteSkull.png';
import RedSkull from '../../assets/redSkull.png';
import BlackSkull from '../../assets/blackSkull.png';
import BrFlag from '../../assets/br-flag.png';
import EuFlag from '../../assets/eu-flag.png';
import NaFlag from '../../assets/na-flag.png';

import UrlParametersContext from '../../contexts/UrlParameters/context';
import SideDrawerContext from '../../contexts/SideDrawer/context';
import ServerDataContext from '../../contexts/ServerData/context';
import ItemsDataContext from '../../contexts/ItemsData/context';

const resetedFilterState = {
    nicknameFilter: '',
    vocation: new Set([]),
    pvp: new Set([]),
    battleye: new Set([]),
    location: new Set([]),
    serverSet: new Set([]),
    minLevel: 8,
    maxLevel: 2000,
    minSkill: 10,
    skillKey: new Set([]),
    itemSet: new Set([]),
    fav: false,
    rareNick: false,
    soulwarFilter: false,
    imbuementsSet: new Set([])
};

export default ({ backAction, initialCharacterData, dispatchCharacterData }) => {
    const history = useHistory();

    const { params, setParamByKey, resetParams } = useContext(UrlParametersContext);
    const { active } = useContext(SideDrawerContext);
    const { serverData, indexedServerData } = useContext(ServerDataContext);
    const { itemData } = useContext(ItemsDataContext);

    const serverNamesArray = useMemo(() => Object.keys(serverData), [serverData]);
    const itemNamesArray = useMemo(() => Object.keys(itemData), [itemData]);

    const initialFilterState = {
        nicknameFilter: params.nicknameFilter || '',
        vocation: params.vocation || new Set([]),
        pvp: params.pvp || new Set([]),
        battleye: params.battleye || new Set([]),
        location: params.location || new Set([]),
        serverSet: params.serverSet || new Set([]),
        minLevel: params.minLevel || 8,
        maxLevel: params.maxLevel || 2000,
        minSkill: params.minSkill || 10,
        skillKey: params.skillKey || new Set([]),
        itemSet: params.itemSet || new Set([]),
        fav: params.fav || false,
        rareNick: params.rareNick || false,
        soulwarFilter: params.soulwarFilter || false,
        imbuementsSet: params.imbuementsSet || new Set([])
    }

    const [filters, setFilters] = useState(initialFilterState);
    const [interacted, setInteracted] = useState(false);

    useEffect(() => {
        const { search, pathname } = window.location;
        const params = new URLSearchParams(search);

        for (const key in filters) {
            const value = filters[key];
            const defaultValue = resetedFilterState[key];
            if (defaultValue === value || (defaultValue.size === value.size && typeof defaultValue === 'object')) {
                params.delete(key);
                continue;
            }

            if (typeof value === 'object') {
                const setArray = Array.from(value);
                params.set(key, setArray.join(','));
            } else {
                params.set(key, value);
            }
        }

        history.replace(`${pathname}?${params.toString()}`);
    }, [filters, history]);

    const updateFilterValue = useCallback((key, value) => {
        setFilters(prevFilters => {
            return { ...prevFilters, [key]: value };
        });
        setParamByKey(key, value);
    }, [setParamByKey]);

    const toggleFilterValue = useCallback((key) => {
        setFilters(prevFilters => {
            setParamByKey(key, !prevFilters[key]);
            return { ...prevFilters, [key]: !prevFilters[key] }
        });
    }, [setParamByKey]);

    const toggleInFilterSet = useCallback((key, value) => {
        if (filters[key].has(value)) {
            filters[key].delete(value);
        } else {
            filters[key].add(value);
        }

        setFilters({
            ...filters,
            [key]: filters[key]
        });
        setParamByKey(key, filters[key]);
    }, [filters, setParamByKey]);

    const addToFilterSet = useCallback((key, value) => {
        setFilters(prevFilters => {
            prevFilters[key].add(value);
            return {
                ...prevFilters,
                [key]: prevFilters[key]
            }
        })

        const addedValue = filters[key].add(value);
        setParamByKey(key, addedValue);
    }, [setParamByKey, filters]);

    const deleteFromFilterSet = useCallback((key, value) => {
        setFilters(prevFilters => {
            prevFilters[key].delete(value);
            return {
                ...prevFilters,
                [key]: prevFilters[key]
            }
        })

        const deletedValue = filters[key].delete(value);
        setParamByKey(key, deletedValue);
    }, [setParamByKey, filters]);

    const onAutocompleteChange = useCallback((key, value, object) => {
        if (objectHasKeys(object, value)) {
            addToFilterSet(key, value);
        }
    }, [addToFilterSet]);


    useEffect(() => {
        if (active) setParamByKey('pageIndex', 0);
        dispatchCharacterData({
            type: 'APPLY_FILTERS',
            filterState: filters,
            initialData: {
                initialCharacterData,
                itemData,
                indexedServerData
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters, initialCharacterData, setParamByKey]);

    const isAllItemsSelected = useCallback(() => {
        if (filters.itemSet.size === itemNamesArray.length) {
            return true;
        } else {
            return false;
        }
    }, [filters, itemNamesArray]);

    const handleAllItemsToggle = useCallback(() => {
        if (isAllItemsSelected()) {
            updateFilterValue('itemSet', new Set([]));
        } else {
            updateFilterValue('itemSet', new Set(itemNamesArray));
        }
    }, [isAllItemsSelected, updateFilterValue, itemNamesArray]);

    const isAllImbuementsSelected = useCallback(() => {
        if (filters.imbuementsSet.size === imbuementsArray.length) {
            return true;
        } else {
            return false;
        }
    }, [filters]);

    const handleAllImbuementsToggle = useCallback(() => {
        if (isAllImbuementsSelected()) {
            updateFilterValue('imbuementsSet', new Set([]));
        } else {
            updateFilterValue('imbuementsSet', new Set(imbuementsArray));
        }
    }, [isAllImbuementsSelected, updateFilterValue]);

    const filterIsReset = useCallback(() => {
        const {
            nicknameFilter,
            vocation,
            pvp,
            battleye,
            location,
            serverSet,
            itemSet,
            minLevel,
            maxLevel,
            minSkill,
            skillKey,
            fav,
            rareNick,
            imbuementsSet
        } = filters;


        if (nicknameFilter !== '') return false;
        if (vocation.size) return false;
        if (pvp.size) return false;
        if (battleye.size) return false;
        if (location.size) return false;
        if (serverSet.size) return false;
        if (skillKey.size) return false;
        if (itemSet.size) return false;
        if (minLevel !== 8) return false;
        if (maxLevel !== 2000) return false;
        if (minSkill !== 10) return false;
        if (fav) return false;
        if (rareNick) return false;
        if (imbuementsSet.size) return false;

        return true;
    }, [filters]);

    useEffect(() => {
        if (filterIsReset()) {
            setInteracted(false);
        } else {
            setInteracted(true);
        }
    }, [filters, filterIsReset]);

    return (
        <SideDrawer className="shadow">
            <div className="drawer-header inner-container shadow">
                <div className="icon-group">
                    <ArrowIcon className="clickable" onClick={backAction} />
                    Filters
                </div>
                <div
                    className={`icon-group reset-group clickable ${interacted ? 'active' : ''}`}
                    onClick={() => {
                        setFilters({
                            nicknameFilter: '',
                            vocation: new Set([]),
                            pvp: new Set([]),
                            battleye: new Set([]),
                            location: new Set([]),
                            serverSet: new Set([]),
                            minLevel: 8,
                            maxLevel: 2000,
                            minSkill: 10,
                            skillKey: new Set([]),
                            itemSet: new Set([]),
                            fav: false,
                            rareNick: false,
                            soulwarFilter: false,
                            imbuementsSet: new Set([])
                        });

                        resetParams();
                    }}
                >
                    <span>reset filters</span>
                    <ResetIcon />
                </div>
            </div>

            <div className="items-wrapper inner-container custom-scrollbar">
                <FilterGroup
                    className="nickname-wrapper"
                    title="Search nickname"
                    display="flex"
                    badge={
                        <Tooltip
                            placement="top"
                            content="Regex is enabled! Example: ['-.,]"
                        >
                            <span className="exclamation-icon">!</span>
                        </Tooltip>
                    }
                >
                    <label htmlFor="Nickname-input" className="invisible-label">Nickname</label>
                    <AutocompleteInput
                        initialValue={params.nicknameFilter}
                        labelFor="Nickname-input"
                        placeholder="Nickname"
                        onChange={useCallback((value) => updateFilterValue('nicknameFilter', value), [updateFilterValue])}
                        clearInput={filters.nicknameFilter === ''}
                    />
                </FilterGroup>
                <FilterGroup title="Vocation" display="flex">
                    <Chip
                        onClick={useCallback(() => toggleInFilterSet('vocation', 0), [toggleInFilterSet])}
                        overrideStatus={filters.vocation.has(0)}
                    >
                        <img className="chip-icon" src={Rook} alt="None" title="None" width={12} height={12} />
                        None
                    </Chip>
                    <Chip
                        onClick={useCallback(() => toggleInFilterSet('vocation', 1), [toggleInFilterSet])}
                        overrideStatus={filters.vocation.has(1)}
                    >
                        <img className="chip-icon" src={Knight} alt="Knight" title="Knight" width={14} height={14} />
                        Knight
                    </Chip>
                    <Chip
                        onClick={useCallback(() => toggleInFilterSet('vocation', 2), [toggleInFilterSet])}
                        overrideStatus={filters.vocation.has(2)}
                    >
                        <img className="chip-icon" src={Paladin} alt="Paladin" title="Paladin" width={16} height={16} />
                        Paladin
                    </Chip>
                    <Chip
                        onClick={useCallback(() => toggleInFilterSet('vocation', 3), [toggleInFilterSet])}
                        overrideStatus={filters.vocation.has(3)}
                    >
                        <img className="chip-icon" src={Sorcerer} alt="Sorcerer" title="Sorcerer" width={14} height={14} />
                        Sorcerer
                    </Chip>
                    <Chip
                        onClick={useCallback(() => toggleInFilterSet('vocation', 4), [toggleInFilterSet])}
                        overrideStatus={filters.vocation.has(4)}
                    >
                        <img className="chip-icon" src={Druid} alt="Druid" title="Druid" width={12} height={14} />
                        Druid
                    </Chip>
                </FilterGroup>

                <FilterGroup title="PvP" display="flex">
                    <Chip
                        onClick={useCallback(() => toggleInFilterSet('pvp', 0), [toggleInFilterSet])}
                        overrideStatus={filters.pvp.has(0)}
                    >
                        <img className="chip-icon" src={Dove} alt="Optional PvP" title="Optional PvP" width={9} height={9} />
                        Optional
                    </Chip>
                    <Chip
                        onClick={useCallback(() => toggleInFilterSet('pvp', 1), [toggleInFilterSet])}
                        overrideStatus={filters.pvp.has(1)}
                    >
                        <img className="chip-icon" src={WhiteSkull} alt="Open PvP" title="Open PvP" width={11} height={11} />
                        Open
                    </Chip>
                    <Chip
                        onClick={useCallback(() => toggleInFilterSet('pvp', 2), [toggleInFilterSet])}
                        overrideStatus={filters.pvp.has(2)}
                    >
                        <img className="chip-icon" src={OrangeSkull} alt="Retro Open PvP" title="Retro Open PvP" width={11} height={11} />
                        Retro Open
                    </Chip>
                    <Chip
                        onClick={useCallback(() => toggleInFilterSet('pvp', 3), [toggleInFilterSet])}
                        overrideStatus={filters.pvp.has(3)}
                    >
                        <img className="chip-icon" src={RedSkull} alt="Hardcore PvP" title="Hardcore PvP" width={11} height={11} />
                        Hardcore
                    </Chip>
                    <Chip
                        onClick={useCallback(() => toggleInFilterSet('pvp', 4), [toggleInFilterSet])}
                        overrideStatus={filters.pvp.has(4)}
                    >
                        <img className="chip-icon" src={BlackSkull} alt="Retro Hardcore PvP" title="Retro Hardcore PvP" width={11} height={11} />
                        Retro Hardcore
                    </Chip>
                </FilterGroup>

                <FilterGroup className="battleye-wrapper" title="BattlEye" display="flex">
                    <Chip
                        onClick={useCallback(() => toggleInFilterSet('battleye', true), [toggleInFilterSet])}
                        overrideStatus={filters.battleye.has(true)}
                    >
                        <span
                            className="battleye-icon"
                            style={{ backgroundColor: `var(--battleGreen)` }}
                        >
                        </span>
                        Green
                    </Chip>
                    <Chip
                        onClick={useCallback(() => toggleInFilterSet('battleye', false), [toggleInFilterSet])}
                        overrideStatus={filters.battleye.has(false)}
                    >
                        <span
                            className="battleye-icon"
                            style={{ backgroundColor: `var(--battleYellow)` }}
                        >
                        </span>
                        Yellow
                    </Chip>
                </FilterGroup>

                <FilterGroup title="Server location" display="flex">
                    <Chip
                        onClick={useCallback(() => toggleInFilterSet('location', 0), [toggleInFilterSet])}
                        overrideStatus={filters.location.has(0)}
                    >
                        <img className="flag chip-icon" alt="Europe" title="Europe" src={EuFlag} width={16} height={10} />
                        EU
                    </Chip>
                    <Chip
                        onClick={useCallback(() => toggleInFilterSet('location', 1), [toggleInFilterSet])}
                        overrideStatus={filters.location.has(1)}
                    >
                        <img className="flag chip-icon" alt="North America" title="North America" src={NaFlag} width={16} height={10} />
                        NA
                    </Chip>
                    <Chip
                        onClick={useCallback(() => toggleInFilterSet('location', 2), [toggleInFilterSet])}
                        overrideStatus={filters.location.has(2)}
                    >
                        <img className="flag chip-icon" alt="Brazil" title="Brazil" src={BrFlag} width={16} height={10} />
                        BR
                    </Chip>
                </FilterGroup>

                <FilterGroup title="Server" display="flex">
                    <label htmlFor="Server-input" className="invisible-label">Server</label>
                    <AutocompleteInput
                        labelFor="Server-input"
                        placeholder="Choose a server"
                        clearAfterSucessful
                        items={allItemsNotInSet(serverNamesArray, filters.serverSet)}
                        onChange={useCallback((value) => onAutocompleteChange('serverSet', value, serverData), [onAutocompleteChange, serverData])}
                    />

                    <div className="chips-wrapper">
                        {[...filters.serverSet].map((serverName, index) =>
                            <Chip
                                key={index}
                                onClose={() => deleteFromFilterSet('serverSet', serverName)}>
                                {serverName}
                            </Chip>
                        )}
                    </div>
                </FilterGroup>

                <FilterGroup title="Level" display="flex">
                    <label htmlFor="Level-input" className="invisible-label">Level</label>
                    <label htmlFor="Level-counter" className="invisible-label">Level value</label>
                    <RangeSliderInput
                        min={8}
                        max={2000}
                        value={[filters.minLevel, filters.maxLevel]}
                        onChange={useCallback((values) => {
                            const [newMin, newMax] = values;
                            updateFilterValue('minLevel', parseInt(newMin, 10))
                            updateFilterValue('maxLevel', parseInt(newMax, 10))
                        }, [updateFilterValue])}
                    />
                </FilterGroup>

                <FilterGroup title="Skill" display="block">
                    <label htmlFor="Skill-input" className="invisible-label">Skill</label>
                    <label htmlFor="Skill-counter" className="invisible-label">Skill value</label>
                    <SliderInput
                        min={10}
                        max={130}
                        value={filters.minSkill}
                        onChange={useCallback((event) => updateFilterValue('minSkill', parseInt(event.target.value, 10)), [updateFilterValue])}
                    />

                    <div className="skills-wrapper">
                        <Chip
                            onClick={useCallback(() => toggleInFilterSet('skillKey', 'magic'), [toggleInFilterSet])}
                            overrideStatus={filters.skillKey.has('magic')}
                        >
                            <img className="chip-icon" src={Magic} alt="Magic Level" title="Magic Level" width={9} height={9} />
                            Magic
                        </Chip>
                        <Chip
                            onClick={useCallback(() => toggleInFilterSet('skillKey', 'distance'), [toggleInFilterSet])}
                            overrideStatus={filters.skillKey.has('distance')}
                        >
                            <img className="chip-icon" src={Distance} alt="Distance fighting" title="Distance fighting" width={9} height={9} />
                            Distance
                        </Chip>
                        <Chip
                            onClick={useCallback(() => toggleInFilterSet('skillKey', 'club'), [toggleInFilterSet])}
                            overrideStatus={filters.skillKey.has('club')}
                        >
                            <img className="chip-icon" src={Club} alt="Club fighting" title="Club fighting" width={9} height={9} />
                            Club
                        </Chip>
                        <Chip
                            onClick={useCallback(() => toggleInFilterSet('skillKey', 'sword'), [toggleInFilterSet])}
                            overrideStatus={filters.skillKey.has('sword')}
                        >
                            <img className="chip-icon" src={Sword} alt="Sword fighting" title="Sword fighting" width={9} height={9} />
                            Sword
                        </Chip>
                        <Chip
                            onClick={useCallback(() => toggleInFilterSet('skillKey', 'axe'), [toggleInFilterSet])}
                            overrideStatus={filters.skillKey.has('axe')}
                        >
                            <img className="chip-icon" src={Axe} alt="Axe fighting" title="Axe fighting" width={9} height={9} />
                            Axe
                        </Chip>
                    </div>
                </FilterGroup>

                <FilterGroup
                    className="imbuements-wrapper"
                    title="Imbuements"
                    display="flex"
                >
                    <label htmlFor="Imbuements-input" className="invisible-label">Imbuements</label>
                    <AutocompleteInput
                        labelFor="Imbuements-input"
                        placeholder="Select imbuements"
                        clearAfterSucessful
                        items={allItemsNotInSet(imbuementsArray, filters.imbuementsSet)}
                        onChange={useCallback((value) => onAutocompleteChange('imbuementsSet', value, imbuementObject), [onAutocompleteChange])}
                    />

                    <Chip
                        overrideStatus={isAllImbuementsSelected() ? true : false}
                        onClick={handleAllImbuementsToggle}>
                        All imbuements
                    </Chip>

                    <div className="chips-wrapper">
                        {[...filters.imbuementsSet].map((imbuement, index) =>
                            <Chip
                                key={index}
                                onClose={() => deleteFromFilterSet('imbuementsSet', imbuement)}>
                                {imbuement}
                            </Chip>
                        )}
                    </div>
                </FilterGroup>


                <Route exact path="/">
                    <FilterGroup
                        className="rare-items-wrapper"
                        title="Rare items"
                        display="flex"
                        badge={
                            <Tooltip
                                placement="top"
                                content="If a rare item is not on this list it means that there are no auctions available with it."
                            >
                                <span className="exclamation-icon">!</span>
                            </Tooltip>
                        }
                    >
                        <label htmlFor="Items-input" className="invisible-label">Items</label>
                        <AutocompleteInput
                            labelFor="Items-input"
                            placeholder="Choose an item"
                            clearAfterSucessful
                            items={allItemsNotInSet(itemNamesArray, filters.itemSet)}
                            onChange={useCallback((value) => onAutocompleteChange('itemSet', value, itemData), [onAutocompleteChange, itemData])}
                        />

                        <Chip
                            overrideStatus={isAllItemsSelected() ? true : false}
                            onClick={handleAllItemsToggle}>
                            All items
                        </Chip>

                        <div className="chips-wrapper">
                            {[...filters.itemSet].map((itemName, index) =>
                                <Chip
                                    key={index}
                                    onClose={() => deleteFromFilterSet('itemSet', itemName)}>
                                    {itemName}
                                </Chip>
                            )}
                        </div>
                    </FilterGroup>
                </Route>

                <FilterGroup className="misc-wrapper" title="Misc" display="flex">
                    <Tooltip
                        offset={[0, 8]}
                        content="Save your favorite auctions pressing the ❤️ button!"
                    >
                        <Chip
                            style={{ marginRight: 8 }}
                            onClick={useCallback(() => toggleFilterValue('fav'), [toggleFilterValue])}
                            overrideStatus={filters.fav}
                        >
                            Favorited ❤️
                        </Chip>
                    </Tooltip>

                    <Tooltip
                        offset={[0, 8]}
                        style={{ width: 280 }}
                        content="Nicknames with special characters (äëïöüÿ'-.,), 2-3 characters length and consecutive uppercase letters (e.g XVI)"
                    >
                        <Chip
                            style={{ marginRight: 8 }}
                            onClick={useCallback(() => toggleFilterValue('rareNick'), [toggleFilterValue])}
                            overrideStatus={filters.rareNick}
                        >
                            Rare nicknames
                        </Chip>
                    </Tooltip>

                    <Tooltip
                        offset={[0, 8]}
                        content="Characters level 400+ with Soul War not completed"
                    >
                        <Chip
                            onClick={useCallback(() => {
                                if (filters.soulwarFilter && (filters.minLevel >= 400)) {
                                    updateFilterValue('minLevel', 2)
                                    updateFilterValue('soulwarFilter', false);
                                } else {
                                    updateFilterValue('minLevel', 400)
                                    updateFilterValue('soulwarFilter', true);
                                }
                            }, [filters, updateFilterValue])}
                            overrideStatus={filters.soulwarFilter && (filters.minLevel >= 400)}
                        >
                            Soulwar available 💀
                        </Chip>
                    </Tooltip>
                </FilterGroup>
            </div>

            <DrawerFooter />
        </SideDrawer>
    )
}

const allItemsNotInSet = (array, set) => {

    const newArray = [];
    for (const item of array) {
        if (!set.has(item)) newArray.push(item);
    }

    return newArray;
}

const objectHasKeys = (object, key) => {
    if (object[key]) {
        return true;
    } else {
        return false;
    }
}

const imbuementsArray = [
    'Critical Hit',
    'Life Leech',
    'Mana Leech',
    'Club Skill',
    'Shield Skill',
    'Axe Skill',
    'Magic Level',
    'Distance Skill',
    'Sword Skill',
    'Capacity',
    'Speed',
    'Paralize Removal',
    'Energy Damage',
    'Ice Damage',
    'Death Damage',
    'Fire Damage',
    'Earth Damage',
    'Energy Protection',
    'Holy Protection',
    'Fire Protection',
    'Death Protection',
    'Ice Protection',
    'Earth Protection'
]

const imbuementObject = {};
imbuementsArray.forEach(item => imbuementObject[item] = true);