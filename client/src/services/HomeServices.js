const basename = 'http://localhost:3000'

export async function getHome(){


    const response = await fetch(basename, {
        credentials: 'include'
    })

    if(response.status === 401){
        throw new Response('Unauthorized', {status: 401})
    }

    return await response.json()
}