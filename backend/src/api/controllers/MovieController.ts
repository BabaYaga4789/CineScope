import { Request, Response } from "express";
import { createMovie, fetchLastestMovies, searchMovie, filterMovie } from "../models/Movie";

const MovieController = {

    async fetchLastestMovies(req: Request, res: Response) {
      try {
        const movies = await fetchLastestMovies();
        res.status(200).json(movies);
      } catch (err: any) {
        console.log(err);
        res.status(500).json({ message: err.message ?? err });
      }
    },

  async createMovie(req: Request, res: Response) {
    const {
      title,
      released_date,
      director,
      genres,
      time_in_minutes,
      plot,
      cast,
      images,
      thumbnail,
      poster,
      trailor
    } = req.body;
    console.log(req);
    try {
      const movie = await createMovie(
        title,
      released_date,
      director,
      genres,
      time_in_minutes,
      plot,
      cast,
      images,
      thumbnail,
      poster,
      trailor
      );
      res.status(200).json(movie);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

  async searchMovie(req: Request, res: Response){
    const keyword = req.params.keyword;
    try{
      const movies = await searchMovie(keyword);
      res.json(movies);
    } catch (err: any){
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

  async filterMovie(req: Request, res: Response){
    const{
      keyword,
      ratings,
      genre,
      year
    } = req.body;
    
    if (keyword){
      try{
        const movies = await searchMovie(keyword);
        res.json(movies);
      } catch (err: any){
        console.log(err);
        res.status(500).json({ message: err.message ?? err });
      }
    }
    else{
      try{
        const movies = await filterMovie(ratings, genre, year);
        res.json(movies);
      } catch (err: any){
        console.log(err);
        res.status(500).json({ message: err.message ?? err });
      }
    }
  },
  //   async updateUser(req: Request, res: Response) {
  //     const { email, password, name, displayName, genres } = req.body;
  //     try {
  //       const user = await createUser(email, password, name, displayName, genres);
  //       res.json(user);
  //     } catch (err: any) {
  //       console.log(err);
  //       res.status(500).json({ message: err.message ?? err });
  //     }
  //   },

  //   async deleteUser(req: Request, res: Response) {
  //     const id = req.params.userId;
  //     try {
  //       const user = await deleteUser(id);
  //       res.json(user);
  //     } catch (err: any) {
  //       console.log(err);
  //       res.status(500).json({ message: err.message ?? err });
  //     }
  //   },
};

export default MovieController;
