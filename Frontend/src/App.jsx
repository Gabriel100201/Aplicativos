import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/global/NavBar';
import { Login } from './views/Login';

function App() {
  return (
    <Router>
      <section className='h-[100vh]'>
        <NavBar roles={["admin"]}></NavBar>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='*' element={"Página no encontrada"} />
        </Routes>
      </section>
    </Router>
  )
}

export default App
