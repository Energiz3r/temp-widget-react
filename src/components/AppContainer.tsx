import { useState } from "react";
import { styles } from "./AppContainer.css";
import { FroniusWidget } from "./FroniusWidget";

const froniusWidth = "94vmin";

export const AppContainer = () => {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <div className={styles.app}>
      <FroniusWidget
        width={froniusWidth}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    </div>
  );
};
