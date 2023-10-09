window.addEventListener('DOMContentLoaded',()=>{
    const formLogin = document.getElementById('formLogin')

    formLogin.addEventListener('submit', async (e) =>{
        e.preventDefault();

        const data = new URLSearchParams(new FormData(formLogin))

        const res = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data,
        })
        const token = await res.json()
        
        sessionStorage.setItem('chat_token', JSON.stringify(token))
    })
})
