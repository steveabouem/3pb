import React from 'react';
import './styles/app.scss';
import { Switch, Route } from 'react-router-dom';
import { Landing } from './components/Landing';
import { MapMain } from './components/MapMain';
import { Nav } from './components/Nav';
import { FirebaseProvider } from './components/FirbaseProvider';
import { Authentication } from './components/Authenticattion';
import { NotFound } from './components/404';


const App = () => {
	return (
		<div className="App">
			<FirebaseProvider>
				<Nav />
				<Switch>
					<Route exact path="/" component={Landing}/>
					<Route path="/map" component={MapMain}/>
					<Route path="/map/:id" component={MapMain}/>
					<Route path="/signin" component={Authentication}/>
					<Route path="/signup" component={Authentication}/>
					<Route exact path="*">
						<NotFound/>
					</Route>
				</Switch>
			</FirebaseProvider>
			<div className="footer">
				<div className="version flex">V 0.1.1</div>
			</div>
		</div>
	);
}

export default App;