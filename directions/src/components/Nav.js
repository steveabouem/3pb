import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { clientRoutes } from '../helpers/routes';
import { icons } from '../common/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../assets/logo.png';
import { UserContext } from '../helpers/contexts';

export const Nav = () => {
    const { user } = useContext(UserContext);

    const location = useLocation();

    
    return (
        <div  className="nav-wrap">
            <div className="nav-inner">
                {location.pathname !== clientRoutes.home ? (
                    <div className="nav-section flex start">
                         <Link to={clientRoutes.home} activeClassName="active">
                            {/* <div className="button standard"> */}
                                {/* <FontAwesomeIcon className="icon pointer" icon={icons.faArrowLeft}/> */}
                                <img src={logo} alt={logo} height="50px"/>
                            {/* </div> */}
                         </Link>
                    </div>
                ) : null}
                <div className="nav-section">
                    {user ? (
                        <React.Fragment>
                            <div className="username">{user.username}</div>
                            <Link to={clientRoutes.home} activeClassName="active">
                                <div className="button standard">Signout</div>
                            </Link>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Link to={clientRoutes.signin} activeClassName="active">
                                <div className="button standard">Signin</div>
                            </Link>
                            <Link to={clientRoutes.signup} activeClassName="active">
                                <div className="button standard">Signup</div>
                            </Link>
                        </React.Fragment>
                    )}
                </div>
            </div>
        </div>
    );
};