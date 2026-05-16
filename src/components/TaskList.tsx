import type { Dispatch, SetStateAction } from "react";
import type { Task } from "../types/task";
import TaskItem from "./TaskItem";

interface Props {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  viewMode: "list" | "cards";
}

function TaskList({ tasks, setTasks, viewMode }: Props) {
  return (
    <div className={`task-list ${viewMode}`}>
      {tasks.length === 0 ? (
        <div className="empty-state">
          No tasks match your current search or filter.
        </div>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            tasks={tasks}
            setTasks={setTasks}
          />
        ))
      )}
    </div>
  );
}

export default TaskList;