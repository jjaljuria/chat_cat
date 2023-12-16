import * as LogoutServices from '../services/LogoutServices';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate()

    const logoutHandler = async (e) =>{
        e.preventDefault()
        await LogoutServices.lock()
        navigate('/login')
    }

    return (
        <form onSubmit={logoutHandler}>
            <button className="btn btn-danger" type="submit">Log out</button>
        </form>
    )
}
