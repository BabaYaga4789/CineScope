import express, { Request, Response, Router } from "express";
import UserRoute from "./routes/UserRoute";
import movieRoute from "./routes/movieRoute";
const router: Router = express.Router();

router.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "Base route",
  });
});

router.use("/users", UserRoute());
router.use("/movie", movieRoute());

export default router;
