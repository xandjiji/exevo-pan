import initialData from './initialData';
import serverData from '../../serverData.json';

const applyFilters = (filterState) => {

    const {
        vocation,
        pvp,
        battleye,
        location,
        serverName,
        minLevel,
        minSkill,
        skillKey
    } = filterState;

    let filteredData = [];
    for (const character of initialData) {

        const {
            vocationId,
            serverId,
            level,
            skills
        } = character;

        if (vocation.size) {
            if (!vocation.has(vocationId)) continue;
        }

        if (pvp.size) {
            if (!pvp.has(serverData[serverId].pvpType.type)) continue;
        }

        if (battleye.size) {
            if (!battleye.has(serverData[serverId].battleye)) continue;
        }

        if (location.size) {
            if (!location.has(serverData[serverId].serverLocation.type)) continue;
        }

        if (serverName) {
            if (serverName !== serverId) continue;
        }

        if(skillKey.size) {
            let hasMinimumSkill = false;
            const skillArray = Array.from(skillKey);
            
            for(const skillItem of skillArray) {
                if(skills[skillItem].level >= minSkill) {
                    hasMinimumSkill = true;
                    break;
                }
            }
            if(!hasMinimumSkill) continue;
        }
        
        if(level < minLevel) continue;

        filteredData.push(character);
    }

    return filteredData;
}

export const characterDataReducer = (state, action) => {
    switch (action.type) {
        case 'APPLY_FILTERS':
            return applyFilters(action.filterState);

        default:
            return state;
    }
}