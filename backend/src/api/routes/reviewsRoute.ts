import { Router } from "express";
import reviewsController from "../controllers/ReviewsController";

const reviewsRoute = (): Router => {
  const router = Router();

  router.route("/get-rating/").post(reviewsController.getRatings);

  return router;
};

export default reviewsRoute;