import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos, addTodo, toggleTodo, deleteTodo } from '../actions/todoActions';

const TodoList = () => {
	const dispatch = useDispatch();
	const todos = useSelector((state) => state.todos.todos);
	const [newTodo, setNewTodo] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [isSorted, setIsSorted] = useState(false);

	useEffect(() => {
		dispatch(fetchTodos());
	}, [dispatch]);

	const handleAddTodo = () => {
		dispatch(addTodo(newTodo));
		setNewTodo('');
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
				<button onClick={handleAddTodo}>Добавить</button>
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
							<button onClick={() => dispatch(toggleTodo(todo))}>
								{todo.completed ? 'Отменить выполнение' : 'Выполнено'}
							</button>
							<button onClick={() => dispatch(deleteTodo(todo.id))}>
								Удалить
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TodoList;
