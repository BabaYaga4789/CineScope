import { Router } from "express";
import movieController from "../controllers/MovieController";

const movieRoute = (): Router => {
  const router = Router();

  router.route("/add-movie/").post(movieController.createMovie);
  router.route("/fetch-latest-movies/").get(movieController.fetchLastestMovies);
  router.route("/search/").post(movieController.filterMovie);
  router.route("/fetch-all-movies/").get(movieController.fetchAllMovies);
  router.route("/fetch-movie-by-id/").post(movieController.fetchMovieById);
  router.route("/delete-movie-by-id/").delete(movieController.deleterMovieById);

  return router;
};

export default movieRoute;