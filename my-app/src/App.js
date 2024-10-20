import React from 'react';
import { Provider } from 'react-redux';
import TodoList from './components/TodoList';
import store from './store';

function App() {
	return (
		<Provider store={store}>
			<div className="app">
				<TodoList />
			</div>
		</Provider>
	);
}

export default App;
