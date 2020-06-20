import React, { useContext } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { clientRoutes } from '../helpers/routes';
import { icons } from '../common/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../assets/logo.png';
import { UserContext } from '../helpers/contexts';
import { auth } from '../helpers/api';

export const Nav = () => {
    const { user, setUser } = useContext(UserContext);

    const location = useLocation();
    const history = useHistory();

    const signOutUser = () => {
        auth.signOut()
            .then(() => {
                setUser(null);
                history.push(clientRoutes.home);
            })
            .catch(e => {
                console.log(e);
            });
    };
    
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
                            <div className="username">{user.email}</div>
                            <div className="button standard" onClick={signOutUser}>Signout</div>
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