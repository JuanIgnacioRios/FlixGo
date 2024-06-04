import usersModel from "../dao/models/users.model.js"

class favouriteListManager{
    constructor(){}

    async getMoviesFromList(userId){
        try{
            const user = await usersModel.findOne({_id: userId})
            if(user){
                return {status: "Success", payload: user.favourite_list}
            }
        }catch(error){
            return {status: "Error", error: error}
        }
    }

    async addMovieToList(userId, movieId){
        try {
            const user = await usersModel.findOne({ _id: userId });
            
            if (user) {
                const newFavouriteList = user.favourite_list;
                
                if (!newFavouriteList.includes(movieId)) {
                    newFavouriteList.push(movieId);
                } else {
                    return {status: "Error", error: "Movie already in favourite list" };
                }
    
                await usersModel.updateOne({ _id: userId }, { favourite_list: newFavouriteList });

                return {status: "Success", payload: newFavouriteList};
            } else {
                return {status: "Error", error: "User not found" };
            }
        } catch (error) {
            return {status: "Error", error: error}
        }
    }

    async deleteMovieToFavouriteList(userId, movieId) {
        try {
            const user = await usersModel.findOne({ _id: userId });

            if (!user) {
                return { status: "Error", error: "User not found" };
            }

            const newFavouriteList = user.favourite_list;

            if (!newFavouriteList.includes(movieId)) {
                return { status: "Error", error: "Movie does not exist in favourite list" };
            }

            const updatedFavouriteList = newFavouriteList.filter(movie => movie !== movieId);
            await usersModel.updateOne({ _id: userId }, { favourite_list: updatedFavouriteList });
            return { status: "Success", payload: updatedFavouriteList };
        } catch (error) {
            return {status: "Error", error: error}
        }
    }
}

export default favouriteListManager