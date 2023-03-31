import express, { Request, Response, Router } from "express";
import userRoute from "./routes/userRoute";
import movieRoute from "./routes/movieRoute";
import newsRoute from "./routes/newsRoute";
const router: Router = express.Router();

router.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "Base route",
  });
});

router.use("/user", userRoute());
router.use("/movie", movieRoute());
router.use("/news", newsRoute());

export default router;
