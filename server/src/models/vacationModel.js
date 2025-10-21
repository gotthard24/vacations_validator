import db from "../db/knex.js";

export async function getVacations(userId) {
  try {
    if (userId) {
      const vacations = await db("vacation_requests")
        .select(
          "vacation_requests.*",
          "users.name as name"
        )
        .leftJoin("users", "vacation_requests.user_id", "users.id")
        .where("vacation_requests.user_id", userId);
      return vacations;
    } else {
        const vacations = await db("vacation_requests")
        .select(
          "vacation_requests.*",
          "users.name as name"
        )
        .leftJoin("users", "vacation_requests.user_id", "users.id");
      return vacations;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateStatus(id, status, comments) {
  try {
    const vacation = await db("vacation_requests").where("id", id).update({ status, comments });
    return vacation;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function requestVacation(start_date, end_date, reason, user_id) {
  try {
    const vacation = await db("vacation_requests").insert({ start_date, end_date, reason, user_id, status: 'pending' });
    return vacation;
  } catch (error) {
    console.error(error);
    throw error;
  }
}