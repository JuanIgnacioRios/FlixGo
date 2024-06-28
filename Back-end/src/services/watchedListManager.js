import usersModel from "../dao/models/users.model.js"

class watchedListManager{
    constructor(){}

    async getMoviesFromList(userId){
        try{
            const user = await usersModel.findOne({_id: userId})
            if(user){
                return {status: "Success", payload: user.watched_list}
            }
        }catch(error){
            return {status: "Error", error: error}
        }
    }

    async addMovieToList(userId, movieId){
        try {
            const user = await usersModel.findOne({ _id: userId });
            
            if (user) {
                const newWatchedList = user.watched_list;
                
                if (!newWatchedList.includes(movieId)) {
                    newWatchedList.push(movieId);
                } else {
                    return {status: "Error", error: "La pelicula ya está en la lista" };
                }
    
                await usersModel.updateOne({ _id: userId }, { watched_list: newWatchedList });

                return {status: "Success", payload: newWatchedList};
            } else {
                return {status: "Error", error: "Usuario no encontrado" };
            }
        } catch (error) {
            return {status: "Error", error: error}
        }
    }

    async deleteMovieToWatchedList(userId, movieId) {
        try {
            const user = await usersModel.findOne({ _id: userId });

            if (!user) {
                return { status: "Error", error: "User not found" };
            }

            const newWatchedList = user.watched_list;

            if (!newWatchedList.includes(movieId)) {
                return { status: "Error", error: "Movie does not exist in watched list" };
            }

            const updatedWatchedList = newWatchedList.filter(movie => movie !== movieId);
            await usersModel.updateOne({ _id: userId }, { watched_list: updatedWatchedList });
            return { status: "Success", payload: updatedWatchedList };
        } catch (error) {
            return {status: "Error", error: error}
        }
    }
}

export default watchedListManager