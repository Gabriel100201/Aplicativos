import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/global/NavBar';
import { Login } from './views/Login';
import { Users } from './views/Users';
import {Torneo} from './views/Torneo';
import LigaProfesional from './views/Partidos';
import { Home } from './views/Home';
import { NotFound } from './components/global/404Error';


function App() {
  return (
    <Router>
      <section className='h-[100vh]'>
        <NavBar></NavBar>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/users' element={<Users />} />
          <Route path='/torneo' element={<Torneo />} />
          <Route path='/partidos' element={<LigaProfesional/>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </section>
    </Router>
  )
}

export default App
