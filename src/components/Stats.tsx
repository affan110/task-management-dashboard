import type { Task } from "../types/task";

interface Props {
  tasks: Task[];
}

function Stats({ tasks }: Props) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const pending = total - completed;

  return (
    <div className="stats">
      <div>Total: {total}</div>
      <div>Pending: {pending}</div>
      <div>Completed: {completed}</div>
    </div>
  );
}

export default Stats;