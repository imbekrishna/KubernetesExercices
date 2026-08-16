import { createFileRoute } from '@tanstack/react-router'
import { downloadImage } from '#/lib/downloader';


export const Route = createFileRoute('/')({
  component: App,
  loader: () => downloadImage()
})

function App() {

  return (
    <main className="bg-red-100 h-svh flex justify-center items-center">
      <section className='flex justify-center items-center flex-col'>
        <h1 className='text-3xl font-bold py-4'>Todo App</h1>
        <img src="/api/image" alt="" className='rounded-2xl' width={300} height={300} />
      </section>
    </main>
  )
}
