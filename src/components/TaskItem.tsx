import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Task } from "../types/task";

interface Props {
  task: Task;
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
}

function TaskItem({ task, tasks, setTasks }: Props) {
  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState<Task["priority"]>(task.priority);
  const [dueDate, setDueDate] = useState(task.dueDate);

  const toggleStatus = () => {
    const updatedTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, completed: !t.completed } : t
    );

    setTasks(updatedTasks);
  };

  const deleteTask = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    const updatedTasks = tasks.filter((t) => t.id !== task.id);

    setTasks(updatedTasks);
  };

  const saveEdit = () => {
    if (!title.trim()) return;

    const updatedTasks = tasks.map((t) =>
      t.id === task.id
        ? {
            ...t,
            title,
            description,
            priority,
            dueDate,
          }
        : t
    );

    setTasks(updatedTasks);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setTitle(task.title);
    setDescription(task.description);
    setPriority(task.priority);
    setDueDate(task.dueDate);
    setIsEditing(false);
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      {isEditing ? (
        <>
          <div className="task-edit-fields">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              rows={3}
            />

            <div className="edit-row">
              <select
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value as Task["priority"])
                }
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>

              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          <div className="task-actions">
            <button className="primary" onClick={saveEdit}>
              Save
            </button>

            <button className="secondary" onClick={cancelEdit}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="task-header">
            <h3>{task.title}</h3>

            <div className="task-badges">
              <span className={`badge priority ${task.priority.toLowerCase()}`}>
                {task.priority}
              </span>

              <span
                className={`badge status ${
                  task.completed ? "completed" : "pending"
                }`}
              >
                {task.completed ? "Completed" : "Pending"}
              </span>
            </div>
          </div>

          <p className="task-description">
            {task.description || "No description provided."}
          </p>

          <div className="task-meta">
            <span>
              <strong>Due:</strong> {task.dueDate || "Unscheduled"}
            </span>
          </div>

          <div className="task-actions">
            <button className="primary" onClick={toggleStatus}>
              {task.completed ? "Mark Pending" : "Mark Complete"}
            </button>

            <button
              className="secondary"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>

            <button className="danger" onClick={deleteTask}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskItem;