import Task from "../models/Task.js";

// ======================================
// CREATE TASK
// ======================================

export const createTask = async (
  req,
  res
) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      project,
    } = req.body;

    const task = await Task.create({
      title,
      description,

      status: status || "todo",

      priority:
        priority || "medium",

      project,

      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to create task",
    });
  }
};

// ======================================
// GET ALL TASKS
// ======================================

export const getAllTasks = async (
  req,
  res
) => {
  try {
    const { projectId } = req.query;

    let filter = {
      user: req.user._id,
    };

    if (projectId) {
      filter.project = projectId;
    }

    const tasks = await Task.find(
      filter
    )
      .populate("project", "name")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch tasks",
    });
  }
};

// ======================================
// GET SINGLE TASK
// ======================================

export const getTaskById = async (
  req,
  res
) => {
  try {
    const task = await Task.findById(
      req.params.id
    ).populate(
      "project",
      "name"
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch task",
    });
  }
};

// ======================================
// UPDATE TASK
// ======================================

export const updateTask = async (
  req,
  res
) => {
  try {
    const task =
      await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to update task",
    });
  }
};

// ======================================
// DELETE TASK
// ======================================

export const deleteTask = async (
  req,
  res
) => {
  try {
    await Task.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "Task deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to delete task",
    });
  }
};