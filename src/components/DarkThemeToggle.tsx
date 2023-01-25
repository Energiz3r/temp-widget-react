import { ReactComponent as MoonIcon } from "../svg/moon.svg";
import { ReactComponent as SunIcon } from "../svg/sun.svg";
import { styles } from "./DarkThemeToggle.css";

interface Props {
  darkMode: boolean;
  setDarkMode: any;
  buttonWidth: string;
}

const switchSpacing = 0.1;
const light = "rgb(255,255,255)";
const dark = "rgb(20,20,20)";
const length = 4;

const DarkThemeToggle = ({ darkMode, setDarkMode, buttonWidth }: Props) => {
  const svgStyle = {
    fill: darkMode ? dark : light,
  };
  return (
    <div
      className={styles.main}
      style={{
        top: `calc(${buttonWidth}/14)`,
        left: `calc(${buttonWidth}/14)`,
        width: buttonWidth,
        height: `calc(${buttonWidth} /2)`,
      }}
    >
      <div
        className={styles.outer}
        onClick={() => setDarkMode(!darkMode)}
        style={{
          backgroundColor: darkMode ? light : dark,
          borderRadius: `calc(${buttonWidth}/4)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            width: `calc(${buttonWidth}/ 2 - ${buttonWidth} * ${switchSpacing})`,
            top: `calc((${buttonWidth} * ${switchSpacing}) / 2)`,
            left: darkMode
              ? `calc((${buttonWidth} * ${switchSpacing}))`
              : `calc(${buttonWidth} - ((${buttonWidth} * ${switchSpacing}) ) - (${buttonWidth}/ 2 - (${buttonWidth} * ${switchSpacing})))`,
          }}
        >
          {darkMode ? (
            <MoonIcon style={svgStyle} />
          ) : (
            <SunIcon style={svgStyle} />
          )}
        </div>
        <div
          style={{
            position: "relative",
            backgroundColor: darkMode ? dark : light,
            height: `calc(${buttonWidth}/ 2 - ${buttonWidth} * ${switchSpacing})`,
            width: `calc(${buttonWidth}/ 2 - ${buttonWidth} * ${switchSpacing})`,
            top: `calc((${buttonWidth} * ${switchSpacing}) / 2)`,
            left: !darkMode
              ? `calc((${buttonWidth} * ${switchSpacing}) / 2)`
              : `calc(${buttonWidth} - ((${buttonWidth} * ${switchSpacing}) / 2 ) - (${buttonWidth}/ 2 - (${buttonWidth} * ${switchSpacing})))`,
            borderRadius: length / 2 - switchSpacing + "rem",
          }}
        ></div>
      </div>
    </div>
  );
};

export default DarkThemeToggle;
