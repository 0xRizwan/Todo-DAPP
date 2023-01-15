import '@/styles/globals.css'
import { TodoProvider } from '../context/TodoContext'

const App = ({ Component, pageProps }) => {

  return (
    <TodoProvider>
      <div>
         <Component {...pageProps} />
      </div>
    </TodoProvider>

  )
}
export default App;
