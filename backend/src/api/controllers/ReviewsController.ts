import { Request, Response } from "express";
import { addRating, addReview, getRating, getReview, getReviewCountForMovie, getMostRatedMovies, getCountOfRateForMovie } from "../models/Reviews";

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

  async getReviewCountForMovie(req: Request, res: Response) {
    const movieId = req.body.movieId;
    try {
      const response = await getReviewCountForMovie(movieId);
      res.status(200).json(response);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

  async getMostRatedMovies(req: Request, res: Response) {
    try {
      const response = await getMostRatedMovies();
      res.status(200).json(response);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

  async getCountOfRateForMovie(req: Request, res: Response) {
    const movieId = req.body.movieId;
    try {
      const response = await getCountOfRateForMovie(movieId);
      res.status(200).json(response);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

};

export default ReviewsController;
