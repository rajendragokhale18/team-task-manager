import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a task title"],
      trim: true,
      maxlength: [100, "Task title cannot exceed 100 characters"],
      minlength: [3, "Task title must be at least 3 characters long"],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
      default: "",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    dueDate: {
      type: Date,
    },

    status: {
      type: String,
      enum: {
        values: ["todo", "in-progress", "completed"],
        message: "Status must be one of: todo, in-progress, or completed",
      },
      default: "todo",
    },

    dueDate: {
      type: Date,
      validate: {
        validator: function (value) {
          if (!value) return true;
          return value > new Date();
        },
        message: "Due date must be in the future",
      },
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Task must belong to a user"],
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

taskSchema.index({ user: 1 });
taskSchema.index({ status: 1 });
taskSchema.index({ user: 1, status: 1 });

const Task = mongoose.model("Task", taskSchema);

export default Task;
