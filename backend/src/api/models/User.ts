import mongoose from "mongoose";

const Schema = mongoose.Schema;

const user = new Schema({
  email: String,
  password: String,
  userName: String,
  genres: [String],
  dob: Date,
});

interface Data {
  email: String;
  password: String;
  userName: String;
  genres: [String];
  dob: Date;
}

const User = mongoose.model("User", user);

export function getUserById(id: String) {
  if (id === undefined) {
    throw "Oi! You forgot to pass an id!";
  }

  const user = User.findById(id);
  return user;
}

export async function getUser(email: String) {
  if (email === undefined) {
    throw "Oi! You forgot to pass an email!";
  }
  const user = await User.find({ email: email });
  return user;
}

export async function createUser(
  email: String,
  password: String,
  userName: String,
  genres: [String],
  dob: Date
) {
  if (
    email === undefined ||
    password === undefined ||
    userName === undefined ||
    genres === undefined ||
    dob === undefined ||
    email === "" ||
    password === "" ||
    userName === ""
  ) {
    throw "Missing parameters";
  }

  const user = await getUser(email);
  if (user.length > 0) {
    throw "User already exists";
  }

  const newUser = new User({
    email: email,
    password: password,
    userName: userName,
    genres: genres,
    dob: dob,
  });
  try {
    await newUser.save();
  } catch (err) {
    throw err;
  }
}

export async function updateUser(user: Data) {
  if (user.email === undefined) {
    throw "Oi! You forgot to pass an email!";
  }

  const usr = await User.find({ email: user.email }).updateOne(user);

  if (usr.matchedCount === 0) {
    throw "User not found";
  } else if (usr.modifiedCount > 0) {
    console.log("User updated");
    return { message: "User updated" };
  }

  return { message: "No changes to user" };
}

export async function deleteUser(userID: String) {
  if (userID === undefined) {
    throw "Oi! You forgot to pass the userID!";
  }

  const response = await User.findByIdAndDelete(userID);

  if (response === null) {
    throw "User not found";
  }
}

export default mongoose.model("User", user);
