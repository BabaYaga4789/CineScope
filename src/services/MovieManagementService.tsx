import Movie from "@/common/Movie";

export default class MovieMagementService {

  async addMovie(movie: Movie) {
    const response = await fetch("http://127.0.0.1:3000/movie/add-movie/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie)
    });
    if (response.status === 200) {
      return "Movie added successfully.";
    } else {
      return "Something went wrong. Please try again";
    }
  }

  async fetchLatestMovies() {
    const response = await fetch('http://127.0.0.1:3000/movie/fetch-latest-movies/', {
      method: "GET",
    });

    if (response.status === 200) {
      const body = await response.json();
      return body;
    } else {
      return null;
    }
  }

  async fetchAllMovies() {
    const response = await fetch('http://127.0.0.1:3000/movie/fetch-all-movies/', {
      method: "GET",
    });
    if (response.status === 200) {
      const body = await response.json();
      return body;
    } else {
      return null;
    }
  }

  async fetchMovieByID(id: any) {
    const response = await fetch('http://127.0.0.1:3000/movie/fetch-movie-by-id/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "movieId": id,
      })
    });
    if (response.status === 200) {
      const body = await response.json();
      return body;
    } else {
      return null;
    }
  }
}
