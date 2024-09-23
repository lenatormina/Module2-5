import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TodoListPage from './TodoListPage';
import TodoDetailPage from './TodoDetailPage';
import NotFoundPage from './NotFoundPage';

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" exact element={<TodoListPage />} />
				<Route path="/task/:id" element={<TodoDetailPage />} />
				<Route path="/404" element={<NotFoundPage />} />
				<Route path="*" element={<Navigate to="/404" />} />
			</Routes>
		</Router>
	);
};

export default App;
