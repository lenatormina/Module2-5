import React, { useState, useEffect } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TodoDetailPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [todo, setTodo] = useState(null);
	const [editedTitle, setEditedTitle] = useState('');

	useEffect(() => {
		const fetchTodo = async () => {
			try {
				const response = await axios.get(`http://localhost:3000/todos/${id}`);
				setTodo(response.data);
				setEditedTitle(response.data.title);
			} catch (error) {
				console.error('Error fetching todo:', error);
			}
		};
		fetchTodo();
	}, [id]);

	const updateTodo = async () => {
		try {
			await axios.patch(`http://localhost:3000/todos/${id}`, {
				title: editedTitle,
			});
			setTodo({ ...todo, title: editedTitle });
		} catch (error) {
			console.error('Error updating todo:', error);
		}
	};

	const deleteTodo = async () => {
		try {
			await axios.delete(`http://localhost:3000/todos/${id}`);
			navigate.push('/');
		} catch (error) {
			console.error('Error deleting todo:', error);
		}
	};

	if (!todo) {
		return <div>Loading...</div>;
	}

	const handleGoBack = () => {
		navigate(-1);
	};

	const handleDelete = async () => {
		try {
			await deleteTodo(id);
			navigate('/');
		} catch (error) {
			console.error('Error deleting todo:', error);
		}
	};

	return (
		<div className="todo-detail">
			<button className="back-btn" onClick={handleGoBack}>
				Back
			</button>
			<h2>Task Details</h2>
			<input
				type="text"
				value={editedTitle}
				onChange={(e) => setEditedTitle(e.target.value)}
			/>
			<button onClick={updateTodo}>Save</button>
			<button onClick={handleDelete}>Delete</button>
			<p>{todo.title}</p>
		</div>
	);
};

export default TodoDetailPage;
