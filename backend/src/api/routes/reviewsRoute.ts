import { Router } from "express";
import reviewsController from "../controllers/ReviewsController";

const reviewsRoute = (): Router => {
  const router = Router();

  router.route("/get-rating/").post(reviewsController.getRatings);
  router.route("/get-review/").post(reviewsController.getReviews);
  router.route("/add-rating/").post(reviewsController.addRatings);
  router.route("/add-reviews/").post(reviewsController.addReviews);
  //router.route("update-review").post(reviewsController.addReviews);

  return router;
};

export default reviewsRoute;