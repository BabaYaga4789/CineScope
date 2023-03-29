export default class WatchlistService {
  async addToWatchlist(userId: string, movieId: string, status: string) {
    const response = await fetch("http://localhost:3000/watchlist/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, movieId, status }),
    });
    const body = await response.json();
    let m = body.message;

    if (response.status === 200) {
      return "Movie Successfully Added";
    } else {
      if (response.status === 500) {
        return "Movie Already Exists";
      }
      return "System Error";
    }
  }

  async removeFromWatchlist(userId: string, movieId: string) {
    const response = await fetch("http://localhost:3000/watchlist/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, movieId }),
    });
    const body = await response.json();
    let m = body.message;

    if (response.status === 200) {
      return "Movie Successfully Removed";
    } else {
      if (response.status === 500) {
        return "Movie cannot be Removed";
      }
      return "System Error";
    }
  }

  async updateWatchlist(userId: string, movieId: string, status: string) {
    const response = await fetch("http://localhost:3000/watchlist/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, movieId, status }),
    });
    const body = await response.json();
    let m = body.message;

    if (response.status === 200) {
      return "Movie Successfully Updated";
    } else {
      if (response.status === 500) {
        return "Movie cannot be Updated";
      }
      return "System Error";
    }
  }

  async getWatchlist(userId: string) {
    const response = await fetch("http://localhost:3000/watchlist/:userId/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    if (response.status === 200) {
        const body = await response.json();
        return body;
    } else {
      return "System Error";
    }
  }

  async clearWatchlist(userId: string) {
    const response = await fetch("http://localhost:3000/watchlist/:userId/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });
    if (response.status === 200) {
        return "Watchlist Cleared";
    } else {
      return "System Error";
    }
  }
}
