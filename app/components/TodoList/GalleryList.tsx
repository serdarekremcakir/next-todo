import React from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

// or other themes
import '@splidejs/react-splide/css/sea-green';

// or only core styles
import '@splidejs/react-splide/css/core';

import TodoItem from './TodoItem';


interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface RowListProps {
  filteredTodos: Todo[];
}

const GalleryList: React.FC<RowListProps> = ({ filteredTodos }) => {
  return (
    <div style={{ width: '100%', maxWidth: '100%', margin: '0 auto', marginTop: '-30px'}}>
      <Splide options={{
        rewind: true,
        gap: '2rem',
        perPage: 4,
        breakpoints: {
          640: {
            perPage: 1,
            pagination: false,
          },
          768: {
            perPage: 2,
        
          },
          1024: {
            perPage:3,
          },
          1440: {
            perPage:4,
          },
        },
      }}>

        {filteredTodos.map((todo) => (
          <SplideSlide key={todo.id}>
            <TodoItem listType="gallery" todo={todo} />
          </SplideSlide>
        ))}
       
      </Splide>
    </div>
  )
}

export default GalleryList