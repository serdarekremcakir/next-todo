import React, { useState, memo, useCallback } from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { useDispatch } from '../../redux/store';
import { removeTodo, toggleComplete, editTodo } from '../../redux/slices/todoSlice';
import Image from 'next/image';
import todoImage from '../../assets/todo.png'

interface Types {
    todo: {
        id: number;
        title: string;
        completed: boolean;
    }
    listType: string;
}

const TodoItem = ({ todo, listType }: Types) => {
    const dispatch = useDispatch();
    const [editing, setEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(todo.title);

    const deleteTodo = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        dispatch(removeTodo(todo.id));
    }, [dispatch, todo.id]);

    const toggleTodoState = useCallback(() => {
        dispatch(toggleComplete(todo.id));
    }, [dispatch, todo.id]);

    const handleEdit = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setEditing(true);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.target.value);
    }

    const handleSave = useCallback((id: number, e: React.MouseEvent<HTMLButtonElement>) => {
        setEditing(false);
        e.stopPropagation();
        dispatch(editTodo({ id: id, title: newTitle }));
    }, [dispatch, todo.id, newTitle]);


    const wrapper = `${listType === 'gallery' ? 'galleryWrapper' : 'listWrapper'} ${todo.completed ? 'line-through bg-green-600' : ''}`;


    

    return (
        <div onClick={() => toggleTodoState()} className={wrapper} key={todo.id}>
            {listType === 'gallery' && <Image className='galleryImg' src={todoImage} alt="Image 2" />}
            {editing ? (
                <div className='itemEditWrapper'>
                    <input className='itemEditInput' type="text" value={newTitle} onChange={handleChange} onClick={(e) => e.stopPropagation()}/>
                    <button onClick={(e) => handleSave(todo.id, e)} className='itemEditSaveBtn' type='submit'>Save</button>
                </div>
            ) : (
                <>
                    <span className='itemTitle' >
                        {todo.id} - {todo.title}
                    </span>
                </>
            )}
            <div className='flex'>
                <button onClick={(e) => deleteTodo(e)} className='itemActionBtn group'>
                    <AiOutlineDelete className="h-5 group-hover:fill-red-500" />
                </button>
                <button onClick={(e) => handleEdit(e)} className='itemActionBtn group'>
                    <AiOutlineEdit className="h-5 group-hover:fill-yellow-300" />
                </button>
            </div>
        </div>
    )
}

export default memo(TodoItem);
