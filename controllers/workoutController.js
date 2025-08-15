const WORKOUT = require("../models/workout");
const mongoose = require("mongoose");

//get all workouts
const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await WORKOUT.find({}).sort({ createdAt: -1 });
    const totalWorkouts = await WORKOUT.countDocuments();
    res.status(200).json({
      success: true,
      message: "workouts fetched successfully",
      totalWorkouts,
      workouts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//get single workout
const getSingleWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  try {
    const workout = await WORKOUT.findById(id);
    if (!workout) {
      return res.status(404).json({ error: "No such workout" });
    }
    res.status(200).json(workout);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

//create a new workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  if (!title || !reps || !load) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const workout = await WORKOUT.create({ title, reps, load });
    res
      .status(201)
      .json({
        success: true,
        message: "workout created successfully",
        workout,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

//delete a workout

const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  try {
    await WORKOUT.findByIdAndDelete(id);

    res.status(200).json({ message: "Workout deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

//update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  const { title, reps, load } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  try {
    const workout = await WORKOUT.findByIdAndUpdate(
      id,
      {
        title,
        reps,
        load,
      },
      {
        new: true,
      }
    );

    if (!workout) {
      return res.status(404).json({ error: "No such workout" });
    }

    res.status(200).json({ message: "Workout updated successfully", workout });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createWorkout,
  getAllWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout,
};
