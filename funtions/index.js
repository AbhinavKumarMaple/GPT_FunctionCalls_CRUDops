import express from "express";
import User from "../model/user.model.js";

// [⁜]------<[ Register a user]>------[⁜] //

export const Register = async ({ username, email, password }) => {
  console.log(username, email, password);
  try {
    if (username === "" || email === "" || password === "") {
      return { errormessage: "fields are empty" };
    }
    const isUsernameExists = await User.findOne({ username });
    const isEmailExists = await User.findOne({ email });
    // if (isEmailExists || isUsernameExists) {
    //   return { errormessage: "email or username already exists" };
    // }
    const body = { username: username, email: email, password: password };
    console.log("register body", body);
    const saveUser = new User(body);
    const isSaved = await saveUser.save();
    if (isSaved) return JSON.stringify(saveUser);
  } catch (error) {
    console.log(error);
    return { errormessage: error.message };
  }
};

// [⁜]------<[ Login a user ]>------[⁜] //
export const Login = async ({ email, password }) => {
  console.log("login", email, password);
  if (email == "" || password == "") {
    return JSON.stringify({ errormessage: "fields are empty" });
  }

  const isEmailExists = await User.findOne({ email });

  if (!isEmailExists) {
    return JSON.stringify({ errormessage: "email not exists" });
  }

  try {
    if (password === isEmailExists?.password) {
      return JSON.stringify({ isEmailExists });
    }
    return { errormessage: "password is incorrect" };
  } catch (error) {
    console.log("error");
    return { errormessage: error.message };
  }
};

//update user
export const updateUser = async ({ id, username, email, password }) => {
  console.log("update user", id, username, email, password);
  const body = { username, email, password };
  try {
    const updatedUser = await User.findByIdAndUpdate(id, body);
    if (!updatedUser)
      return JSON.stringify({ message: " user with specific not foound" });
    return JSON.stringify({ updatedUser });
  } catch (error) {
    console.log(error);
    return JSON.stringify({ errormessage: error.message });
  }
};

// delete a user

export const deleteUser = async ({ id }) => {
  console.log("delete user", id);
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user)
      return JSON.stringify({ message: " user with specific not foound" });
    return JSON.stringify({ user });
  } catch (error) {
    console.log(error);
    return JSON.stringify({ errormessage: error.message });
  }
};

// [⁜]------<[ fetch all available users ]>------[⁜] //

export const getUsers = async () => {
  try {
    const userList = await User.find();
    if (!userList) {
      return { message: " user with specific not foound" };
    }
    return { userList };
  } catch (error) {
    console.log(error);
    return { errormessage: error.message };
  }
};

// [⁜]------<[ search a user ]>------[⁜] //

export const Search = async (req, res) => {
  try {
    const userList = await User.find({
      username: { $regex: ".*" + req.query.search + ".*" },
    });
    if (!userList)
      res.status(401).json({ message: " user with specific not foound" });
    res.status(200).json({ userList });
  } catch (error) {
    console.log(error);
    return { errormessage: error.message };
  }
};

export const getuserById = async (id) => {
  try {
    const user = await User.find({ _id: id });
    if (!user)
      return JSON.stringify({ message: " user with specific not foound" });
    return JSON.stringify({ user });
  } catch (error) {
    console.log(error);
    return JSON.stringify({ errormessage: error.message });
  }
};

//fucntion for deleting all the users
export const deleteAllUsers = async () => {
  try {
    const userList = await User.deleteMany();
    if (!userList)
      return JSON.stringify({ message: " user with specific not foound" });
    return JSON.stringify({ userList });
  } catch (error) {
    console.log(error);
    return JSON.stringify({ errormessage: error.message });
  }
};
