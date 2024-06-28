import watchedListManager from "../services/watchedListManager.js";

const WatchedListManager = new watchedListManager()

async function getWatchedListMovies(req, res){
    const userId = req.params.uid
    if (!userId) {
        return res.status(400).send({ error: "User ID invalido" });
    }else{
        const result = await WatchedListManager.getMoviesFromList(userId)
        res.send(result)
    }
}

async function addMovieToWatchedList(req, res) {
    const userId = req.params.uid;
    const movieId = req.params.mid;
    
    if (!userId || !movieId) {
        return res.status(400).send({ error: "User ID o Movie ID invalido" });
    }else{
        const result = await WatchedListManager.addMovieToList(userId, movieId)
        res.send(result)
    }
}

async function deleteMovieToWatchedList(req, res){
    const userId = req.params.uid;
    const movieId = req.params.mid;

    if (!userId || !movieId) {
        return res.status(400).send({ error: "Invalid userId or movieId" });
    }else{
        const result = await WatchedListManager.deleteMovieToWatchedList(userId, movieId)
        res.send(result)
    }    
}

export default {
    getWatchedListMovies,
    addMovieToWatchedList,
    deleteMovieToWatchedList
}
