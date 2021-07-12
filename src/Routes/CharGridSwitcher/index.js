import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CharGrid from '../../components/CharGrid';

import CharacterDataContext from '../../contexts/CharacterData/context';
import HistoryDataContext from '../../contexts/HistoryData/context';

export default () => {

    return (
        <Switch>
            <Route exact path="/">
                <CharacterDataContext.Consumer>
                    {({ characterData }) => (
                        <CharGrid
                            itemsPerPage={10}
                            data={characterData}
                            initialSort={0}
                            initialOrder={false}
                        />
                    )}
                </CharacterDataContext.Consumer>
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