import favouriteListManager from "../services/favouriteListManager.js";

const FavouriteListManager = new favouriteListManager()

async function getFavouriteListMovies(req, res){
    const userId = req.params.uid
    if (!userId) {
        return res.status(400).send({ error: "Invalid userId" });
    }else{
        const result = await FavouriteListManager.getMoviesFromList(userId)
        res.send(result)
    }
}

async function addMovieToFavouriteList(req, res) {
    const userId = req.params.uid;
    const movieId = req.params.mid;
    
    if (!userId || !movieId) {
        return res.status(400).send({ error: "Invalid userId or movieId" });
    }else{
        const result = await FavouriteListManager.addMovieToList(userId, movieId)
        res.send(result)
    }
}

async function deleteMovieToFavouriteList(req, res){
    const userId = req.params.uid;
    const movieId = req.params.mid;

    if (!userId || !movieId) {
        return res.status(400).send({ error: "Invalid userId or movieId" });
    }else{
        const result = await FavouriteListManager.deleteMovieToFavouriteList(userId, movieId)
        res.send(result)
    }    
}

export default {
    getFavouriteListMovies,
    addMovieToFavouriteList,
    deleteMovieToFavouriteList
}
