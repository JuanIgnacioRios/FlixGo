import express from 'express'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors'

import sessionsRouter from './src/routes/sessions.router.js'
import usersRouter from './src/routes/users.router.js'
import watchedlistRouter from './src/routes/watchedlist.router.js'
import favouritelistRouter from './src/routes/favouritelist.router.js'
import towatchlistRouter from './src/routes/towatchlist.router.js'
import { authToken } from './utils.js';

const app = express();
const PORT = 8080;


app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/sessions', sessionsRouter)
app.use('/api/users', usersRouter)
app.use('/api/watchedlist', watchedlistRouter)
app.use('/api/favouritelist', favouritelistRouter)
app.use('/api/towatchlist', towatchlistRouter)
app.get('/movies', authToken, (req, res) => {
    res.send("entro")
})


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