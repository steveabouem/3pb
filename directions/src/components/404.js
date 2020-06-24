import React from 'react';
import { NavLink } from 'react-router-dom';
import { clientRoutes } from '../helpers/routes';

export const NotFound = () => (
    <div className="not-found">
        <h2>La page indiquée n'existe pas.</h2>
        <NavLink to={clientRoutes.home}>
            <div className="button standard">ACCUEIL</div>
        </NavLink>
    </div>
);