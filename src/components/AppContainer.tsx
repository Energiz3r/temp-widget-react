import { useState } from "react";
import { styles } from "./AppContainer.css";
import { TempWidget } from "./TempWidget";

const froniusWidth = 94;

export const AppContainer = () => {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <div className={styles.app}>
      <TempWidget
        froniusWidth={froniusWidth}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    </div>
  );
};
