import React, { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import SideDrawer from './SideDrawer.styled';
import FilterGroup from '../FilterGroup';
import Chip from '../Chip';
import AutocompleteInput from '../AutocompleteInput';
import RangeSlider from '../RangeSlider';
import DrawerFooter from '../DrawerFooter';
import InformationBadge from '../InformationBadge';

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

import CharacterDataContext from '../../contexts/CharacterData/context';
import ServerDataContext from '../../contexts/ServerData/context';
import ItemsDataContext from '../../contexts/ItemsData/context';

export default ({ backAction }) => {

    const { initialCharacterData, favCharacters, dispatchCharacterData } = useContext(CharacterDataContext);
    const { serverData, indexedServerData } = useContext(ServerDataContext);
    const { itemData } = useContext(ItemsDataContext);

    const serverNamesArray = useMemo(() => Object.keys(serverData), [serverData]);
    const itemNamesArray = useMemo(() => Object.keys(itemData), [itemData]);

    const initialFilterState = {
        vocation: new Set(),
        pvp: new Set([]),
        battleye: new Set([]),
        location: new Set([]),
        serverSet: new Set([]),
        minLevel: 2,
        minSkill: 10,
        skillKey: new Set([]),
        itemSet: new Set([]),
        fav: false,
        rareNick: false,
        soulwarFilter: false
    }

    const [filters, setFilters] = useState(initialFilterState);
    const [interacted, setInteracted] = useState(false);

    const updateFilterValue = useCallback((key, value) => {
        setFilters(prevFilters => {
            return { ...prevFilters, [key]: value };
        });
    }, []);

    const toggleFilterValue = useCallback((key) => {
        setFilters(prevFilters => {
            return { ...prevFilters, [key]: !prevFilters[key] }
        });
    }, []);

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
    }, [filters]);

    const addToFilterSet = useCallback((key, value) => {
        setFilters(prevFilters => {
            prevFilters[key].add(value);
            return {
                ...prevFilters,
                [key]: prevFilters[key]
            }
        })
    }, []);

    const deleteFromFilterSet = useCallback((key, value) => {
        setFilters(prevFilters => {
            prevFilters[key].delete(value);
            return {
                ...prevFilters,
                [key]: prevFilters[key]
            }
        })
    }, []);

    const onAutocompleteChange = useCallback((key, value, object) => {
        if (objectHasKeys(object, value)) {
            addToFilterSet(key, value);
        }
    }, [addToFilterSet]);


    useEffect(() => {
        setTimeout(() => {
            dispatchCharacterData({
                type: 'APPLY_FILTERS',
                filterState: filters,
                initialData: {
                    initialCharacterData,
                    itemData,
                    indexedServerData,
                    favCharacters
                }
            });
        }, 150);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters, initialCharacterData]);

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

    const filterIsReset = useCallback(() => {
       const {
           vocation,
           pvp,
           battleye,
           location,
           serverSet,
           itemSet,
           minLevel,
           minSkill,
           skillKey,
           fav,
           rareNick
       } = filters;

       
       if(vocation.size) return false;
       if(pvp.size) return false;
       if(battleye.size) return false;
       if(location.size) return false;
       if(serverSet.size) return false;
       if(skillKey.size) return false;
       if(itemSet.size) return false;
       if(minLevel !== 2) return false;
       if(minSkill !== 10) return false;
       if(fav) return false;
       if(rareNick) return false;

       return true;
    }, [filters]);

    useEffect(() => {
        if(filterIsReset()) {
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
                        setFilters(initialFilterState);
                        setInteracted(false);
                    }}
                >
                    <span>reset filters</span>
                    <ResetIcon />
                </div>
            </div>

            <div className="items-wrapper inner-container custom-scrollbar">
                <FilterGroup title="Vocation" display="flex">
                    <Chip
                        clickable
                        onClick={useCallback(() => toggleInFilterSet('vocation', 0), [toggleInFilterSet])}
                        overrideStatus={filters.vocation.has(0)}
                    >
                        <img className="chip-icon" src={Rook} alt="None" title="None" width={12} height={12} />
                        None
                    </Chip>
                    <Chip
                        clickable
                        onClick={useCallback(() => toggleInFilterSet('vocation', 1), [toggleInFilterSet])}
                        overrideStatus={filters.vocation.has(1)}
                    >
                        <img className="chip-icon" src={Knight} alt="Knight" title="Knight" width={14} height={14} />
                        Knight
                    </Chip>
                    <Chip
                        clickable
                        onClick={useCallback(() => toggleInFilterSet('vocation', 2), [toggleInFilterSet])}
                        overrideStatus={filters.vocation.has(2)}
                    >
                        <img className="chip-icon" src={Paladin} alt="Paladin" title="Paladin" width={16} height={16} />
                        Paladin
                    </Chip>
                    <Chip
                        clickable
                        onClick={useCallback(() => toggleInFilterSet('vocation', 3), [toggleInFilterSet])}
                        overrideStatus={filters.vocation.has(3)}
                    >
                        <img className="chip-icon" src={Sorcerer} alt="Sorcerer" title="Sorcerer" width={14} height={14} />
                        Sorcerer
                    </Chip>
                    <Chip
                        clickable
                        onClick={useCallback(() => toggleInFilterSet('vocation', 4), [toggleInFilterSet])}
                        overrideStatus={filters.vocation.has(4)}
                    >
                        <img className="chip-icon" src={Druid} alt="Druid" title="Druid" width={12} height={14} />
                        Druid
                    </Chip>
                </FilterGroup>

                <FilterGroup title="PvP" display="flex">
                    <Chip
                        clickable
                        onClick={useCallback(() => toggleInFilterSet('pvp', 0), [toggleInFilterSet])}
                        overrideStatus={filters.pvp.has(0)}
                    >
                        <img className="chip-icon" src={Dove} alt="Optional PvP" title="Optional PvP" width={9} height={9} />
                        Optional
                    </Chip>
                    <Chip
                        clickable
                        onClick={useCallback(() => toggleInFilterSet('pvp', 1), [toggleInFilterSet])}
                        overrideStatus={filters.pvp.has(1)}
                    >
                        <img className="chip-icon" src={WhiteSkull} alt="Open PvP" title="Open PvP" width={11} height={11} />
                        Open
                    </Chip>
                    <Chip
                        clickable
                        onClick={useCallback(() => toggleInFilterSet('pvp', 2), [toggleInFilterSet])}
                        overrideStatus={filters.pvp.has(2)}
                    >
                        <img className="chip-icon" src={OrangeSkull} alt="Retro Open PvP" title="Retro Open PvP" width={11} height={11} />
                        Retro Open
                    </Chip>
                    <Chip
                        clickable
                        onClick={useCallback(() => toggleInFilterSet('pvp', 3), [toggleInFilterSet])}
                        overrideStatus={filters.pvp.has(3)}
                    >
                        <img className="chip-icon" src={RedSkull} alt="Hardcore PvP" title="Hardcore PvP" width={11} height={11} />
                        Hardcore
                    </Chip>
                    <Chip
                        clickable
                        onClick={useCallback(() => toggleInFilterSet('pvp', 4), [toggleInFilterSet])}
                        overrideStatus={filters.pvp.has(4)}
                    >
                        <img className="chip-icon" src={BlackSkull} alt="Retro Hardcore PvP" title="Retro Hardcore PvP" width={11} height={11} />
                        Retro Hardcore
                    </Chip>
                </FilterGroup>

                <FilterGroup className="battleye-wrapper" title="BattlEye" display="flex">
                    <Chip
                        clickable
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
                        clickable
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
                        clickable
                        onClick={useCallback(() => toggleInFilterSet('location', 0), [toggleInFilterSet])}
                        overrideStatus={filters.location.has(0)}
                    >
                        <img className="flag chip-icon" alt="Europe" title="Europe" src={EuFlag} width={16} height={10} />
                        EU
                    </Chip>
                    <Chip
                        clickable
                        onClick={useCallback(() => toggleInFilterSet('location', 1), [toggleInFilterSet])}
                        overrideStatus={filters.location.has(1)}
                    >
                        <img className="flag chip-icon" alt="North America" title="North America" src={NaFlag} width={16} height={10} />
                        NA
                    </Chip>
                    <Chip
                        clickable
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
                                closeable
                                onClose={() => deleteFromFilterSet('serverSet', serverName)}>
                                {serverName}
                            </Chip>
                        )}
                    </div>
                </FilterGroup>

                <FilterGroup title="Level" display="flex">
                    <label htmlFor="Level-input" className="invisible-label">Level</label>
                    <label htmlFor="Level-counter" className="invisible-label">Level value</label>
                    <RangeSlider
                        labelFor="Level-input"
                        counterLabel="Level-counter"
                        initialValue={2}
                        min={2}
                        max={1000}
                        onChange={useCallback((value) => updateFilterValue('minLevel', value), [updateFilterValue])}
                        overrideValue={filters.minLevel}
                    />
                </FilterGroup>

                <FilterGroup title="Skill" display="block">
                    <label htmlFor="Skill-input" className="invisible-label">Skill</label>
                    <label htmlFor="Skill-counter" className="invisible-label">Skill value</label>
                    <RangeSlider
                        labelFor="Skill-input"
                        counterLabel="Skill-counter"
                        initialValue={10}
                        min={10}
                        max={130}
                        onChange={useCallback((value) => updateFilterValue('minSkill', value), [updateFilterValue])}
                        overrideValue={filters.minSkill}
                    />

                    <div className="skills-wrapper">
                        <Chip
                            clickable
                            onClick={useCallback(() => toggleInFilterSet('skillKey', 'magic'), [toggleInFilterSet])}
                            overrideStatus={filters.skillKey.has('magic')}
                        >
                            <img className="chip-icon" src={Magic} alt="Magic Level" title="Magic Level" width={9} height={9} />
                            Magic
                        </Chip>
                        <Chip
                            clickable
                            onClick={useCallback(() => toggleInFilterSet('skillKey', 'distance'), [toggleInFilterSet])}
                            overrideStatus={filters.skillKey.has('distance')}
                        >
                            <img className="chip-icon" src={Distance} alt="Distance fighting" title="Distance fighting" width={9} height={9} />
                            Distance
                        </Chip>
                        <Chip
                            clickable
                            onClick={useCallback(() => toggleInFilterSet('skillKey', 'club'), [toggleInFilterSet])}
                            overrideStatus={filters.skillKey.has('club')}
                        >
                            <img className="chip-icon" src={Club} alt="Club fighting" title="Club fighting" width={9} height={9} />
                            Club
                        </Chip>
                        <Chip
                            clickable
                            onClick={useCallback(() => toggleInFilterSet('skillKey', 'sword'), [toggleInFilterSet])}
                            overrideStatus={filters.skillKey.has('sword')}
                        >
                            <img className="chip-icon" src={Sword} alt="Sword fighting" title="Sword fighting" width={9} height={9} />
                            Sword
                        </Chip>
                        <Chip
                            clickable
                            onClick={useCallback(() => toggleInFilterSet('skillKey', 'axe'), [toggleInFilterSet])}
                            overrideStatus={filters.skillKey.has('axe')}
                        >
                            <img className="chip-icon" src={Axe} alt="Axe fighting" title="Axe fighting" width={9} height={9} />
                            Axe
                        </Chip>
                    </div>
                </FilterGroup>

                <FilterGroup
                    className="rare-items-wrapper"
                    title="Rare items"
                    display="flex"
                    badge={<InformationBadge icon="!" text="If a rare item is not on this list it means that there are no auctions available with it." />}
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
                        clickable
                        overrideStatus={isAllItemsSelected() ? true : false}
                        onClick={handleAllItemsToggle}>
                        All items
                    </Chip>

                    <div className="chips-wrapper">
                        {[...filters.itemSet].map((itemName, index) =>
                            <Chip
                                key={index}
                                closeable
                                onClose={() => deleteFromFilterSet('itemSet', itemName)}>
                                {itemName}
                            </Chip>
                        )}
                    </div>
                </FilterGroup>

                <FilterGroup title="Misc" display="flex">
                    <Chip
                        clickable
                        onClick={useCallback(() => toggleFilterValue('fav'), [toggleFilterValue])}
                        overrideStatus={filters.fav}
                    >
                        Favorited ❤️
                    </Chip>
                    <Chip
                        clickable
                        onClick={useCallback(() => toggleFilterValue('rareNick'), [toggleFilterValue])}
                        overrideStatus={filters.rareNick}
                    >
                        Rare nicknames
                    </Chip>

                    <Chip
                        clickable
                        onClick={useCallback(() => {
                            if(filters.soulwarFilter && (filters.minLevel >= 400)) {
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