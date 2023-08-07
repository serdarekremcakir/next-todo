
import TodoAdd from './components/TodoList/TodoAdd'
import TodoList from './components/TodoList/TodoList'


export default function Home() {


  return (
    <main className='justify-center flex items-center flex-col '>
      <h1 className='my-4 font-bold text-3xl'>TodoList</h1>
      <TodoAdd />
      <TodoList />
    </main>
  )
}
