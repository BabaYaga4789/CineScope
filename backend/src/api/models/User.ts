import mongoose from "mongoose";

const Schema = mongoose.Schema;

const user = new Schema({
  email: String,
  password: String,
  name: String,
  displayName: String,
  genres: [String],
  dob: Date,
});

const User = mongoose.model("User", user);

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
    name: name,
    displayName: displayName,
    genres: genres,
  });
  try {
    newUser.save();
  } catch (err) {
    throw err;
  }
}

export function updateUser(User: any) {
  if (User.email === undefined) {
    throw "Oi! You forgot to pass an email!";
  }
  User.findByIdAndUpdate(User.email, User, (err: any, user: any) => {
    if (err) {
      throw err;
    }
    return user;
  });
}

export function deleteUser(email: String) {
  if (email === undefined) {
    throw "Oi! You forgot to pass an email!";
  }
  User.findByIdAndDelete(email, (err: any, user: any) => {
    if (err) {
      throw err;
    }
    return user;
  });
}

export default mongoose.model("User", user);
