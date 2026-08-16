import { createFileRoute } from '@tanstack/react-router'
import { downloadImage } from '#/lib/downloader';
import { TodoItem } from '#/components/TodoItem';
import { useState } from 'react';


export const Route = createFileRoute('/')({
  component: App,
  loader: () => downloadImage()
})

function App() {

  const [todo, setTodo] = useState<string>('');

  const noMoreThan140 = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    const text = e.target.value;
    if (text.length <= 140) {
      setTodo(text)
    }
  }

  return (
    <main className="h-svh w-screen flex flex-col justify-center items-center">
      <section className='flex justify-center items-center flex-col'>
        <h1 className='text-4xl font-bold py-4'>Todo App</h1>
        <img src="/api/image" alt="" className='rounded-2xl' width={300} height={300} />
      </section>
      <div className='py-4 gap-2 w-full max-w-2xl flex'>
        <input
          type="text"
          max={140}
          value={todo}
          onChange={noMoreThan140}
          className='w-full flex-1 border-2 border-green-800 rounded-lg p-2'
          placeholder='Enter a new todo (max 140 characters)' />
        <button className='bg-green-800 text-white min-w-fit py-2 px-4 rounded-lg'>Send</button>
      </div>
      <div className='w-full max-w-2xl flex flex-col items-center'>
        <h2 className='text-3xl py-4 font-bold'>Todo</h2>
        <div className='w-full gap-2 flex flex-col'>
          <TodoItem text="Learn Kubernetes" />
          <TodoItem text="Deploy application to cluster" />
          <TodoItem text="Configure persistent volumes" />
        </div>
      </div>
    </main>
  )
}
