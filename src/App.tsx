import React, { useState } from "react";
import CustomForm from "./components/CustomForm";
import TaskList from "./components/TaskList";
import EditForm from "./components/EditForm";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editedTask, setEditedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [previousFocusEl, setPreviousFocusEl] = useState(null);

  const addTask = (task) => {
    setTasks((prevState) => [...prevState, task]);
  };

  const deleteTask = (id) => {
    setTasks((prevState) => prevState.filter((t) => t.id !== id));
  };

  const toggleTask = (id) => {
    setTasks((prevState) =>
      prevState.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t))
    );
  };

  const updateTask = (task) => {
    setTasks(
      (prevState) =>
        prevState.map((t) => (t.id === task.id ? { ...t, name: task.name } : t))
      // TODO: close edit mode
    );
    closeEditMode();
  };

  const closeEditMode = () => {
    setIsEditing(false);
    // TODO: previos state focus
    previousFocusEl.focus();
  };

  const enterEditMode = (task) => {
    setEditedTask(task);
    setIsEditing(true);
    // TODO: set focus back to original
    setPreviousFocusEl(document.activeElement);
  };

  return (
    <div className="container">
      <header>
        <h1>My Task List</h1>
      </header>
      {isEditing && (
        <EditForm
          editedTask={editedTask}
          updateTask={updateTask}
          closeEditMode={closeEditMode}
        />
      )}
      <CustomForm addTask={addTask} />
      {tasks && (
        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          enterEditMode={enterEditMode}
        />
      )}
    </div>
  );
};

export default App;
