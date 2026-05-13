import Project from "../models/Project.js";

// ==========================================
// CREATE PROJECT
// ==========================================

export const createProject = async (
  req,
  res
) => {
  try {
    const { name, description } =
      req.body;

    const project =
      await Project.create({
        name,
        description,

        owner: req.user._id,

        members: [
          {
            user: req.user._id,
            role: "admin",
          },
        ],
      });

    res.status(201).json({
      success: true,
      project,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to create project",
    });
  }
};

// ==========================================
// GET USER PROJECTS
// ==========================================

export const getProjects =
  async (req, res) => {
    try {
      const projects =
        await Project.find({
          "members.user":
            req.user._id,
        });

      res.status(200).json({
        success: true,
        projects,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch projects",
      });
    }
  };