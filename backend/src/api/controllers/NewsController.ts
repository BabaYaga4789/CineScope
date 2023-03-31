import { Request, Response } from "express";
import { createNews, getNews, deleteNews } from "../models/News";

const NewsController = {
  async getNews(req: Request, res: Response) {
    const id = req.params.newsId;
    try {
      const news = await getNews(id);
      res.json(news);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

  async createNews(req: Request, res: Response) {
    const { newsTitle, posterLink, fullArticle, date, year, movieName, genre } = req.body;

    try {
      const news = await createNews(newsTitle, posterLink, fullArticle, date, year, movieName, genre);
      res.json(news);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

  async updateNews(req: Request, res: Response) {
    const { newsTitle, posterLink, fullArticle, date, year, movieName, genre } = req.body;
    try {
      const news = await createNews(newsTitle, posterLink, fullArticle, date, year, movieName, genre);
      res.json(news);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

  async deleteNews(req: Request, res: Response) {
    const id = req.params.NewsId;
    try {
      const news = await deleteNews(id);
      res.json(news);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },
};

export default NewsController;
