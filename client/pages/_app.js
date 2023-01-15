import '@/styles/globals.css'
import { TodoProvider } from '../context/TodoContext'

export default function App({ Component, pageProps }) {

  return (
    <TodoProvider>
      <div>
         <Component {...pageProps} />
      </div>
    </TodoProvider>

  )
}
