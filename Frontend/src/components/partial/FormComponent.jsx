import '../../styles/form.css'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Api } from '../../services/Api';
import StorageService from '../../services/storageService';

export const FormComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [successLoged, setSuccessLogin] = useState(false);

  const handleSubmit = async (evt) => {
    evt.preventDefault()

    const body = {
      username: evt.target.username.value,
      password: evt.target.password.value
    }

    Api.post('login', { body })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          setError(res.message)
          setSuccessLogin(false)
        }
        else {
          Api.defaultHeaders.Authorization = `Bearer ${res.authorizationToken}`
          StorageService.setItem('token', res.authorizationToken)
          StorageService.setItem('roles', res.roles)
          navigate('/');
        }
      })
      .catch(err => {
        if (err.message) {
          setError(err.message)
          setSuccessLogin(false)
        }
        setError(String(err))
      })
  }


  return (
    <form className="w-1/3 bg-bg-100 border-2 flex flex-col items-center rounded-lg" onSubmit={handleSubmit}>
      <div className='w-full bg-primary-600 h-3 rounded-t-lg'></div>
      <div className='flex flex-col w-full justify-center items-center py-10'>
        <h3 className='text-primary-600 font-bold text-3xl mt-5 text-center'>Bienvenido</h3>
        <h5 className='text-center text-gray-500 mt-2'>Ingrese su información para entrar al sistema</h5>
        <div className='flex flex-col p-5 gap-3 w-2/3 mt-2'>
          <div className='flex flex-col gap-2'>
            <label className='text-gray-500 font-semibold' htmlFor="username">UserName</label>
            <FilledInput
              name='username'
              id="filled-adornment-username"
              type='text'
            />
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
          <input className='rounded-md h-12 px-5 mt-5 bg-primary-200 hover:bg-primary-100 transition-colors cursor-pointer text-white font-bold text-xl' type="submit" />
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