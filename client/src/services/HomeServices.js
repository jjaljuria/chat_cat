const basename = 'http://localhost:3000'

export async function getHome(){


    const response = await fetch(basename, {
        credentials: 'include'
    })

    if(response.ok){
        return await response.json()
    }

    throw new Response(await response.text())
}