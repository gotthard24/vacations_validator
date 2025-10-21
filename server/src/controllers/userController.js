import * as User from "../models/userModel.js";

export async function getUserByUid(req, res) {
  try {
    const {uid} = req.params;
    const user = await User.getUserByUid(uid);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching user");
  }
}