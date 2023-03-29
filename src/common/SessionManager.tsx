export class SessionManager {
  isLoggedIn() {
    return !!localStorage.getItem("userID");
  }

  logout() {
    localStorage.removeItem("userID");
  }

  login(userID: string) {
    localStorage.setItem("userID", userID);
  }

  getUserID() {
    return localStorage.getItem("userID");
  }
}
