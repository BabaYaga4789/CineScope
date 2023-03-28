import { Router } from "express";
import userController from "../controllers/UserController";

const userRoute = (): Router => {
  const router = Router();

  router.route("/").post(userController.createUser);

  router
    .route("/:userId")
    .get(userController.getUserByID)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

  router.route("/login").post(userController.login);

  return router;
};

export default userRoute;
