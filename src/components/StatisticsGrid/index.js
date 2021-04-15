import React, { useState, useEffect } from 'react';
import StatisticsGrid from './StatisticsGrid.styled';

import List from '../List';

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

    console.log(data);

    if (!loaded) return null;
    return (
        <StatisticsGrid>
            <List
                label="Top 10 Bid"
                data={data.top10Bid}
                keyName="currentBid"
                rowLabel="Bid"
            />
            <List
                label="Top 10 Level"
                data={data.top10Level}
                keyName="level"
                rowLabel="Level"
            />
        </StatisticsGrid>
    )
}