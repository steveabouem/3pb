import React, { useEffect } from 'react';
import './styles/app.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { clientRoutes } from './helpers/routes';
import { Landing } from './components/Landing';
import { MapMain } from './components/MapMain';
import { Nav } from './components/Nav';
import { UserContext } from './helpers/contexts';
import { FirebaseProvider } from './components/FirbaseProvider';
import { Authentication } from './components/Authenticattion';


const App = () => {
	return (
		<div className="App">
			<FirebaseProvider>
				<Nav />
				<Switch>
					<Route path={clientRoutes.auth} component={Authentication}/>
					<Route exact path={clientRoutes.home} component={Landing}/>
					<Route path={clientRoutes.map} component={MapMain}/>
					<Route path="*">
						none
					</Route>
				</Switch>
			</FirebaseProvider>
			<div className="footer" />
		</div>
	);
}

export default App;