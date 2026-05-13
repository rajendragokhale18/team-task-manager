import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { generateAITasks } from "../services/aiService";

import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../services/taskService";

import {
  getProjects,
  createProject,
} from "../services/projectService";

function DashboardPage() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // ==========================================
  // STATES
  // ==========================================

  const [tasks, setTasks] = useState([]);

  const [projects, setProjects] =
    useState([]);

  const [selectedProject, setSelectedProject] =
    useState(null);

  const [projectName, setProjectName] =
    useState("");

  const [
    projectDescription,
    setProjectDescription,
  ] = useState("");

  const [title, setTitle] = useState("");

  const [description, setDescription] =
    useState("");

  const [priority, setPriority] =
    useState("medium");

  const [dueDate, setDueDate] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [aiPrompt, setAiPrompt] =
    useState("");

  const [aiTasks, setAiTasks] = useState(
    []
  );

  const [aiLoading, setAiLoading] =
    useState(false);

  // ==========================================
  // FETCH PROJECTS
  // ==========================================

  const fetchProjects =
    async () => {
      try {
        const response =
          await getProjects();

        const projectData =
          response.projects || [];

        setProjects(projectData);

        if (
          projectData.length > 0 &&
          !selectedProject
        ) {
          setSelectedProject(
            projectData[0]
          );
        }
      } catch (error) {
        console.log(error);

        toast.error(
          "Failed to fetch projects"
        );
      }
    };

  // ==========================================
  // FETCH TASKS
  // ==========================================

  const fetchTasks = async () => {
    try {
      if (!selectedProject?._id) return;

      const response = await getTasks(
        selectedProject._id
      );

      const taskData =
        response?.tasks || [];

      setTasks(
        Array.isArray(taskData)
          ? taskData
          : []
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to fetch tasks"
      );
    }
  };

  // ==========================================
  // USE EFFECTS
  // ==========================================

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedProject?._id) {
      fetchTasks();
    }
  }, [selectedProject]);

  // ==========================================
  // ANALYTICS
  // ==========================================

  const totalTasks = tasks.length;

  const todoCount = tasks.filter(
    (task) => task.status === "todo"
  ).length;

  const inProgressCount =
    tasks.filter(
      (task) =>
        task.status === "in-progress"
    ).length;

  const completedCount = tasks.filter(
    (task) =>
      task.status === "completed"
    ).length;

  // ==========================================
  // CREATE PROJECT
  // ==========================================

  const createProjectHandler =
    async () => {
      if (!projectName) {
        toast.error(
          "Enter project name"
        );
        return;
      }

      try {
        const response =
          await createProject({
            name: projectName,
            description:
              projectDescription,
          });

        toast.success(
          "Project created"
        );

        setProjectName("");
        setProjectDescription("");

        fetchProjects();

        setSelectedProject(
          response.project
        );
      } catch (error) {
        console.log(error);

        toast.error(
          "Failed to create project"
        );
      }
    };

  // ==========================================
  // CREATE TASK
  // ==========================================

  const createTaskHandler = async (
    e
  ) => {
    e.preventDefault();

    if (!selectedProject) {
      toast.error(
        "Create a project first"
      );
      return;
    }

    if (!title || !description) {
      toast.error("Fill all fields");
      return;
    }

    try {
      setLoading(true);

      await createTask({
        title,
        description,
        priority,
        dueDate,
        project: selectedProject._id,
        status: "todo",
      });

      toast.success(
        "Task created"
      );

      setTitle("");
      setDescription("");
      setPriority("medium");
      setDueDate("");

      fetchTasks();
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to create task"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // DELETE TASK
  // ==========================================

  const deleteTaskHandler = async (
    id
  ) => {
    try {
      await deleteTask(id);

      setTasks((prev) =>
        prev.filter(
          (task) => task._id !== id
        )
      );

      toast.success(
        "Task deleted"
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Only admins can delete tasks"
      );
    }
  };

  // ==========================================
  // UPDATE TASK STATUS
  // ==========================================

  const updateStatusHandler = async (
    task
  ) => {
    let newStatus = "todo";

    if (task.status === "todo") {
      newStatus = "in-progress";
    } else if (
      task.status === "in-progress"
    ) {
      newStatus = "completed";
    }

    try {
      await updateTask(task._id, {
        ...task,
        status: newStatus,
      });

      fetchTasks();

      toast.success(
        "Task updated"
      );
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to update task"
      );
    }
  };

  // ==========================================
  // AI GENERATE
  // ==========================================

  const generateAIHandler = async () => {
    if (!aiPrompt.trim()) {
      toast.error(
        "Enter project idea"
      );
      return;
    }

    try {
      setAiLoading(true);

      const response =
        await generateAITasks(
          aiPrompt
        );

      const generatedTasks =
        response?.tasks || [];

      setAiTasks(generatedTasks);

      toast.success(
        "AI Tasks generated"
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "AI generation failed"
      );
    } finally {
      setAiLoading(false);
    }
  };

  // ==========================================
  // SAVE AI TASKS
  // ==========================================

  const saveAITasksHandler =
    async () => {
      try {
        if (!selectedProject) {
          toast.error(
            "Create/select project first"
          );
          return;
        }

        if (aiTasks.length === 0) {
          toast.error(
            "No AI tasks found"
          );
          return;
        }

        for (const task of aiTasks) {
          await createTask({
            title:
              typeof task === "string"
                ? task
                : task.title,

            description:
              typeof task === "string"
                ? "AI generated task"
                : task.description ||
                  "AI generated task",

            status: "todo",

            priority: "medium",

            project:
              selectedProject._id,
          });
        }

        toast.success(
          "AI tasks saved"
        );

        setAiTasks([]);

        fetchTasks();
      } catch (error) {
        console.error(error);

        toast.error(
          "Failed to save AI tasks"
        );
      }
    };

  // ==========================================
  // LOGOUT
  // ==========================================

  const logoutHandler = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");
  };

  // ==========================================
  // FILTERS
  // ==========================================

  const filteredTasks = tasks.filter(
    (task) =>
      task.title
        ?.toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        ) ||
      task.description
        ?.toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )
  );

  const todoTasks = filteredTasks.filter(
    (task) => task.status === "todo"
  );

  const inProgressTasks =
    filteredTasks.filter(
      (task) =>
        task.status === "in-progress"
    );

  const completedTasks =
    filteredTasks.filter(
      (task) =>
        task.status === "completed"
    );

  return (
    <div className="min-h-screen bg-[#020617] text-white">

      {/* NAVBAR */}

      <nav className="border-b border-white/10 bg-black/30 backdrop-blur-xl sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              FlowState
            </h1>

            <p className="text-slate-500 text-sm">
              AI Productivity Workspace
            </p>

            <div className="mt-3">

              <span
                className={`px-4 py-1 rounded-full text-sm font-bold ${
                  user?.role === "admin"
                    ? "bg-red-500/20 text-red-300"
                    : "bg-cyan-500/20 text-cyan-300"
                }`}
              >
                {user?.role?.toUpperCase()}
              </span>

            </div>
          </div>

          <button
            onClick={logoutHandler}
            className="bg-white text-black px-6 py-3 rounded-2xl font-bold"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* PROJECT SECTION */}

        <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8 mb-10">

          <h2 className="text-4xl font-black mb-6">
            Projects
          </h2>

          <div className="grid md:grid-cols-3 gap-4 mb-6">

            <input
              type="text"
              placeholder="Project name"
              value={projectName}
              onChange={(e) =>
                setProjectName(
                  e.target.value
                )
              }
              className="p-5 rounded-2xl bg-black/20 border border-white/10 outline-none"
            />

            <input
              type="text"
              placeholder="Project description"
              value={projectDescription}
              onChange={(e) =>
                setProjectDescription(
                  e.target.value
                )
              }
              className="p-5 rounded-2xl bg-black/20 border border-white/10 outline-none"
            />

            <button
              onClick={
                createProjectHandler
              }
              className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black rounded-2xl font-bold"
            >
              Create Project
            </button>
          </div>

          <div className="flex flex-wrap gap-4">

            {projects.map((project) => (
              <button
                key={project._id}
                onClick={() =>
                  setSelectedProject(
                    project
                  )
                }
                className={`px-6 py-3 rounded-2xl font-semibold transition ${
                  selectedProject?._id ===
                  project._id
                    ? "bg-cyan-400 text-black"
                    : "bg-black/20 border border-white/10"
                }`}
              >
                {project.name}
              </button>
            ))}
          </div>
        </div>

        {/* SELECTED PROJECT */}

        {selectedProject && (
          <div className="mb-10 bg-cyan-500/10 border border-cyan-400/20 rounded-[32px] p-8">
            <h2 className="text-4xl font-black text-cyan-300">
              {selectedProject.name}
            </h2>

            <p className="text-slate-400 mt-3 text-lg">
              {selectedProject.description}
            </p>
          </div>
        )}

        {/* ANALYTICS */}

        <div className="grid md:grid-cols-4 gap-6 mb-10">

          <div className="bg-white/[0.03] border border-white/10 rounded-[28px] p-7">
            <p>Total Tasks</p>
            <h2 className="text-5xl font-black mt-3">
              {totalTasks}
            </h2>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-[28px] p-7">
            <p>Todo</p>
            <h2 className="text-5xl font-black mt-3">
              {todoCount}
            </h2>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-[28px] p-7">
            <p>In Progress</p>
            <h2 className="text-5xl font-black mt-3">
              {inProgressCount}
            </h2>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-[28px] p-7">
            <p>Completed</p>
            <h2 className="text-5xl font-black mt-3">
              {completedCount}
            </h2>
          </div>
        </div>

        {/* AI TASK GENERATOR */}

        <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8 mb-10">

          <h2 className="text-3xl font-black mb-6">
            AI Task Generator
          </h2>

          <div className="flex gap-4 mb-6">

            <input
              type="text"
              placeholder="Build an AI SaaS platform..."
              value={aiPrompt}
              onChange={(e) =>
                setAiPrompt(e.target.value)
              }
              className="flex-1 p-5 rounded-2xl bg-black/20 border border-white/10 outline-none"
            />

            <button
              onClick={generateAIHandler}
              className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 rounded-2xl font-bold"
            >
              {aiLoading
                ? "Generating..."
                : "Generate"}
            </button>

            <button
              onClick={saveAITasksHandler}
              className="bg-green-500 text-black px-8 rounded-2xl font-bold"
            >
              Save Tasks
            </button>
          </div>
        </div>

        {/* CREATE TASK */}

        <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8 mb-10">

          <h2 className="text-3xl font-black mb-6">
            Create Task
          </h2>

          <form
            onSubmit={createTaskHandler}
            className="grid md:grid-cols-2 gap-5"
          >

            <input
              type="text"
              placeholder="Task title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="p-5 rounded-2xl bg-black/20 border border-white/10 outline-none"
            />

            <select
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value)
              }
              className="p-5 rounded-2xl bg-black/20 border border-white/10 outline-none"
            >
              <option value="low">
                Low
              </option>

              <option value="medium">
                Medium
              </option>

              <option value="high">
                High
              </option>
            </select>

            <textarea
              placeholder="Task description"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              className="md:col-span-2 p-5 rounded-2xl bg-black/20 border border-white/10 outline-none h-32"
            />

            <input
              type="date"
              value={dueDate}
              onChange={(e) =>
                setDueDate(
                  e.target.value
                )
              }
              className="p-5 rounded-2xl bg-black/20 border border-white/10 outline-none"
            />

            <button
              type="submit"
              className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black rounded-2xl font-bold"
            >
              {loading
                ? "Creating..."
                : "Create Task"}
            </button>
          </form>
        </div>

        {/* SEARCH */}

        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="w-full p-5 rounded-2xl bg-white/[0.03] border border-white/10 outline-none mb-10"
        />

        {/* TASK BOARDS */}

        <div className="grid md:grid-cols-3 gap-6">

          {/* TODO */}

          <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-6">

            <h2 className="text-3xl font-black mb-6">
              Todo
            </h2>

            <div className="space-y-4">

              {todoTasks.map((task) => (
                <div
                  key={task._id}
                  className="bg-black/20 border border-white/10 rounded-2xl p-5"
                >

                  <div className="flex justify-between items-start">

                    <div>
                      <h3 className="font-bold text-xl">
                        {task.title}
                      </h3>

                      <p className="text-slate-400 mt-2">
                        {task.description}
                      </p>
                    </div>

                    {user?.role ===
                      "admin" && (
                      <button
                        onClick={() =>
                          deleteTaskHandler(
                            task._id
                          )
                        }
                        className="text-red-400"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  <div className="flex gap-3 mt-5">

                    <button
                      onClick={() =>
                        updateStatusHandler(
                          task
                        )
                      }
                      className="bg-cyan-400 text-black px-4 py-2 rounded-xl font-bold"
                    >
                      Move
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* IN PROGRESS */}

          <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-6">

            <h2 className="text-3xl font-black mb-6">
              In Progress
            </h2>

            <div className="space-y-4">

              {inProgressTasks.map((task) => (
                <div
                  key={task._id}
                  className="bg-black/20 border border-white/10 rounded-2xl p-5"
                >

                  <h3 className="font-bold text-xl">
                    {task.title}
                  </h3>

                  <p className="text-slate-400 mt-2">
                    {task.description}
                  </p>

                  <button
                    onClick={() =>
                      updateStatusHandler(
                        task
                      )
                    }
                    className="mt-5 bg-cyan-400 text-black px-4 py-2 rounded-xl font-bold"
                  >
                    Move
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* COMPLETED */}

          <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-6">

            <h2 className="text-3xl font-black mb-6">
              Completed
            </h2>

            <div className="space-y-4">

              {completedTasks.map((task) => (
                <div
                  key={task._id}
                  className="bg-black/20 border border-white/10 rounded-2xl p-5"
                >

                  <h3 className="font-bold text-xl">
                    {task.title}
                  </h3>

                  <p className="text-slate-400 mt-2">
                    {task.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;