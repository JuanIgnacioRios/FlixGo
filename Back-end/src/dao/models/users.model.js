import mongoose from "mongoose";

const usersCollection = "users";

const usersSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    username: {
        type: String,
        index: true,
    },
    email: String,
    password: String,
    watched_list: Array,
    favourite_list: Array,
    towatch_list: Array
})

const usersModel = mongoose.model(usersCollection, usersSchema)

export default usersModel