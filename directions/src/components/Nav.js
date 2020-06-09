import React from 'react';
import { NavLink } from 'react-router-dom';
import { clientRoutes } from '../helpers/routes';

export const Nav = () => {
    return (
        // On ajoutera les routes nécessaires plus tard ici
        <div  className="nav-wrap">
            <div className="nav-inner">
                <div className="nav-section">
                    <NavLink to={clientRoutes.home} activeClassName="active">
                        <div className="button standard">Signin</div>
                    </NavLink>
                    <NavLink to={clientRoutes.home} activeClassName="active">
                        <div className="button standard">Signup</div>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};