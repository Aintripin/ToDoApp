import TaskItem from "./TaskItem";
import styles from "../styles/TaskList.module.scss";

interface TaskListProps extends React.HTMLAttributes<HTMLUListElement> {}

const TaskList = ({
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
