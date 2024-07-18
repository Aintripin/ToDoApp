import { useReducer } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import CustomForm from "./components/CustomForm";
import TaskList from "./components/TaskList";
import EditForm from "./components/EditForm";
import ThemeSwitcher from "./components/ThemeSwitcher";

// interfaces
interface Task {
  id: number;
  name: string;
  checked: boolean;
}

interface AppState {
  tasks: Task[];
  editedTask: Task | null;
  isEditing: boolean;
  previousFocusEl: HTMLElement | null;
}

type Action =
  | { type: "ADD_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: number }
  | { type: "TOGGLE_TASK"; payload: number }
  | { type: "UPDATE_TASK"; payload: Task }
  | { type: "SET_EDITED_TASK"; payload: Task | null }
  | { type: "SET_IS_EDITING"; payload: boolean }
  | { type: "SET_PREVIOUS_FOCUS_EL"; payload: HTMLElement | null };

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
      };
    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload ? { ...t, checked: !t.checked } : t
        ),
      };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? { ...t, name: action.payload.name } : t
        ),
        isEditing: false,
        editedTask: null,
      };
    case "SET_EDITED_TASK":
      return { ...state, editedTask: action.payload };
    case "SET_IS_EDITING":
      return { ...state, isEditing: action.payload };
    case "SET_PREVIOUS_FOCUS_EL":
      return { ...state, previousFocusEl: action.payload };
    default:
      return state;
  }
};

const App: React.FC = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>("react-todo.tasks", []);

  const initialState: AppState = {
    tasks,
    editedTask: null,
    isEditing: false,
    previousFocusEl: null,
  };

  const [state, dispatch] = useReducer(appReducer, initialState);

  const addTask = (task: Task) => {
    dispatch({ type: "ADD_TASK", payload: task });
    setTasks([...state.tasks, task]);
  };

  const deleteTask = (id: number) => {
    dispatch({ type: "DELETE_TASK", payload: id });
    setTasks(state.tasks.filter((t) => t.id !== id));
  };

  const toggleTask = (id: number) => {
    dispatch({ type: "TOGGLE_TASK", payload: id });
    setTasks(
      state.tasks.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t))
    );
  };

  const updateTask = (task: Task) => {
    dispatch({ type: "UPDATE_TASK", payload: task });
    setTasks(
      state.tasks.map((t) => (t.id === task.id ? { ...t, name: task.name } : t))
    );
  };

  const closeEditMode = () => {
    dispatch({ type: "SET_IS_EDITING", payload: false });
    state.previousFocusEl?.focus();
  };

  const enterEditMode = (task: Task) => {
    dispatch({ type: "SET_EDITED_TASK", payload: task });
    dispatch({ type: "SET_IS_EDITING", payload: true });
    dispatch({
      type: "SET_PREVIOUS_FOCUS_EL",
      payload: document.activeElement as HTMLElement,
    });
  };

  return (
    <div className="container">
      <header>
        <h1>My Task List</h1>
      </header>
      {state.isEditing && (
        <EditForm
          editedTask={
            state.editedTask
              ? state.editedTask
              : { id: 0, name: "Default Task", checked: false }
          }
          updateTask={updateTask}
          closeEditMode={closeEditMode}
        />
      )}
      <CustomForm addTask={addTask} />
      {state.tasks && (
        <TaskList
          tasks={state.tasks}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          enterEditMode={enterEditMode}
        />
      )}
      <ThemeSwitcher />
    </div>
  );
};

export default App;
