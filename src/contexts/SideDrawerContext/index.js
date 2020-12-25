import React, { useReducer } from 'react';
import SideDrawerContext from './context';
import { sideDrawerReducer, TOGGLE_SIDE_DRAWER, SET_SIDE_DRAWER } from './reducers';

export default ({ children }) => {
    const [sideDrawerState, dispatch] = useReducer(sideDrawerReducer, { active: false });

    const toggleSideDrawer = () => {
        dispatch({ type: TOGGLE_SIDE_DRAWER });
    }

    const setSideDrawer = (value) => {
        dispatch({ type: SET_SIDE_DRAWER, value });
    }
    
    return (
        <SideDrawerContext.Provider
            value={{
                active: sideDrawerState.active,
                toggleSideDrawer,
                setSideDrawer
            }}
        >
            {children}
        </SideDrawerContext.Provider>
    )
}