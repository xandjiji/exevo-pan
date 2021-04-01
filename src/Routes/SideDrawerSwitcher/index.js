import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Pushable from '../../components/Pushable';
import SideDrawer from '../../components/SideDrawer';


import SideDrawerContext from '../../contexts/SideDrawer/context';
import CharacterDataContext from '../../contexts/CharacterData/context';
import HistoryDataContext from '../../contexts/HistoryData/context';

export default () => {

    return (
        <SideDrawerContext.Consumer>
            {sideDrawercontext => (
                <Pushable
                    active={sideDrawercontext.active}
                    trigger={sideDrawercontext.toggleSideDrawer}
                    blockRight
                    backdrop
                >
                    <Switch>
                        <Route exact path="/">
                            <CharacterDataContext.Consumer>
                                {({ initialCharacterData, favCharacters, dispatchCharacterData }) => (
                                    <SideDrawer
                                        backAction={sideDrawercontext.toggleSideDrawer}
                                        initialCharacterData={initialCharacterData}
                                        favCharacters={favCharacters}
                                        dispatchCharacterData={dispatchCharacterData}
                                    />
                                )}
                            </CharacterDataContext.Consumer>
                        </Route>

                        <Route exact path="/bazaar-history">
                            <HistoryDataContext.Consumer>
                                {({ initialCharacterData, favCharacters, dispatchCharacterData }) => (
                                    <SideDrawer
                                        backAction={sideDrawercontext.toggleSideDrawer}
                                        initialCharacterData={initialCharacterData}
                                        favCharacters={favCharacters}
                                        dispatchCharacterData={dispatchCharacterData}
                                    />
                                )}
                            </HistoryDataContext.Consumer>
                        </Route>
                    </Switch>
                </Pushable>
            )}
        </SideDrawerContext.Consumer>
    )
}