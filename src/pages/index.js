import React from 'react';
import MasterLayout from '../layouts/MasterLayout';
import CharGrid from '../components/CharGrid';

const IndexPage = () => {
    return (
        <MasterLayout>
            <CharGrid itemsPerPage={10} />
        </MasterLayout>
    )
}

export default IndexPage;
