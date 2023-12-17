import axios from 'axios'
const basename = 'http://localhost:3000'

export async function lock() {
    try{
        const response = await axios.post(basename + '/logout', null, {
            withCredentials: true
        })

        if(response.status !== 200){
            throw new Error('Fail in logout')
        }
    }catch(error){
        console.error(error.message);
    }
}
