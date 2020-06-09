import React, { useEffect } from 'react';
import './styles/app.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { clientRoutes } from './helpers/routes';
import { Landing } from './components/Landing';
import { MapMain } from './components/MapMain';
import { Nav } from './components/Nav';
 
const App = () => {
	return (
		<div className="App">
			<BrowserRouter>
				<Nav/>
				<Switch>
					<Route exact path={clientRoutes.home} component={Landing} />
					<Route path={clientRoutes.map} component={MapMain} />
				</Switch>
			</BrowserRouter>
			<div className="footer"/>
		</div>
	);
}

export default App;