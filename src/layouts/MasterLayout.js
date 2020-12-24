import React from 'react';
import '../layouts/common.css';

const MasterLayout = ({ children }) => {
    return (
        <div className="body-container">
            {children}
        </div>
    );
}

export default MasterLayout;