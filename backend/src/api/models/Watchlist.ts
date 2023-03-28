import { timeStamp } from "console";
import mongoose, {Document, Schema} from "mongoose";

export interface IWatchlist {
  userId: String;
  watchlistId: String;
}

export interface IWatchlistModel extends IWatchlist, Document {}

const WatchlistSchema = new Schema({
  userId: { type: String, required : true },
  watchlistId: String,
  movies: [String],
  status: String,
  movie_remove_date: String,
});


export default mongoose.model<IWatchlistModel>('Watchlist', WatchlistSchema)
