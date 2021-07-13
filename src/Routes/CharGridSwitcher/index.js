import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CharGrid from '../../components/CharGrid';

import HistoryDataContext from '../../contexts/HistoryData/context';
import { useDatabase } from 'contexts/useDatabase'

export default () => {

    const { characterData } = useDatabase()

    return (
        <Switch>
            <Route exact path="/">
                <CharGrid
                    itemsPerPage={10}
                    data={characterData}
                    initialSort={0}
                    initialOrder={false}
                />
            </Route>

            <Route exact path="/bazaar-history">
                <HistoryDataContext.Consumer>
                    {({ characterData }) => (
                        <CharGrid
                            itemsPerPage={10}
                            data={characterData}
                            initialSort={0}
                            initialOrder={true}
                        />
                    )}
                </HistoryDataContext.Consumer>
            </Route>
        </Switch>
    )
}