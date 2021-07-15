import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Pushable from '../../components/Pushable';
import SideDrawer from '../../components/SideDrawer';


import SideDrawerContext from '../../contexts/SideDrawer/context';

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
                            <SideDrawer
                                backAction={sideDrawercontext.toggleSideDrawer}
                            />
                        </Route>

                        <Route exact path="/bazaar-history">
                            <SideDrawer
                                backAction={sideDrawercontext.toggleSideDrawer}
                            />
                        </Route>
                    </Switch>
                </Pushable>
            )}
        </SideDrawerContext.Consumer>
    )
}