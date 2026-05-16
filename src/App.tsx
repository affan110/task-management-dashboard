import { useEffect, useState } from "react";
import "./styles/app.css";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import Stats from "./components/Stats";

import type { Task } from "./types/task";

type ViewMode = "list" | "cards";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [viewMode, setViewMode] = useState<ViewMode>("cards");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    const storedTheme = localStorage.getItem("dashboard-theme");
    const storedView = localStorage.getItem("dashboard-view");

    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }

    if (storedTheme) {
      setDarkMode(storedTheme === "dark");
    }

    if (storedView === "list" || storedView === "cards") {
      setViewMode(storedView);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("dashboard-theme", darkMode ? "dark" : "light");
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("dashboard-view", viewMode);
  }, [viewMode]);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Completed" && task.completed) ||
      (statusFilter === "Pending" && !task.completed);

    const matchesPriority =
      priorityFilter === "All" ||
      task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <div className="hero">
        <div>
          <span className="eyebrow">Task Dashboard</span>
          <h1>Organize your day with clarity</h1>
          <p className="hero-copy">
            Create, track, and complete tasks with a polished workflow.
          </p>
        </div>

        <div className="hero-actions">
          <div className="view-toggle">
            <button
              className={viewMode === "list" ? "active" : ""}
              onClick={() => setViewMode("list")}
            >
              List View
            </button>
            <button
              className={viewMode === "cards" ? "active" : ""}
              onClick={() => setViewMode("cards")}
            >
              Card View
            </button>
          </div>

          <button
            className="theme-toggle"
            onClick={() => setDarkMode((value) => !value)}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>

      <Stats tasks={tasks} />

      <TaskForm tasks={tasks} setTasks={setTasks} />

      <FilterBar
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
      />

      <TaskList tasks={filteredTasks} setTasks={setTasks} viewMode={viewMode} />
    </div>
  );
}

export default App;