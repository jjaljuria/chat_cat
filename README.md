# Chat Cat

Un simple chat web

## Instalación

> Importante:  
> se necesita una base de datos mysql o mariadb y una url en la variable DATABASE_URL en el arhivo .env ejemplo: 
> 
> "mysql://root:@localhost:3306/chat_cat"

Clonar el repositorio
```
git clone https://github.com/jjaljuria/chat_cat.git
```
Instalar dependencias
```
npm install 
o
pnpm install
```

Construir
```
npm run build
o
pnpm build
```

ejecute `npm start` e ingrese a `http://localhost:3000` en su navegador


## Comandos
```
/* ejecuta el servidor */ 
npm start o pnpm start

/* ejecuta en modo de desarrollo */
npm run dev o pnpm dev
```

## Variables de entorno
crea un archivo .env o agrega las variables en el package.json

* DATABASE_URL: la dirección url de la base de datos

* SESSION_SECRET: palabra que se usa para cifrar las sesiones, por defecto tiene el valor "secret"

* DEBUG: valor booleano que activa los mensajes de nivel debug, por defecto false
