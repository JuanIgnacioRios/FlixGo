import usersModel from "../dao/models/users.model.js";
import { createHash } from '../../utils.js'

async function changepassword(req, res) {
    const userId = req.params.uid
    const password = req.body
    let result = await usersModel.update({ _id: userId }, { password: createHash(password) })
    res.send(result)
}

async function changeemail(req, res) {
    const userId = req.params.uid
    const email = req.body
    let result = await usersModel.update({ _id: userId }, email)
    res.send(result)
}

export default {
    changepassword,
    changeemail
}