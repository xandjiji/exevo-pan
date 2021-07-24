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
                    characterList={characterData}
                    isLoading={loading}
                />
            </Route>

            <Route exact path="/bazaar-history">
                <CharacterGrid
                    characterList={historyData}
                    defaultDescendingOrder={true}
                    isLoading={loading}
                />
            </Route>
        </Switch>
    )
}