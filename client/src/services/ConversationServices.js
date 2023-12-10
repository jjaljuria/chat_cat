const url = 'http://localhost:3000'

export async function find(idConversation){
  try{
    const res = await fetch(`${url}/conversation/${idConversation}`, {
      credentials: 'include'
    })
    return await res.json()
  }catch(error){
    console.error(error.message);
    return null
  }

}