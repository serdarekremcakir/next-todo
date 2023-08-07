"use client"

import React, { FormEvent } from 'react'
import { useState } from 'react'
import { addTodo } from '../../redux/slices/todoSlice';
import { useDispatch } from '../../redux/store';


const TodoAdd = () => {
  const [todo, setTodo] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e:FormEvent) => {
    e.preventDefault();
    dispatch(addTodo({ title: todo }));
    setTodo('');
  }

  return (
    <form onSubmit={handleSubmit} className='mb-5'>
      <input 
        className='addInput'
        type="text" 
        placeholder="Add a new todo" 
        value={todo} 
        onChange={(e) => setTodo(e.target.value)} />
      <button className='addBtn' type='submit'>Add</button>
    </form>
  )

}

export default TodoAdd;
