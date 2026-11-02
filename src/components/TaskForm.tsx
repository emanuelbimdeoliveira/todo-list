"use client";

import { useState, FormEvent } from "react";

type TaskFormProps = {
  onAddTask: (title: string) => void;
};

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) return;

    onAddTask(trimmedTitle);
    setTitle("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="O que você precisa fazer?"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        aria-label="Descrição da tarefa"
      />

      <button type="submit">+ Adicionar</button>
    </form>
  );
}
