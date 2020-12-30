export const TOGGLE_SIDE_DRAWER = 'TOGGLE_SIDE_DRAWER';
export const SET_SIDE_DRAWER = 'TOGGLE_SIDE_DRAWER';

const toggleSideDrawer = (state) => {
    return { active: !state.active };
}

const setSideDrawer = (value) => {
    return { active: value };
}

export const sideDrawerReducer = (state, action) => {
    switch (action.type) {
        case TOGGLE_SIDE_DRAWER:
            return toggleSideDrawer(state);

        case SET_SIDE_DRAWER:
            return setSideDrawer(action.value);

        default:
            return state;
    }
}