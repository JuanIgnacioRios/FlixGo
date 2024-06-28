import express from 'express'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

import sessionsRouter from './src/routes/sessions.router.js'
import usersRouter from './src/routes/users.router.js'
import watchedlistRouter from './src/routes/watchedlist.router.js'
import favouritelistRouter from './src/routes/favouritelist.router.js'
import towatchlistRouter from './src/routes/towatchlist.router.js'
import { authToken, __dirname } from './utils.js';

const app = express();
const PORT = 8080;
const swaggerOptions = {
    definition:{
        openapi: '3.0.1',
        info:{
            title: "Documentación de API FlixGo",
            subtitle: ""
        },
        apis: [`${__dirname}/docs/**/*.yaml`]
    }
}
const specs = swaggerJsdoc(swaggerOptions)


app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/sessions', sessionsRouter)
app.use('/api/users', usersRouter)
app.use('/api/watchedlist', authToken, watchedlistRouter)
app.use('/api/favouritelist', authToken, favouritelistRouter)
app.use('/api/towatchlist', authToken, towatchlistRouter)
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))


mongoose.connect("mongodb+srv://FlixGo:FlixGo12345@flixgo.ohim30t.mongodb.net/?retryWrites=true&w=majority&appName=FlixGo")
    .then(() => {
        console.log("Conectado a la Base de Datos")
    })
    .catch(error => {
        console.error("Error al conectarse a la Base de Datos", error)
    })



app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})