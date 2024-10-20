import { FETCH_TODOS, ADD_TODO, TOGGLE_TODO, DELETE_TODO } from '../actions/todoActions';

const initialState = {
	todos: [],
};

const todosReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_TODOS:
			return {
				...state,
				todos: action.payload,
			};
		case ADD_TODO:
			return {
				...state,
				todos: [...state.todos, action.payload],
			};
		case TOGGLE_TODO:
			return {
				...state,
				todos: state.todos.map((todo) =>
					todo.id === action.payload.id
						? { ...todo, completed: !todo.completed }
						: todo,
				),
			};
		case DELETE_TODO:
			return {
				...state,
				todos: state.todos.filter((todo) => todo.id !== action.payload),
			};
		default:
			return state;
	}
};

export default todosReducer;
