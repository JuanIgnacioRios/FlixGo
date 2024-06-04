import usersModel from "../dao/models/users.model.js"

class towatchListManager{
    constructor(){}

    async getMoviesFromList(userId){
        try{
            const user = await usersModel.findOne({_id: userId})
            if(user){
                return {status: "Success", payload: user.towatch_list}
            }
        }catch(error){
            return {status: "Error", error: error}
        }
    }

    async addMovieToList(userId, movieId){
        try {
            const user = await usersModel.findOne({ _id: userId });
            
            if (user) {
                const newToWatchList = user.towatch_list;
                
                if (!newToWatchList.includes(movieId)) {
                    newToWatchList.push(movieId);
                } else {
                    return {status: "Error", error: "Movie already in towatch list" };
                }
    
                await usersModel.updateOne({ _id: userId }, { towatch_list: newToWatchList });

                return {status: "Success", payload: newToWatchList};
            } else {
                return {status: "Error", error: "User not found" };
            }
        } catch (error) {
            return {status: "Error", error: error}
        }
    }

    async deleteMovieToToWatchList(userId, movieId) {
        try {
            const user = await usersModel.findOne({ _id: userId });

            if (!user) {
                return { status: "Error", error: "User not found" };
            }

            const newToWatchList = user.towatch_list;

            if (!newToWatchList.includes(movieId)) {
                return { status: "Error", error: "Movie does not exist in towatch list" };
            }

            const updatedToWatchList = newToWatchList.filter(movie => movie !== movieId);
            await usersModel.updateOne({ _id: userId }, { towatch_list: updatedToWatchList });
            return { status: "Success", payload: updatedToWatchList };
        } catch (error) {
            return {status: "Error", error: error}
        }
    }
}

export default towatchListManager