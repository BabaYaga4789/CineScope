import express, { Request, Response, Router } from "express";
import userRoute from "./routes/userRoute";
import movieRoute from "./routes/movieRoute";
import watchlistRoute from "./routes/watchlistRoutes";
const router: Router = express.Router();

router.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "Base route",
  });
});

router.use("/users", userRoute());
router.use("/movie", movieRoute());
router.use("/watchlist", watchlistRoute());

export default router;
