import './App.css'
import { Routes, Route } from 'react-router-dom';
import Timer from './components/Timer';
import { Toaster } from 'react-hot-toast';

function App() {


  return (
    <>
     <Toaster position='top-center'></Toaster>
      <Routes>

        <Route index path='/' element={<Timer />} />
      </Routes>


    </>
  )
}

export default App
