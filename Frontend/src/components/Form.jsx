import { useState } from 'react';
import { login } from '../services/login';
import '../styles/form.css'
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const Form = () => {

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [error, setError] = useState(null);
  const [successLoged, setSuccessLogin] = useState(false);

  const sendRequest = async (evt) => {
    evt.preventDefault()
    const formData = new FormData(evt.target);
    const data = Object.fromEntries(formData.entries());
    const response = await login(data);
    if (response.error) {
      setError(response.message)
      setSuccessLogin(false)
    }
    else {
      setError(null)
      setSuccessLogin(true)
      console.log(response);
    }
  }


  return (
    <form className="w-1/3 bg-red-100 flex flex-col items-center rounded-lg" onSubmit={sendRequest}>
      <div className='w-full bg-orange-600 h-3 rounded-t-lg'></div>
      <div className='flex flex-col w-full justify-center items-center py-10'>
        <h3 className='text-orange-600 font-bold text-3xl mt-5 text-center'>Bienvenido</h3>
        <h5 className='text-center text-gray-500 mt-2'>Ingrese su información para entrar al sistema</h5>
        <div className='flex flex-col p-5 gap-3 w-2/3 mt-2'>
          <div className='flex flex-col gap-2'>
            <label className='text-gray-500 font-semibold' htmlFor="user">UserName</label>
            <input name='user' id='user' className='rounded-md h-12 px-5 py-3' type="text" placeholder='Usuario...' />
          </div>
          <div className='flex flex-col gap-2'>
            <label className='text-gray-500 font-semibold' htmlFor="password">Password</label>
            <FilledInput
              name='password'
              id="filled-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>
          <input className='rounded-md h-12 px-5 mt-5 bg-orange-600 hover:bg-orange-500 transition-colors cursor-pointer text-white font-bold text-xl' type="submit" />
        </div>
        {
          successLoged && (
            <span className='text-green-600 text-center'>Ingreso Correcto</span>
          )
        }
        {
          error && (
            <span className='text-red-600 text-center'>{error}</span>
          )
        }
      </div>
    </form>
  )
}