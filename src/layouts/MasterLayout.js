import React from 'react';
import '../layouts/common.css';

const MasterLayout = ({ children }) => {
    return (
        <div className="body-container dark-theme">
            {children}
        </div>
    );
}

export default MasterLayout;