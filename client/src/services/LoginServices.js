import axios from 'axios';

export async function login({email, password}){
    const res = await axios.post('http://localhost:3000/login', {email, password},{withCredentials: true})
    
    return res.status
}