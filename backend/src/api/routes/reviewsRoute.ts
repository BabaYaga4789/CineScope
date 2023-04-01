import { Router } from "express";
import reviewsController from "../controllers/ReviewsController";

const reviewsRoute = (): Router => {
  const router = Router();

  router
    .route("/ratings/:movieID")
    .get(reviewsController.getRatings)
    .post(reviewsController.addRatings);

  router
    .route("/:movieID")
    .post(reviewsController.addReviews)
    .get(reviewsController.getReviews);

  router.route("/user/:userName").get(reviewsController.getReviewsByUser);

  //router.route("update-review").post(reviewsController.addReviews);

  return router;
};

export default reviewsRoute;
