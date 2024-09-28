import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/global/NavBar';
import { Login } from './views/Login';
import { Users } from './views/Users';
function App() {
  return (
    <Router>
      <section className='h-[100vh]'>
        <NavBar></NavBar>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/users' element={<Users />} />
          <Route path='*' element={"Página no encontrada"} />
        </Routes>
      </section>
    </Router>
  )
}

export default App
