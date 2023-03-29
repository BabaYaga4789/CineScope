import mongoose from "mongoose";

const Schema = mongoose.Schema;

const movie = new Schema({
  title: String,
  released_date: Date,
  director: String,
  genres: [String],
  time_in_minutes: String,
  plot: String,
  cast:[String],
  images: [String],
  thumbnail: String,
  poster: String,
  trailor: String
});

const Movie = mongoose.model("Movie", movie);

export function fetchLastestMovies() {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  const movies = Movie.find({ released_date: { $gte: oneMonthAgo } }) .sort('-released_date')
  return movies;
}

export function fetchAllMovies() {
  const movies = Movie.find({})
  return movies;
}

export async function createMovie(
    title: String,
    released_date: Date,
    director: String,
    genres: [String],
    time_in_minutes: String,
    plot: String,
    cast:[String],
    images: [String],
    thumbnail: String,
    poster: String,
    trailor: String
) {
  if (
    title === undefined ||
    released_date === undefined ||
    director === undefined ||
    genres === undefined ||
    time_in_minutes === undefined ||
    plot === undefined ||
    cast === undefined ||
    images === undefined || 
    thumbnail === undefined ||
    poster === undefined || 
    trailor == undefined
  ) {
    throw "Missing parameters";
  }

  const newMovie = new Movie({
    title: title,
    released_date: released_date,
    director: director,
    genres: genres,
    time_in_minutes: time_in_minutes,
    plot: plot,
    cast:cast,
    images: images,
    thumbnail: thumbnail,
    poster: poster,
    trailor: trailor
  });
  try {
    newMovie.save();
  } catch (err) {
    throw err;
  }
}

export function searchMovie(keyword: any){
  try {
    if(keyword == "" || keyword == null){
      const movies = Movie.find();
      return movies;
    }
    else{
      const regex = new RegExp(keyword, "i");
      const movies = Movie.find({title:{ $regex: regex } });
      return movies;
    }
  } catch (err) {
    throw err;         
  }
}

export function filterMovie(ratings: any, genre: any, year: any){
  try {
    let filteredMovies = {};
    const query = {} as any;

    if (year){
      const isoYear = new Date(`${year}-01-01T00:00:00.000Z`).toISOString();
      query.released_date = { $gte: isoYear, $lt: `${parseInt(year)+1}-01-01T00:00:00.000Z` };
      // filteredMovies = Movie.find({ released_date: { $gte: isoYear, $lt: `${parseInt(year)+1}-01-01T00:00:00.000Z` } });
    }
    if (genre){
      query.genres = { $all: genre };
      // filteredMovies = Movie.find({ genres: { $all: genre } });
    }
    if (ratings){
        
    }
    filteredMovies = Movie.find(query);
    return filteredMovies;
  } catch (err) {
    throw err;         
  }
}

export function fetchAllMovies(){
  try {
      const movies = Movie.find();
      return movies;
  } catch (err) {
    throw err;         
  }
}

export function fetchMovieById(id: any){
  try {
    const movie = Movie.findById(id);
      return movie;
  } catch (err) {
    throw err;         
  }
}

export default mongoose.model("Movie", movie);
