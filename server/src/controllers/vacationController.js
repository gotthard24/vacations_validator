import * as Vacation from "../models/vacationModel.js";

export async function getVacations(req, res) {
  try {
    const userId = req.query.userId;
    const vacations = await Vacation.getVacations(userId);
    res.json(vacations);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching vacations");
  }
}

export async function updateStatus(req, res) {
  try {
    const { id } = req.params;
    const { status, comments } = req.body;
    const vacation = await Vacation.updateStatus(id, status, comments);
    res.json(vacation);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating status");
  }
}

export async function requestVacation(req, res) {
  try {
    const { start_date, end_date, reason, user_id } = req.body;
    const vacation = await Vacation.requestVacation(start_date, end_date, reason, user_id);
    res.json(vacation);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error requesting vacation");
  }
}