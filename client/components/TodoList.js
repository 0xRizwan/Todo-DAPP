import Navbar from './Navbar'
import { useContext } from 'react'
import { IoMdAddCircle } from 'react-icons/io'
import { TodoContext } from '../context/TodoContext'
import Task from './Task'

const TodoList = () => {
  const {input, setInput, addTask, tasks, deleteTask} = useContext(TodoContext)

  
  return (
<div className='w-[70%] bg-[#1E90FF] py-4 px-9 rounded-[30px] '>
  <Navbar />
  <h2 className='text-2xl bolder text-white pb-4'>
    Hello, What&apos;s up!
  </h2>
  <div className='py-3 text-[#e5e7eb] text-xl '>Tasks for Today</div>
  <form className='flex items-center justify-center'>
    <input
      className='rounded-[10px] w-full p-[10px] border-none outline-none bg-[#1d4885] text-white mb-[10px]'
      placeholder='Add a task for today...'
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
    <IoMdAddCircle
      onClick={addTask}
      className='text-[#f9cc63] text-[60px] cursor-pointer ml-[20px] mb-[10px]'
    />
  </form>
  <ul>
    {tasks.map((item,id) => (
      <Task 
           key={item.id}
           taskText={item.taskText}
           handleClick={deleteTask(item.id)}
      />
    ))}
  </ul>
</div>


  )





}





export default TodoList