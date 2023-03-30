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
      return body;
    } else {
      return ReviewsManagementState.ReviewsAddFailure;
    }
  }
}
