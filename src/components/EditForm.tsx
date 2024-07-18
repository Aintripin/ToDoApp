import React, { useEffect, useState } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";

type Task = {
  name: string;
  checked: boolean;
  id: number;
};

interface EditFormProps extends React.HTMLAttributes<HTMLFormElement> {
  editedTask: Task;
  updateTask: (task: Task) => void;
  closeEditMode: () => void;
}

const EditForm: React.FC<EditFormProps> = ({
  editedTask,
  updateTask,
  closeEditMode,
}: EditFormProps) => {
  const [updatedTaskName, setUpdatedTaskName] = useState<string>(
    editedTask.name
  );

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTask({ ...editedTask, name: updatedTaskName });
  };

  useEffect(() => {
    const closeModalIfEscaped = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeEditMode();
    };

    window.addEventListener("keydown", closeModalIfEscaped);

    return () => {
      window.removeEventListener("keydown", closeModalIfEscaped);
    };
  }, [closeEditMode]);

  return (
    <div
      role="dialog"
      aria-labelledby="editTask"
      onClick={(e) => e.target === e.currentTarget && closeEditMode()}
    >
      <form className="todo" onSubmit={handleFormSubmit}>
        <div className="wrapper">
          <input
            type="text"
            id="editTask"
            className="input"
            value={updatedTaskName}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUpdatedTaskName(e.target.value);
            }}
            required
            autoFocus
            maxLength={60}
            placeholder="Update Task"
          />
          <label htmlFor="editTask" className="label">
            Update Task
          </label>
        </div>
        <button
          className="btn"
          aria-label={`Confirm edited task to now read ${updatedTaskName}`}
          type="submit"
        >
          <CheckIcon strokeWidth={2} height={24} width={24} />
        </button>
      </form>
    </div>
  );
};

export default EditForm;
