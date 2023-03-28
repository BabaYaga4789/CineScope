import express, { Request, Response, Router } from "express";
import userRoute from "./routes/userRoute";

const router: Router = express.Router();

router.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "Base route",
  });
});

router.use("/users", userRoute());

export default router;
