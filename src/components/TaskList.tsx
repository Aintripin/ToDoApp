import React from "react";
import TaskItem from "./TaskItem";
import styles from "../styles/TaskList.module.scss";

type Task = {
  id: number;
  name: string;
  checked: boolean;
};

interface TaskListProps extends React.HTMLAttributes<HTMLUListElement> {
  tasks: Task[];
  deleteTask: (id: number) => void;
  toggleTask: (id: number) => void;
  enterEditMode: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  deleteTask,
  toggleTask,
  enterEditMode,
}: TaskListProps) => {
  return (
    <ul className={styles.tasks}>
      {tasks
        .sort((a, b) => b.id - a.id)
        .map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleTask={toggleTask}
            enterEditMode={enterEditMode}
          />
        ))}
    </ul>
  );
};

export default TaskList;
