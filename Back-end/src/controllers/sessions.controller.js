import usersModel from "../dao/models/users.model.js"
import { createHash, isValidPassword, generateToken, authToken, transport} from '../../utils.js'
import { LocalStorage } from 'node-localstorage';
const localStorage = new LocalStorage('./scratch');

async function register(req, res) {
    const { first_name, last_name, username, email, password } = req.body
    const exist = await usersModel.findOne({ email: email })
    if (exist) return res.status(400).send({ status: "error", error: "Ya existe un usuario con ese email" });
    const newUser = {
        first_name,
        last_name,
        username,
        email,
        password: createHash(password),
        watched_list: [],
        favourite_list: [],
        towatch_list: []
    }
    let result = await usersModel.create(newUser)
    return res.status(200).send({ status: "success", payload: result })
}

async function login(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send({ status: 'error', error: 'Usuario y contraseña son requeridos' });
    }
    try {
        const user = await usersModel.findOne({ username: username });
        if (!user) {
            return res.status(400).send({ status: 'error', error: 'No existe usuario con ese username' });
        }
        if (!isValidPassword(user, password)) {
            return res.status(400).send({ status: 'error', error: 'Contraseña Incorrecta' });
        }
        const userWithoutPassword = {...user.toObject() };
        delete userWithoutPassword.password;
        const access_token = generateToken(userWithoutPassword);
        res.cookie('jwt', access_token, { httpOnly: false, maxAge: 10000 }).json({token: access_token, user: userWithoutPassword});
    } catch (error) {
        return res.status(500).send({ status: 'error', error: error });
    }
}


async function current(req, res) {
    const user = req.user
    res.send(user)
}

async function sendresetpasswordemail(req, res){
    const { email } = req.body
    try {
        let result = await usersModel.findOne({email})
        if(result){
            let token = generateToken({id: result.id, email:result.email, name: result.first_name});
            let emailresponse = await transport.sendMail({
                from: "juaniganciorios2003@gmail.com",
                to: email,
                subject: "FlixGo | Reestrablece tu contraseña",
                html:`
                <p>Hola! Como estas? <br></br> Espero puedas reestablecer tu contraseña <br></br></p>
                <a href=" http://localhost:5173/reset-password?token=${token}">Hacelo haciendo click acá</a>
                `
            })
            res.send({status:"success", email: "Email Enviado!"})
        }else{
            res.send({status:"Error", error:"No existe usuario con ese mail"})
        }
    } catch (error) {
        return res.status(500).send({ status: 'error', error: error });
    }
}

export default {
    register,
    login,
    current,
    sendresetpasswordemail
}