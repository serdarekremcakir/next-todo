"use client"

import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch } from '../../redux/store';
import { fetchTodos, toggleViewType } from '../../redux/slices/todoSlice';
import Tab from './Tab';
import GalleryList from './GalleryList';
import RowList from './RowList';

const TodoList = () => {
    const dispatch = useDispatch();
    const { data, loading, error, viewType } = useSelector((state) => state.todos);
    const getTodo = useCallback(() => {
        dispatch(fetchTodos());
      }, [dispatch]);

    const [activeTab, setActiveTab] = useState('all');

    const filteredTodos = useCallback(() => {
        if (activeTab === 'completed') {
          return data?.filter((todo) => todo.completed);
        } else if (activeTab === 'uncompleted') {
          return data?.filter((todo) => !todo.completed);
        } else {
          return data;
        }
      }, [activeTab, data]);

    return (
        <>
            <button onClick={() => getTodo()} className='fetchBtn'>
                Fetch & Reset Todos
                </button>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            <div className='tabWrapper'>
                <Tab  activeTab={activeTab} setActiveTab={setActiveTab} />
                <button onClick={() => dispatch(toggleViewType())} className='toggleTypeBtn'>Toggle View Type</button>
            </div>

            {viewType === "gallery" ? <GalleryList filteredTodos={filteredTodos()} /> : <RowList filteredTodos={filteredTodos()} />}
        </>
    )
}

export default TodoList