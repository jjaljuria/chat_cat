# Chat Cat

Un simple chat web

## Instalación

Ejecute el siguientes comando:

Clonar el repositorio
```
git clone https://github.com/jjaljuria/chat_cat.git
```
Instalar dependencias
```
npm install
```
ejecute `npm start` e ingrese a `http://localhost:3000` en su navegador
## Comandos
```
/* ejecuta el servidor */ 
npm start

/* ejecuta en modo de desarrollo */
npm run dev
```

## Variables de entorno
crea un archivo .env o agrega las variables en el package.json

* DATABASE_URL: la dirección de la base de datos, si no se específica, hace referencia al localhost

* SESSION_SECRET: palabra que se usa para cifrar las sesiones, por defecto tiene el valor "secret"

* DEBUG: valor booleano que activa los mensajes de nivel debug, por defecto false
