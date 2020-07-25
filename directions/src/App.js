import React from 'react';
import './styles/app.scss';
import { FirebaseProvider } from './components/FirbaseProvider';
import { Routing } from './Routing';

const App = () => {
	return (
		<div className="App">
			<FirebaseProvider>
				<Routing />
			</FirebaseProvider>
			<div className="footer">
				<div className="version flex">V 0.1.2</div>
			</div>
		</div>
	);
}

export default App;