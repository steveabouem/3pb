import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { NotFound } from './components/404';
import { Authentication } from './components/Authenticattion';
import { Landing } from './components/Landing';
import { MapMain } from './components/MapMain';
import { UserContext } from './helpers/contexts';

export const Routing = () => {
    const { user } = useContext(UserContext);
    
    return (
        <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/map">
                <MapMain />
            </Route>
            <Route path="/map/:id">
                <MapMain />
            </Route>
            <Route path="/signin" component={Authentication} />
            <Route path="/signup" component={Authentication} />
            <Route exact path="*">
                <NotFound />
            </Route>
        </Switch>
    );
};