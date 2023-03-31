import { Router } from "express";
import userController from "../controllers/NewsController";

const newsRouter = (): Router => {
  const router = Router();

  router.route("/").post(userController.createNews);

  router
    .route("/:newsId")
    .get(userController.getNews)
    .put(userController.updateNews)
    .delete(userController.deleteNews);

  return router;
};

export default newsRouter;