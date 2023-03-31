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

// interface Data {
//     email: String;
//     movie: String;
//     rating: Number;
//     review: String;
//     review_date: Date;
//     rating_date: Date;
//     flag: Boolean;
//   }

const Reviews = mongoose.model("Reviews", reviews);

// Use the find method to search for documents where the name field is equal to "John"
// MyDataModel.find({ name: 'John' }, (err, docs) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(docs);
//     }
//   });

export async function getRating(movie: any) {
  const movies = await Reviews.find({ movie: movie });
  return movies;
}

export async function getReview (movie: any) {
  const movies = await Reviews.find({ movie: movie });
  return movies;
}

export async function addRating(movie: any, email: any, rating: any, movieId:any) {
  const currentDate = Date.now(); 
  const filter = { email: email, movie: movie }; // DefXine the filter to find the document
  const update = { rating : rating, rating_date: currentDate, flag:false, movieId: movieId }; // Define the update

  // Set the `upsert` option to `true` if you want to create the document if it doesn't exist
  const options = { upsert: true, new: true, setDefaultsOnInsert: true };

  // Use the `findOneAndUpdate()` method to add or update the field
  const addedRating = await Reviews.findOneAndUpdate(filter, update, options);
  console.log("addedRating", addedRating);
  return addedRating;
}


export async function addReview(movie: any, email: any, review: any, movieId:any) {
  const currentDate = Date.now(); 
  const filter = { email: email, movie: movie }; // Define the filter to find the document
  const update = { review: review, review_date: currentDate, flag:false, movieId: movieId }; // Define the update

  // Set the `upsert` option to `true` if you want to create the document if it doesn't exist
  const options = { upsert: true, new: true, setDefaultsOnInsert: true };

  // Use the `findOneAndUpdate()` method to add or update the field
  const addedReview = await Reviews.findOneAndUpdate(filter, update, options);
  console.log("addedReview", addedReview);
  return addedReview;
}

export default mongoose.model("Reviews", reviews);
