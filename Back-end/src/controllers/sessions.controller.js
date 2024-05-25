import usersModel from "../dao/models/users.model.js"
import { createHash, isValidPassword, generateToken, authToken } from '../../utils.js'

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
        delete user.password;
        const access_token = generateToken(user);
        res.send({ status: 'success', access_token });
    } catch (error) {
        return res.status(500).send({ status: 'error', error: error });
    }
}

export default {
    register,
    login
}