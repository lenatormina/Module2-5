import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [isSorted, setIsSorted] = useState(false);

	useEffect(() => {
		const fetchTodos = async () => {
			try {
				const response = await axios.get('http://localhost:3000/todos');
				setTodos(response.data);
			} catch (error) {
				console.error('Error fetching todos:', error);
			}
		};
		fetchTodos();
	}, []);

	const addTodo = async () => {
		if (newTodo.trim()) {
			try {
				const response = await axios.post('http://localhost:3000/todos', {
					title: newTodo,
					completed: false,
				});
				setTodos([...todos, response.data]);
				setNewTodo('');
			} catch (error) {
				console.error('Error adding todo:', error);
			}
		}
	};

	const toggleTodoCompletion = async (todo) => {
		try {
			await axios.patch(`http://localhost:3000/todos/${todo.id}`, {
				completed: !todo.completed,
			});
			setTodos(
				todos.map((t) =>
					t.id === todo.id ? { ...t, completed: !t.completed } : t,
				),
			);
		} catch (error) {
			console.error('Error updating todo:', error);
		}
	};

	const deleteTodo = async (todo) => {
		try {
			await axios.delete(`http://localhost:3000/todos/${todo.id}`);
			setTodos(todos.filter((t) => t.id !== todo.id));
		} catch (error) {
			console.error('Error deleting todo:', error);
		}
	};

	const filteredTodos = todos.filter((todo) =>
		todo.title.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const sortedTodos = isSorted
		? filteredTodos.slice().sort((a, b) => a.title.localeCompare(b.title))
		: filteredTodos;

	return (
		<div className="todo-list">
			<h1>Todo List</h1>
			<div className="todo-actions">
				<input
					type="text"
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
					placeholder="Задача"
				/>
				<button onClick={addTodo}>Добавить</button>
				<input
					type="text"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					placeholder="Найти задачу"
				/>
				<button onClick={() => setIsSorted(!isSorted)}>
					{isSorted ? 'Не сортировать' : 'Сортировать'}
				</button>
			</div>
			<ul>
				{sortedTodos.map((todo) => (
					<li
						key={todo.id}
						className={`todo-item ${todo.completed ? 'completed' : ''}`}
					>
						<div className="todo-text">{todo.title}</div>
						<div className="todo-actions">
							<button onClick={() => toggleTodoCompletion(todo)}>
								{todo.completed ? 'Отменить выполнение' : 'Выполнено'}
							</button>
							<button onClick={() => deleteTodo(todo)}>Удалить</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TodoList;
