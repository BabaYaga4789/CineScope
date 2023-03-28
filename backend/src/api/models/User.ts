import mongoose from "mongoose";

const Schema = mongoose.Schema;

const user = new Schema({
  email: String,
  password: String,
  displayName: String,
  genres: [String],
  dob: Date,
});

const User = mongoose.model("User", user);

export function getUserById(id: String) {
  if (id === undefined) {
    throw "Oi! You forgot to pass an id!";
  }

  const user = User.findById(id);
  return user;
}

export function getUser(email: String) {
  if (email === undefined) {
    throw "Oi! You forgot to pass an email!";
  }
  const user = User.find({ email: email });
  return user;
}

export async function createUser(
  email: String,
  password: String,
  displayName: String,
  genres: [String],
  dob: Date
) {
  if (
    email === undefined ||
    password === undefined ||
    displayName === undefined ||
    genres === undefined ||
    dob === undefined ||
    email === "" ||
    password === "" ||
    displayName === ""
  ) {
    throw "Missing parameters";
  }

  const user = await getUser(email);
  console.log(typeof user);
  if (user.length > 0) {
    throw "User already exists";
  }

  const newUser = new User({
    email: email,
    password: password,
    displayName: displayName,
    genres: genres,
    dob: dob,
  });
  try {
    newUser.save();
  } catch (err) {
    throw err;
  }
}

export function updateUser(user: any) {
  if (user.email === undefined) {
    throw "Oi! You forgot to pass an email!";
  }

  const usr = User.find({ email: user.email }).updateOne(user);
  return usr;
}

export async function deleteUser(userID: String) {
  if (userID === undefined) {
    throw "Oi! You forgot to pass the userID!";
  }

  const response = await User.deleteOne({ email: userID });

  console.log(response);
  if (response.deletedCount === 0) {
    throw "User not found";
  }
}

export default mongoose.model("User", user);
