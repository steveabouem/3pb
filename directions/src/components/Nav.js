import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { clientRoutes } from '../helpers/routes';
import { icons } from '../common/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../assets/logo.png';

export const Nav = () => {
    const location = useLocation();

    
    return (
        <div  className="nav-wrap">
            <div className="nav-inner">
                {location.pathname !== clientRoutes.home ? (
                    <div className="nav-section flex start">
                         <NavLink to={clientRoutes.home} activeClassName="active">
                            {/* <div className="button standard"> */}
                                {/* <FontAwesomeIcon className="icon pointer" icon={icons.faArrowLeft}/> */}
                                <img src={logo} alt={logo} height="50px"/>
                            {/* </div> */}
                         </NavLink>
                    </div>
                ) : null}
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