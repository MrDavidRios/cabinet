import { useEffect } from 'react';
import { Titlebar } from './Titlebar';
import { LinksDisplay } from './components/LinksDisplay';
import './css/index.css';

function App() {
	useEffect(() => {}, []);

	return (
		<div id='appWrapper'>
			<Titlebar></Titlebar>
			<div id='appContent'>
				<div id='sidebar'></div>
				<LinksDisplay></LinksDisplay>
			</div>
		</div>
	);
}

export default App;
