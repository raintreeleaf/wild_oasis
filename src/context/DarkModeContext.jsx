import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia("(prefer-color-scheme:dark)"),
    "isDarkMode"
  );
  useEffect(
    function () {
      //use function expression for useeffect setup function
      //because arrow function might return a value that is not
      //a cleanup function. Calling something that is not a function
      //gives error.
      // document.documentElement.classList.toggle("dark-mode");
      if (isDarkMode) document.documentElement.classList.add("dark-mode");
      else document.documentElement.classList.remove("dark-mode");
    },
    [isDarkMode]
  );
  function toggleDarkMode() {
    setIsDarkMode((isDarkMode) => !isDarkMode);
  }
  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (!context)
    throw new Error("DarkModeContext is used outside of DarkModeProvider");
  return context;
}
export { DarkModeProvider, useDarkMode };
