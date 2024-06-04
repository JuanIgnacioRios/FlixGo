import towatchListManager from "../services/towatchListManager.js";

const ToWatchListManager = new towatchListManager()

async function getToWatchListMovies(req, res){
    const userId = req.params.uid
    if (!userId) {
        return res.status(400).send({ error: "Invalid userId" });
    }else{
        const result = await ToWatchListManager.getMoviesFromList(userId)
        res.send(result)
    }
}

async function addMovieToToWatchList(req, res) {
    const userId = req.params.uid;
    const movieId = req.params.mid;
    
    if (!userId || !movieId) {
        return res.status(400).send({ error: "Invalid userId or movieId" });
    }else{
        const result = await ToWatchListManager.addMovieToList(userId, movieId)
        res.send(result)
    }
}

async function deleteMovieToToWatchList(req, res){
    const userId = req.params.uid;
    const movieId = req.params.mid;

    if (!userId || !movieId) {
        return res.status(400).send({ error: "Invalid userId or movieId" });
    }else{
        const result = await ToWatchListManager.deleteMovieToToWatchList(userId, movieId)
        res.send(result)
    }    
}

export default {
    getToWatchListMovies,
    addMovieToToWatchList,
    deleteMovieToToWatchList
}
