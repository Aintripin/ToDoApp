import React, { useEffect, useState } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";

type Task = {
  name: string;
  checked: boolean;
  id: number;
};

interface CustomFormProps extends React.HTMLAttributes<HTMLFormElement> {}

const EditForm: React.FC<CustomFormProps> = ({
  editedTask,
  updateTask,
  closeEditMode,
}: CustomFormProps) => {
  const [updatedTaskName, setUpdatedTaskName] = useState(editedTask.name);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTask({ ...editedTask, name: updatedTaskName });
  };

  useEffect(() => {
    const closeModalIfEscaped = (e) => {
      e.key === "Escape" && closeEditMode();
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
            onInput={(e) => {
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
