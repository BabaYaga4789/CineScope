import { Router } from "express";
import userController from "../controllers/UserController";

const userRoute = (): Router => {
  const router = Router();

  router.route("/").post(userController.createUser);

  router
    .route("/:userId")
    .get(userController.getUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

  return router;
};

export default userRoute;