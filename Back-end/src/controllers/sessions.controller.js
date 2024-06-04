import usersModel from "../dao/models/users.model.js"
import { createHash, isValidPassword, generateToken, authToken } from '../../utils.js'
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

/*async function login(req, res) {
    const { username, password } = req.body
    const user = usersModel.findOne({ username: username })
    if (!user) return res.status(400).send({ status: error, error: "No existe usuario con ese username" })
    if (!isValidPassword(user, password)) return res.status(400).send({ status: error, error: "Contraseña Incorrecta" })
    delete user.password
    const access_token = generateToken(user);
    res.send({ status: "success", access_token })
}*/

async function login(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send({ status: 'error', error: 'Username and password are required' });
    }
    try {
        const user = await usersModel.findOne({ username: username });
        if (!user) {
            return res.status(400).send({ status: 'error', error: 'No existe usuario con ese username' });
        }
        if (!isValidPassword(user, password)) {
            return res.status(400).send({ status: 'error', error: 'Contraseña Incorrecta' });
        }
        // Crear un nuevo objeto de usuario sin el campo de contraseña
        const userWithoutPassword = {...user.toObject() };
        delete userWithoutPassword.password;
        // Generar token de acceso
        const access_token = generateToken(userWithoutPassword);
        // Establecer la cookie de JWT
        console.log(access_token)
        res.cookie('jwt', access_token, { maxAge: 10000 }).json(userWithoutPassword);
    } catch (error) {
        return res.status(500).send({ status: 'error', error: error });
    }
}


async function current(req, res) {
    const user = req.user
    console.log(req.user.watched_list)
    localStorage.setItem('watched_list', req.user.watched_list)
    localStorage.setItem('favourite_list', req.user.favourite_list)
    localStorage.setItem('towatch_list', req.user.towatch_list)
    res.send(user)
}

export default {
    register,
    login,
    current
}