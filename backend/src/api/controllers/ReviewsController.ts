import { Request, Response } from "express";
import { addRating, addReview, getRating, getReview } from "../models/Reviews";

const ReviewsController = {
  async getRatings(req: Request, res: Response) {
    const movie = req.body.movie;
    try {
      const message = await getRating(movie);
      const sum = message.reduce((accumulator, currentValue: any) => {
        return accumulator + (currentValue["rating"] ?? 0);
      }, 0);
      const average = sum / message.length;
      res.status(200).json(average);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

  async getReviews(req: Request, res: Response) {
    const movie = req.body.movie;
    try {
      const message = await getReview(movie);
      res.status(200).json(message);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

  async addRatings(req: Request, res: Response) {
    const movie = req.body.movie;
    const email = req.body.email;
    const rating = req.body.rating;
    const movieId = req.body.movieId;
    try {
      const message = await addRating(movie, email, rating, movieId);
      res.status(200).json(message);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

  
  //for update as well
  async addReviews(req: Request, res: Response) {
    const movie = req.body.movie;
    const email = req.body.email;
    const review = req.body.review;
    const movieId = req.body.movieId;
    try {
      const message = await addReview(movie, email, review, movieId);
      res.status(200).json(message);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },
};

export default ReviewsController;
