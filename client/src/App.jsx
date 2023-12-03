import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Error from './components/Error.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import { getHome } from '../services/HomeServices';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />,
    loader: getHome
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
