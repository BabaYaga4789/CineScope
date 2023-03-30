import express, { Request, Response, Router } from "express";
import userRoute from "./routes/userRoute";
import movieRoute from "./routes/movieRoute";
import reviewsRoute from "./routes/reviewsRoute";
const router: Router = express.Router();

router.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "Base route",
  });
});

router.use("/users", userRoute());
router.use("/movie", movieRoute());
router.use("/reviews", reviewsRoute());

export default router;
