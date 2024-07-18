import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";

type Task = {
  name: string;
  checked: boolean;
  id: number;
};

interface CustomFormProps extends React.HTMLAttributes<HTMLFormElement> {
  addTask: (task: Task) => void;
}

const CustomForm: React.FC<CustomFormProps> = ({ addTask }) => {
  const [task, setTask] = useState<string>("");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask({
      name: task,
      checked: false,
      id: Date.now(),
    });
    setTask("");
  };

  return (
    <form className="todo" onSubmit={handleFormSubmit}>
      <div className="wrapper">
        <input
          type="text"
          id="task"
          className="input"
          value={task}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTask(e.target.value);
          }}
          required
          autoFocus
          maxLength={60}
          placeholder="Enter Task"
        />
        <label htmlFor="task" className="label">
          Enter Task
        </label>
      </div>
      <button className="btn" aria-label="Add Task" type="submit">
        <PlusIcon />
      </button>
    </form>
  );
};

export default CustomForm;
