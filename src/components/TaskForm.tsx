import { useState } from "react";
import type { Dispatch, SetStateAction, FormEvent } from "react";
import type { Task } from "../types/task";

interface Props {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
}

function TaskForm({ tasks, setTasks }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    // validate due date uses 4-digit year YYYY-MM-DD when provided
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (dueDate && !dateRegex.test(dueDate)) {
      setDueDateError("Please enter a valid date using YYYY-MM-DD (4-digit year).");
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      priority: priority as "Low" | "Medium" | "High",
      dueDate,
      completed: false,
    };

    setTasks([...tasks, newTask]);

    setTitle("");
    setDescription("");
    setPriority("Low");
    setDueDate("");
    setDueDateError("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
      />

      <div className="form-row">
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button type="submit" className="primary">
          Add Task
        </button>
      </div>
      
    </form>
  );
}

export default TaskForm;