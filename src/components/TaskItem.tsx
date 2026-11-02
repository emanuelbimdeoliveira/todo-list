import { Task } from "@/types/task";

type TaskItemProps = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <label className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />

        <span>{task.title}</span>
      </label>

      <button
        type="button"
        className="delete-button"
        onClick={() => onDelete(task.id)}
        aria-label={`Excluir tarefa: ${task.title}`}
      >
        Excluir
      </button>
    </li>
  );
}
