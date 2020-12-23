import React from 'react';
import Header from '../components/Header';

import '../layouts/common.css';

const MasterLayout = ({ children }) => {
    return (
        <>
            <Header />
            <div className="container body-container">
                {children}
            </div>
        </>
    );
}

export default MasterLayout;