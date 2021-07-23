import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CharGrid from '../../components/CharGrid';
import { useCharacters } from 'contexts/useDatabase'

export default () => {

    const { characterData, historyData, loading } = useCharacters()

    return (
        <Switch>
            <Route exact path="/">
                <CharGrid
                    itemsPerPage={10}
                    data={characterData}
                    initialSort={0}
                    initialOrder={false}
                    isLoading={loading}
                />
            </Route>

            <Route exact path="/bazaar-history">
                <CharGrid
                    itemsPerPage={10}
                    data={historyData}
                    initialSort={0}
                    initialOrder={true}
                    isLoading={loading}
                />
            </Route>
        </Switch>
    )
}