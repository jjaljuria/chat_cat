import axios from 'axios';

const basename = 'http://localhost:3000'

export async function find(idConversation){
  try{
    const res = await fetch(`${basename}/conversation/${idConversation}`, {
      credentials: 'include'
    })
    return await res.json()
  }catch(error){
    console.error(error.message);
    return null
  }

}

export async function create(id){
  const result = await axios.post(`${basename}/conversation`, {id: String(id)}, {withCredentials: true})

  return result.data
}