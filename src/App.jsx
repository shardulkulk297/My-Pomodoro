import './App.css'
import { Routes, Route } from 'react-router-dom';
import Timer from './components/Timer';

function App() {


  return (
    <>
     
      <Routes>

        <Route index path='/' element={<Timer />} />
      </Routes>


    </>
  )
}

export default App
