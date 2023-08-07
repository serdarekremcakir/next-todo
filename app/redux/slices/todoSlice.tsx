
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

export interface TodoState {
        data: Todo[];
        loading: boolean;
        error: string;
        viewType: string;
}

const initialState: TodoState = {
        data: [
            { id: 1, title: 'todo 1', completed: false },
            { id: 2, title: 'todo 2', completed: true },
            { id: 3, title: 'todo 3', completed: false },
        ],
        loading: false,
        error: "",
        viewType: "gallery"
}


export const fetchTodos = createAsyncThunk("fetchTodos", async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
    if (!response.ok) {
        return Promise.reject();
    }
    const result = await response.json();
    return result;
})

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const newTodo: Todo = {
                id: Date.now(),
                title: action.payload.title,
                completed: false,
            }
            state.data.push(newTodo);
        },
        removeTodo: (state, action: PayloadAction<number>) => {
            state.data = state.data.filter((todo) => todo.id !== action.payload);
        },
        editTodo: (state, action: PayloadAction<{ id: number, title: string }>) => {
            const index = state.data.findIndex((todo) => todo.id === action.payload.id);
            if (index !== -1) {
                state.data[index].title = action.payload.title;
            } else {
                console.log('not found');
            }
        },
        toggleComplete: (state, action: PayloadAction<number>) => {
            const index = state.data.findIndex((todo) => todo.id === action.payload);
            if (index !== -1) {
                state.data[index].completed = !state.data[index].completed;
            } else {
                console.log('not found');
            }
        },
        toggleViewType: (state) => {
            state.viewType == 'gallery' ? state.viewType = 'list' : state.viewType = 'gallery';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.pending, (state, action) => {
            console.log('loading');
            state.loading = true;
            state.error = "";
        });
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchTodos.rejected, (state, action) => {
            state.loading = false;
            state.error = "Fetching Error"
        })
    }

})


export const { addTodo, removeTodo, editTodo, toggleComplete, toggleViewType } = todoSlice.actions;
export default todoSlice.reducer;