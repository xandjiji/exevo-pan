import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import UrlContext from './context';

export default ({ children }) => {

    const location = useLocation();

    console.log(location);

    useEffect(() => {

    }, [])

    return (
        <UrlContext.Provider
            value={{ location }}
        >
            {children}
        </UrlContext.Provider>
    )
}