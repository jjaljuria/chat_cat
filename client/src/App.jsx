import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },{
    path: '/login',
    element: <Login />
  }
])

function App() {

  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}

export default App
