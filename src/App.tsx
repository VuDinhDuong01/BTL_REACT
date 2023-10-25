import './App.css'
import {route} from './hooks/useRoutes'
function App() {


  return (
    <div className='bg-[red] w-[100px] h-[100px]'>{route()}</div>
  )
}

export default App
