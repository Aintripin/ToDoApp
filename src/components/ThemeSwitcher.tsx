import { useEffect, useState } from "react";

// Icons
import {
  XMarkIcon,
  SunIcon,
  MoonIcon,
  SwatchIcon,
} from "@heroicons/react/24/outline";

// Custom Hooks
import useLocalStorage from "../hooks/useLocalStorage";

// Styles
import styles from "../styles/ThemeSwitcher.module.scss";

const ThemeSwitcher: React.FC = () => {
  const [isColorPicking, setIsColorPicking] = useState(false);
  const [hue, setHue] = useLocalStorage<string>("react-todo.color", "240");

  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage<string>(
    "react-todo.theme",
    defaultDark ? "dark" : "light"
  );

  const handleThemeBtn = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    document.documentElement.setAttribute("color-scheme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty("--_hue", hue);
  }, [hue]);

  return (
    <aside
      className={styles.wrapper}
      style={{
        backgroundColor: isColorPicking
          ? "hsl(var(--muted) / .6)"
          : "transparent",
      }}
    >
      {isColorPicking ? (
        <>
          <button
            className={`btn ${styles.close}`}
            aria-label="Close Color Picking Mode"
            onClick={() => setIsColorPicking(false)}
          >
            <XMarkIcon />
          </button>
          <input
            className={styles.picker}
            type="range"
            min={0}
            max={360}
            aria-label="Change Color Theme Slider"
            value={hue}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              setHue(e.target.value)
            }
          />
        </>
      ) : (
        <div className={styles.btns}>
          <button
            className="btn"
            aria-label={`Change theme to ${
              theme === "light" ? "dark" : "light"
            } mode`}
            role="switch"
            onClick={handleThemeBtn}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            className="btn"
            aria-label="Enable Color Picking Mode"
            onClick={() => setIsColorPicking(true)}
          >
            <SwatchIcon />
          </button>
        </div>
      )}
    </aside>
  );
};

export default ThemeSwitcher;
