import axios from 'axios';

export const FETCH_TODOS = 'FETCH_TODOS';
export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const DELETE_TODO = 'DELETE_TODO';

export const fetchTodos = () => {
	return async (dispatch) => {
		try {
			const response = await axios.get('http://localhost:3000/todos');
			dispatch({ type: FETCH_TODOS, payload: response.data });
		} catch (error) {
			console.error('Error fetching todos:', error);
		}
	};
};

export const addTodo = (title) => {
	return async (dispatch) => {
		if (title.trim()) {
			try {
				const response = await axios.post('http://localhost:3000/todos', {
					title,
					completed: false,
				});
				dispatch({ type: ADD_TODO, payload: response.data });
			} catch (error) {
				console.error('Error adding todo:', error);
			}
		}
	};
};

export const toggleTodo = (todo) => {
	return async (dispatch) => {
		try {
			await axios.patch(`http://localhost:3000/todos/${todo.id}`, {
				completed: !todo.completed,
			});
			dispatch({ type: TOGGLE_TODO, payload: todo });
		} catch (error) {
			console.error('Error updating todo:', error);
		}
	};
};

export const deleteTodo = (todoId) => {
	return async (dispatch) => {
		try {
			await axios.delete(`http://localhost:3000/todos/${todoId}`);
			dispatch({ type: DELETE_TODO, payload: todoId });
		} catch (error) {
			console.error('Error deleting todo:', error);
		}
	};
};
