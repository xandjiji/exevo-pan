import React, { useState, useEffect } from 'react';
import StatisticsGrid from './StatisticsGrid.styled';

import { historyEndpoint } from '../../dataEnpoint';

export default () => {
    const [loaded, setLoaded] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${historyEndpoint}/overallStatistics.json`);
                const data = await response.json();

                setData(data);
                setLoaded(true);

            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);

    if (!loaded) return null;
    return (
        <StatisticsGrid>

        </StatisticsGrid>
    )
}