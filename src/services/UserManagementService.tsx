import { SessionManager } from "@/common/SessionManager";
import { UserData } from "@/pages/Registration/UserData";

export default class UserManagementService {
  async register(data: UserData) {
    console.log(data);
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      return "Registration successful";
    } else {
      const body = await response.json();
      let m = body.message;

      if (response.status === 500 && m === "User already exists") {
        return "User already exists";
      }
      return "Registration failed";
    }
  }

  async login(username: string, password: string) {
    const response = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const body = await response.json();

    if (response.status === 404) {
      return "User not found";
    } else if (response.status === 200) {
      console.log('j=herer');
      SessionManager.login(body._id);
      return "Login successful";
    } else if (response.status === 401) {
      return "Incorrect password";
    }
    return "Login Successful";
  }

  async getUser(userID: string) {
    const response = await fetch(`http://localhost:3000/users/${userID}`, {
      method: "GET",
    });

    if (response.status === 200) {
      const body = await response.json();
      return body;
    } else {
      return null;
    }
  }

  async updateUser(userID: string, data: UserData) {
    const response = await fetch(`http://localhost:3000/users/${userID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      return "Update successful";
    } else {
      return "Update failed";
    }
  }

  async deleteUser(userID: string) {
    const response = await fetch(`http://localhost:3000/users/${userID}`, {
      method: "DELETE",
    });

    if (response.status === 200) {
      return "Delete successful";
    } else {
      return "Delete failed";
    }
  }

  async resetPassword(email: String) {
    const response = await fetch(
      "http://localhost:3000/users/reset?email=" + email,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return "Reset password link sent";
    } else if (response.status === 500) {
      return "User not found";
    }
  }
}
