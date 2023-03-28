import { timeStamp } from "console";
import mongoose, { Document, Schema } from "mongoose";

export interface IWatchlist {
  userId: String;
  watchlistId: String;
}

export interface IWatchlistModel extends IWatchlist, Document {}

const WatchlistSchema = new Schema({
  userId: { type: String, required: true },
  movieId: String,
  status: String,
  last_update: Date,
});

const Watchlist = mongoose.model<IWatchlistModel>("Watchlist", WatchlistSchema);

export async function getWatchlist(userId: String) {
  if (userId === undefined) {
    throw "Oi! You forgot to pass userId!";
  }
  const watchlist = await Watchlist.find({ userId: userId });
  return watchlist;
}

export async function addMovieToWatchlist(
  userId: String,
  movieId: String,
  status: String
) {
  if (userId === undefined || movieId === undefined) {
    throw "Oi! You forgot to pass userId!";
  } else {
    const date = new Date();
    const watchlist = new Watchlist({
      userId: userId,
      movieId: movieId,
      status: status,
      last_update: date,
    });
    try {
      watchlist.save();
    } catch (err) {
      throw err;
    }
  }
}

export async function removeMovieFromWatchlist(
  userId: String,
  movieId: String
) {
  if (userId === undefined || movieId === undefined) {
    throw "Oi! You forgot to pass the userID!";
  }
  const response = await Watchlist.deleteOne({ userId: userId, movieId: movieId });
  console.log(response);
  if (response.deletedCount === 0) {
    throw "User not found";
  }
}

export async function clearWatchlist(
  userId: String
) {
  if (userId === undefined) {
    throw "Oi! You forgot to pass the userID!";
  }
  const response = await Watchlist.deleteOne({ userId: userId });
  console.log(response);
  if (response.deletedCount === 0) {
    throw "User not found";
  }
}

export default mongoose.model<IWatchlistModel>("Watchlist", WatchlistSchema);
