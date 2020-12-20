import React from 'react';
import '../layouts/common.css';

const MasterLayout = ({ children }) => {
    return (
        <>
            <main>
                {children}
            </main>
        </>
    );
}

export default MasterLayout;