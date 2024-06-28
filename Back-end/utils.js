import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

const PRIVATE_KEY = "flixgojwt"

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)

export const generateToken = (user) => {
    const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '24h' })
    return token
}
export const authToken = (req, res, next) => {
    let authHeader = req.headers.authorization;
    if (!authHeader) {
        authHeader = req.cookies.jwt
    } 
    if (!authHeader) {
        return res.status(401).send({ error: "No autenticado" })
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if (error) return res.status(403).send({ error: "No Autorizado" })
        req.user = credentials.user;
        next();
    })
}

export const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth:{
        user: "juanignaciorios2003@gmail.com",
        pass: "blgg gkch wheu scmo"
    }
})