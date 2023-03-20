import express, { Request, Response, Router } from "express";
// import authentication from './authentication';

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Base route",
  });
});

// router.use('/authentication', authentication);

export default router;
