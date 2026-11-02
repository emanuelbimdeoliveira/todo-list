"use client";

import { useState, useEffect } from "react";
import { Task } from "@/types/task";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import TaskFilters, { TaskFilter } from "@/components/TaskFilters";

export default function Home() {
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carrega as tarefas salvas no navegador
  useEffect(() => {
    const savedTasks = localStorage.getItem("todo-tasks");

    if (savedTasks) {
      try {
        const parsedTasks: Task[] = JSON.parse(savedTasks);

        if (Array.isArray(parsedTasks)) {
          setTasks(parsedTasks);
        }
      } catch {
        console.error("Não foi possível carregar as tarefas salvas.");
      }
    }

    setIsLoaded(true);
  }, []);

  // Salva as tarefas sempre que a lista mudar
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem("todo-tasks", JSON.stringify(tasks));
  }, [tasks, isLoaded]);

  function addTask(title: string) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);
  }

  function toggleTask(id: string) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function deleteTask(id: string) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const completedCount = tasks.filter((task) => task.completed).length;

  const pendingCount = tasks.length - completedCount;

  return (
    <main className="app-container">
      <section className="todo-card">
        <header className="app-header">
          <h1>Minhas tarefas</h1>
          <p>Organize seu dia, uma tarefa por vez.</p>
        </header>

        <section className="task-stats" aria-label="Resumo das tarefas">
          <div>
            <span>Total</span>
            <strong>{tasks.length}</strong>
          </div>

          <div>
            <span>Pendentes</span>
            <strong>{pendingCount}</strong>
          </div>

          <div>
            <span>Concluídas</span>
            <strong>{completedCount}</strong>
          </div>
        </section>

        <TaskForm onAddTask={addTask} />

        <TaskFilters filter={filter} onChange={setFilter} />

        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      </section>
    </main>
  );
}
