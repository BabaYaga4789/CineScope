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

    const movies = await Reviews.find({ movie: movie })
    console.log("movies",movies)
    return movies;

}

export default mongoose.model("Reviews", reviews);
