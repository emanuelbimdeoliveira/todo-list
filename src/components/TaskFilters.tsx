export type TaskFilter = "all" | "pending" | "completed";

type TaskFiltersProps = {
  filter: TaskFilter;
  onChange: (filter: TaskFilter) => void;
};

const filters: { label: string; value: TaskFilter }[] = [
  { label: "Todas", value: "all" },
  { label: "Pendentes", value: "pending" },
  { label: "Concluídas", value: "completed" },
];

export default function TaskFilters({ filter, onChange }: TaskFiltersProps) {
  return (
    <div className="task-filters">
      {filters.map((item) => (
        <button
          key={item.value}
          type="button"
          className={filter === item.value ? "active" : ""}
          onClick={() => onChange(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
