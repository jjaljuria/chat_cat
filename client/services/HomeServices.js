export async function getHome(){
    const authorization = localStorage.getItem('authorization')

    if(!authorization) throw new Response('Unauthorized', {status: 401})

    const response = await fetch('http://localhost:3000', {
        headers:{
            'authorization': authorization
        }
    })

    if(response.status === 401){
        throw new Response('Unauthorized', {status: 401})
    }

    return await response.json()
}