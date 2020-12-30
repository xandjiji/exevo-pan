import data from '../../../AllCharacterData.json';
const currentDate = new Date();
let initialData = [...data];

for (let i = 0; i < data.length; i++) {
    let itemDate = new Date(initialData[i].auctionEnd * 1000);

    if (currentDate > itemDate) {
        initialData.shift();
        i -= 1;
    } else {
        break;
    }
}

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
            server,
            level,
            skills
        } = character;

        if (vocation.size) {
            if (!vocation.has(vocationId)) continue;
        }

        if (pvp.size) {
            if (!pvp.has(server.pvpType.type)) continue;
        }

        if (battleye.size) {
            if (!battleye.has(server.battleye)) continue;
        }

        if (location.size) {
            if (!location.has(server.serverLocation.type)) continue;
        }

        if (serverName) {
            const reg = new RegExp(serverName, 'gi');
            if (!reg.test(server.serverName)) continue;
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