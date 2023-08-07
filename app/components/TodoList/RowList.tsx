import React from 'react'
import TodoItem from './TodoItem'

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

interface RowListProps {
    filteredTodos: Todo[];
}

const RowList: React.FC<RowListProps> = ({filteredTodos}) => {
    return (
        <div className='rowListWrapper'>
            <ul>
                {filteredTodos.map((todo) => (
                    <TodoItem listType='list' todo={todo} key={todo.id} />
                ))}
            </ul>
        </div>
    )
}

export default RowList