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

//   const user = await getUser(email);
//   console.log(typeof user);
//   if (user.length > 0) {
//     throw "User already exists";
//   }

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

// export function updateUser(user: any) {
//   if (user.email === undefined) {
//     throw "Oi! You forgot to pass an email!";
//   }

//   const usr = User.find({ email: user.email }).updateOne(user);
//   return usr;
// }

// export async function deleteUser(userID: String) {
//   if (userID === undefined) {
//     throw "Oi! You forgot to pass the userID!";
//   }

//   const response = await User.deleteOne({ email: userID });

//   console.log(response);
//   if (response.deletedCount === 0) {
//     throw "User not found";
//   }
// }

export default mongoose.model("Movie", movie);
