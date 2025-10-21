import db from "../db/knex.js";

export async function getUserByUid(uid) {
    try {
      const user = await db("users").where("firebase_uid", uid).first();
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }