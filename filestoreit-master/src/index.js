import { render } from 'react-dom';
import App from './App/App';
import './index.css';
render(<App />, document.getElementById('app'), () =>
	console.log(`App Is Up And Running`)
);
