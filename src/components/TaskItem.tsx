import React, { useState } from "react";

// styles
import styles from "../styles/TaskItem.module.scss";

// library imports
import {
  CheckIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

type Task = {
  id: number;
  name: string;
  checked: boolean;
};

interface TaskItemProps {
  task: Task;
  deleteTask: (id: number) => void;
  toggleTask: (id: number) => void;
  enterEditMode: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  deleteTask,
  toggleTask,
  enterEditMode,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(task.checked);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    toggleTask(task.id);
  };

  return (
    <li className={styles.task}>
      <div className={styles["task-group"]}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={isChecked}
          onChange={handleCheckboxChange}
          name={task.name}
          id={`${task.id}`}
        />
        <label htmlFor={`${task.id}`} className={styles.label}>
          {task.name}
          <p className={styles.checkmark}>
            <CheckIcon strokeWidth={2} width={24} height={24} />
          </p>
        </label>
      </div>
      <div className={styles["task-group"]}>
        <button
          className="btn"
          aria-label={`Update ${task.name} Task`}
          onClick={() => enterEditMode(task)}
        >
          <PencilSquareIcon width={24} height={24} />
        </button>

        <button
          className={`btn ${styles.delete}`}
          aria-label={`Delete ${task.name} Task`}
          onClick={() => deleteTask(task.id)}
        >
          <TrashIcon width={24} height={24} />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
