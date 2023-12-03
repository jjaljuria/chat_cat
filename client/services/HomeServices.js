export async function getHome(){
    const response = await fetch('http://localhost:3000')
    if(response.status === 401){
        throw new Response('Unauthorized', {status: 401})
    }

    return await response.json()
}