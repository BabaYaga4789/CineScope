import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reviews = new Schema({
  email: String,
  movie: String,
  rating: Number,
  review: String,
  review_date: Date,
  rating_date: Date,
  flag: Boolean,
  movieId: String,
});

const Reviews = mongoose.model("Reviews", reviews);

/*retrieves rating from database*/
export async function getRating(movie: any) {
  const movies = await Reviews.find({ movie: movie });
  return movies;
}

/*retrieves review from database*/
export async function getReview(movie: any) {
  const movies = await Reviews.find({ movie: movie });
  return movies;
}

/*adds rating to database*/
export async function addRating(
  movie: any,
  email: any,
  rating: any,
  movieId: any
) {
  const currentDate = Date.now();
  const filter = { email: email, movie: movie };
  const update = {
    rating: rating,
    rating_date: currentDate,
    flag: false,
    movieId: movieId,
  };

  //https://mongoosejs.com/docs/api/model.html#model_Model.findOneAndUpdate
  //https://www.appsloveworld.com/nodejs/100/3/mongoose-create-document-if-not-exists-otherwise-update-return-document-in-e
  const options = { upsert: true, new: true, setDefaultsOnInsert: true };

  const addedRating = await Reviews.findOneAndUpdate(filter, update, options);

  return addedRating;
}

/* to add or update a review to database*/
export async function addReview(
  movie: any,
  email: any,
  review: any,
  movieId: any
) {
  const currentDate = Date.now();
  const filter = { email: email, movie: movie };
  const update = {
    review: review,
    review_date: currentDate,
    flag: false,
    movieId: movieId,
  };

  const options = { upsert: true, new: true, setDefaultsOnInsert: true };
  const addedReview = await Reviews.findOneAndUpdate(filter, update, options);

  return addedReview;
}

export default mongoose.model("Reviews", reviews);
