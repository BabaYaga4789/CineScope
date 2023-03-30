import { Request, Response } from "express";
import { getRating} from "../models/Reviews";

const ReviewsController = {

  async getRatings(req: Request, res: Response){
    const movie = req.body.movie;
    try{
      const message = await getRating(movie);
      console.log("message",message)
      res.status(200).json(message[0].rating);
    } catch (err: any){
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  }
  
};

export default ReviewsController;
