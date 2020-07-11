import React, { useContext } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { clientRoutes } from '../helpers/routes';
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
		<div className="nav-wrap">
			<div className="nav-inner">
				{location.pathname !== clientRoutes.home ? (
					<div className="nav-section flex start">
						<Link to={clientRoutes.home}>
							<img src={logo} alt={logo} height="50px" />
						</Link>
					</div>
				) : null}
				<div className="nav-section">
					{/* <Link className="nav-links" to="/">Accueil</Link>
					<Link className="nav-links" to="/x">Forfaits</Link>
					<Link className="nav-links" to="/x">Contact</Link>
					<Link className="nav-links" to="/x">A Propos</Link> */}
					{user ? (
						<React.Fragment>
							<div className="username">{user.email}</div>
							<div className="button standard" onClick={signOutUser}>Se déconnecter</div>
						</React.Fragment>
					) : (
							<React.Fragment>
								<Link to={clientRoutes.signin}>
									<div className="button standard nowrap">Se connecter</div>
								</Link>
								<Link to={clientRoutes.signup}>
									<div className="button standard nowrap">Nouveau Profil</div>
								</Link>
							</React.Fragment>
						)}
				</div>
			</div>
		</div>
	);
};