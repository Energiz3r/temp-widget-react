import { useEffect, useState } from "react";
import { styles } from "./TempWidget.css";
import { Gauge } from "@energiz3r/component-library/src/components/Gauge/Gauge";
import { fetchTempData, refreshSpeed } from "../utils/fetch-data";
import DarkThemeToggle from "./DarkThemeToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faGear,
  faExclamation,
} from "@fortawesome/free-solid-svg-icons";

const froniusColors = {
  orange: { r: 247, g: 192, b: 2 },
  blue: { r: 112, g: 175, b: 205 },
  green: { r: 103, g: 215, b: 103 },
  red: { r: 255, g: 80, b: 80 },
  grey: { r: 204, g: 204, b: 204 },
};

const clamp = (number: number, min: number = 0, max: number = 100) => {
  return Math.max(min, Math.min(number, max));
};

interface Props {
  froniusWidth: number;
  darkMode: boolean;
  setDarkMode: any;
}

// @ts-ignore
const isResponseValid = (result) => {
  return result.temp > 0 && result.humidity > 0;
};

export const TempWidget = ({
  froniusWidth,
  darkMode,
  setDarkMode,
}: Props): JSX.Element => {
  const [currentTemp, setCurrentTemp] = useState(0);
  const [currentHumidity, setCurrentHumidity] = useState(0);
  const [APIFetching, setAPIFetching] = useState(false);
  const [hasApiFetched, setHasApiFetched] = useState(false);
  const [isError, setIsError] = useState(false);

  const width = froniusWidth + "vmin";

  const tempMax = 30;
  const humidityMax = 100;

  const fetchData = async () => {
    if (APIFetching) return;
    setAPIFetching(true);
    const result = await fetchTempData();
    if (!result.success) {
      setIsError(true);
      console.error("Fetch error:", result.error);
    } else if (!isResponseValid(result)) {
      setIsError(true);
      console.error("Response wasn't valid:", result);
    } else {
      setIsError(false);
      setCurrentTemp(result.temp);
      setCurrentHumidity(result.humidity);
    }
    setAPIFetching(false);
    setHasApiFetched(true);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, refreshSpeed);
    return () => clearInterval(interval);
  }, []);

  const colStyle = { padding: `calc(${width}/50)`, flexGrow: 1 };

  return (
    <div
      className={styles.main}
      style={{ backgroundColor: darkMode ? "rgb(5,5,5)" : "white" }}
    >
      <div
        style={{
          position: "relative",
          paddingTop: `calc(${width}/130)`,
          height: `calc(${width}/27)`,
          backgroundColor: darkMode ? "rgb(15,15,15)" : "white",
          padding: `calc(${width}/150)`,
          textAlign: "center",
          borderBottom: `calc(${width}/400) solid ${
            darkMode ? "rgb(120,120,120)" : "lightgrey"
          }`,
          color: darkMode ? "white" : "grey",
          fontSize: `calc(${width}/30)`,
        }}
      >
        <div>
          <DarkThemeToggle
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            buttonWidth={`calc(${width} / 13)`}
          />
        </div>
        Current Temp / Humidity
        <div
          className={styles.statusIcon}
          style={{
            right: `calc(${width}/130)`,
            top: `calc(${width}/130)`,
            color: darkMode ? "white" : "grey",
          }}
        >
          {!hasApiFetched ? (
            // @ts-ignore
            <FontAwesomeIcon icon={faGear} spin />
          ) : isError ? (
            // @ts-ignore
            <FontAwesomeIcon icon={faExclamation} style={{ color: "red" }} />
          ) : (
            // @ts-ignore
            <FontAwesomeIcon icon={faCheck} />
          )}
        </div>
      </div>
      <div
        className={styles.body}
        style={{ width: width, height: `${froniusWidth / 2}vmin` }}
      >
        <div className={styles.row}>
          <div style={colStyle}>
            <Gauge
              color={
                currentTemp > 25 || currentTemp < 15
                  ? froniusColors.red
                  : currentTemp > 18 && currentTemp < 23
                  ? froniusColors.green
                  : froniusColors.orange
              }
              text={`${currentTemp.toString()}°C`}
              hubText="Temp"
              darkMode={darkMode}
              percent={clamp((100 * Math.abs(currentTemp)) / tempMax)}
              widthCssValue="42vmin"
            />
          </div>
          <div style={colStyle}>
            <Gauge
              color={
                currentHumidity > 60
                  ? froniusColors.red
                  : currentHumidity > 50
                  ? froniusColors.orange
                  : froniusColors.green
              }
              text={`${Math.round(currentHumidity).toString()}%`}
              hubText="Humidity"
              darkMode={true}
              variant="noscale"
              percent={clamp((100 * Math.abs(currentHumidity)) / humidityMax)}
              widthCssValue="42vmin"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
