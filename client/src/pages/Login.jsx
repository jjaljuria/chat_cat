import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { login as LoginServices } from '../../services/LoginServices.js';

export default function login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const formHandler = async (e)=>{
    e.preventDefault()

    const token = await LoginServices({email, password})
  
    if(!token){
      return
    }
    
    localStorage.setItem('authorization', token)
    navigate('/')
  }

  return (
    <div className="container mt-4 text-center">
      <h1>Login</h1>
      <form id="formLogin" method="post" action="/login" onSubmit={formHandler} className="row">
        <div className="col-12 col-md-4 mx-auto rounded bg-light py-3 border border-1">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              aria-describedby="emailfield"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="text"
              className="form-control"
              id="password"
              aria-describedby="passwordfield"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="">
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>  
  )
}
