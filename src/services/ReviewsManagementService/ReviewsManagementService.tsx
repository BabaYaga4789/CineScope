import Movie from "@/common/Movie";
import { ReviewsManagementState } from "./ReviewsManagementEnum";

export default class ReviewsMagementService {
  static async getRating(movie: any) {
    // debugger;
    console.log("movie", movie);
    const response = await fetch("http://127.0.0.1:3000/reviews/get-rating/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movie: movie,
      }),
    });
    if (response.status === 200) {
      const body = await response.json();
      console.log("body",body);
      return body;
    } else {
      return ReviewsManagementState.ReviewsAddFailure;
    }
  }

  static async getReview(movie: any) {
    // debugger;
    console.log("movie", movie);
    const response = await fetch("http://127.0.0.1:3000/reviews/get-review/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movie: movie,
      }),
    });
    if (response.status === 200) {
      const body = await response.json();
      return body;
    } else {
      return ReviewsManagementState.ReviewsAddFailure;
    }
  }

  static async addRating(movie: any, email: any, rating: any, movieId:any) {
    // debugger;
    console.log("movie+email", movie, email, rating, movieId);
    const response = await fetch("http://127.0.0.1:3000/reviews/add-rating/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movie: movie,
        email: email,
        rating: rating,
        movieId: movieId
      }),
    });
    if (response.status === 200) {
      const body = await response.json();
      return body;
    } else {
      return ReviewsManagementState.ReviewsAddFailure;
    }
  }

  static async addReview(movie: any, email: any, review: any, movieId:any) {
    // debugger;
    console.log("movie+email", movie, email, review, movieId);
    const response = await fetch("http://127.0.0.1:3000/reviews/add-reviews/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movie: movie,
        email: email,
        review: review,
        movieId: movieId
      }),
    });
    if (response.status === 200) {
      const body = await response.json();
      return body;
    } else {
      return ReviewsManagementState.ReviewsAddFailure;
    }
  }

  static async getRatingCountForMovie(movieId: any){
    const response = await fetch("http://127.0.0.1:3000/reviews/count/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movieId: movieId
      }),
    });
    if (response.status === 200) {
      const body = await response.json();
      return body;
    } else {
      return ReviewsManagementState.ReviewsFetchFailure;
    }
  }

  static async getCountForRate(movieId: any){
    const response = await fetch("http://127.0.0.1:3000/reviews/rate-count/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movieId: movieId
      }),
    });
    if (response.status === 200) {
      const body = await response.json();
      return body;
    } else {
      return ReviewsManagementState.ReviewsFetchFailure;
    }
  }

}
