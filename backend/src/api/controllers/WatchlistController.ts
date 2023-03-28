import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/User";
import Watchlist from "../models/Watchlist";


const readWatchlist = (req: Request, res: Response, next: NextFunction) => {
    
};


const readUser = (req: Request, res: Response, next: NextFunction) => {};
const createWatchlist = (req: Request, res: Response, next: NextFunction) => {};
const addToWatchlist = (req: Request, res: Response, next: NextFunction) => {};
const removeFromWatchlist = (req: Request, res: Response, next: NextFunction) => {};