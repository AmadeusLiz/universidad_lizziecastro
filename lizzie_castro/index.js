import './loadEnv.js'
import express from "express" // ES 6
import router from './routes/routes.js'

const PORT = 11000 // Puerto donde escucha express
const app = express() // Aplicacion (server) de express

// Definir el sistema de vistas (plantillas) a utilizar
app.set('view engine', 'pug')

// Definir la ubicacion de los archivos publicos
app.use(express.static('public'))

// Configuracion para procesar los formularios
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Routers
app.use('/', router)

// Servidor de express escuchando en el puerto
app.listen(PORT, () => console.log(`Listening PORT ${PORT}`))