const authorization = localStorage.getItem('authorization')
const url = 'http://localhost:3000'

export async function find(idConversation){
    const res = await fetch(`${url}/conversation/${idConversation}`, {
      headers: {
      'authorization': authorization
      }
    })

    return await res.json()
}