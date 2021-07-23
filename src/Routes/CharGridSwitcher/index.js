import React from 'react';
import { Route, Switch } from 'react-router-dom';

/* import CharGrid from '../../components/CharGrid'; */
import CharacterGrid from 'components/CharacterGrid'

import { useCharacters } from 'contexts/useDatabase'

export default () => {

    const { characterData, historyData, loading } = useCharacters()

    return (
        <Switch>
            <Route exact path="/">
                <CharacterGrid
                    itemsPerPage={10}
                    characterList={characterData}
                    initialSort={0}
                    initialOrder={false}
                    isLoading={loading}
                />
            </Route>

            <Route exact path="/bazaar-history">
                <CharacterGrid
                    itemsPerPage={10}
                    characterList={historyData}
                    initialSort={0}
                    initialOrder={true}
                    isLoading={loading}
                />
            </Route>
        </Switch>
    )
}