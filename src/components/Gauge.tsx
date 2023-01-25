import { useState } from "react";
import { styles } from "./Gauge.css";
import {
  f_svg_ellipse_arc,
  findPoint,
  percentToRadians,
} from "../utils/geometry";

interface GaugeProps {
  color?: { r: number; g: number; b: number };
  Icon?: React.FunctionComponent<any>;
  text?: string;
  textSecondary?: string;
  percent?: number;
  percentSecondary?: number;
  darkMode: boolean;
  variant?: "normal" | "shaded" | "empty" | "noscale" | "battery";
  iconText?: string;
  iconTextSecondary?: string;
  iconTextSize?: number;
  width: string;
}

const lineAngles = [
  -60, -30, 0, 15, 30, 45, 60, 75, 90, 100, 110, 120, 130, 140, 150, 160, 170,
];
const lineAnglesBattery = [-63, -36, -9, 18, 45, 72, 99, 126, 153];
const line = { cx: 250, cy: 250, rad: 240 };

const Gauge = ({
  color = { r: 155, g: 155, b: 155 },
  Icon,
  text,
  textSecondary,
  percent,
  percentSecondary,
  darkMode = false,
  variant = "normal",
  iconText = "",
  iconTextSecondary = "",
  iconTextSize = 4,
  width,
}: GaugeProps): JSX.Element => {
  const [showSecondary, setShowSecondary] = useState(false);
  const hasSecondary = typeof textSecondary !== "undefined";
  const displayText = hasSecondary && showSecondary ? textSecondary : text;
  const displayPercent =
    hasSecondary && showSecondary ? percentSecondary : percent;
  const bgColor = darkMode ? "rgb(0,0,0)" : "white";
  const uniqueID = Math.random().toString();
  const showSegments =
    variant !== "shaded" &&
    variant !== "empty" &&
    variant !== "noscale" &&
    (percent || percent === 0);
  const showScaleBg = percent || percent === 0 || variant === "shaded";
  const showScale =
    variant !== "shaded" && variant !== "empty" && (percent || percent === 0);
  return (
    <div
      className={styles.parent}
      onClick={() => setShowSecondary(!showSecondary)}
    >
      <div
        className={styles.outer}
        style={{
          border: `calc(${width}/300) solid rgba(${color.r}, ${color.g}, ${color.b}, 0.8)`,
          backgroundColor: bgColor,
        }}
      ></div>
      <div
        className={`${styles.inner} ${styles.innerMain}`}
        style={{
          border: `calc(${width}/300) solid rgba(${color.r}, ${color.g}, ${color.b}, 0.8)`,
          backgroundColor: bgColor,
        }}
      ></div>
      <div
        className={`${styles.inner} ${styles.innerBuffer}`}
        style={{ border: `calc(${width}/150) solid ${bgColor}` }}
      ></div>
      {displayText && (
        <div className={styles.svgContainer}>
          <svg viewBox="0 0 500 500">
            <path
              id={uniqueID}
              className={styles.pathInvis}
              d={f_svg_ellipse_arc(
                [250, 250],
                [180, 180],
                [3 + (0.8 - displayText.length / 13), 2],
                0
              )}
            />
            <text width="500">
              <textPath
                xlinkHref={`#${uniqueID}`}
                className={styles.pathText}
                style={{ fill: darkMode ? "lightgrey" : "black" }}
              >
                {displayText}
              </textPath>
            </text>
          </svg>
        </div>
      )}
      {showScaleBg && ( // scale background
        <div className={`${styles.svgContainer}`}>
          <svg viewBox="0 0 500 500">
            <path
              style={{
                fill: `rgba(${darkMode ? color.r - 120 : color.r}, ${
                  darkMode ? color.g - 120 : color.g
                }, ${darkMode ? color.b - 120 : color.b}, ${
                  darkMode ? 1 : 0.3
                })`,
              }}
              d={f_svg_ellipse_arc(
                [250, 250],
                [240, 240],
                [
                  -1.5708,
                  variant === "shaded" ? 6.28318 : percentToRadians(100),
                ],
                0,
                true
              )}
            />
          </svg>
        </div>
      )}
      {showScale && ( // scale
        <div className={`${styles.svgContainer}`}>
          <svg viewBox="0 0 500 500">
            <path
              style={{ fill: `rgba(${color.r}, ${color.g}, ${color.b}, 1)` }}
              d={f_svg_ellipse_arc(
                [250, 250],
                [240, 240],
                [-1.5708, percentToRadians(displayPercent)],
                0,
                true
              )}
            />
          </svg>
        </div>
      )}
      {showSegments &&
        variant !== "battery" && // segment lines
        lineAngles.map((angle) => (
          <div
            className={`${styles.svgContainer} ${styles.svgRadials}`}
            key={`${angle}`}
          >
            <svg viewBox="0 0 500 500">
              <path
                className={styles.pathRadials}
                style={{ stroke: bgColor }}
                d={`M ${line.cx} ${line.cx} L ${
                  findPoint({ ...line, angle }).x
                } ${findPoint({ ...line, angle }).y}`}
              />
            </svg>
          </div>
        ))}

      {showSegments &&
        variant === "battery" && // segment lines
        lineAnglesBattery.map((angle) => (
          <div
            className={`${styles.svgContainer} ${styles.svgRadials}`}
            key={`${angle}`}
          >
            <svg viewBox="0 0 500 500">
              <path
                className={styles.pathRadials}
                style={{ stroke: bgColor }}
                d={`M ${line.cx} ${line.cx} L ${
                  findPoint({ ...line, angle }).x
                } ${findPoint({ ...line, angle }).y}`}
              />
            </svg>
          </div>
        ))}
      {Icon && (
        <div className={`${styles.svgIcon} ${styles.svgContainer}`}>
          <Icon style={{}} />
        </div>
      )}
      {!Icon && iconText && (
        <div
          className={styles.iconTextContainer}
          style={{ color: darkMode ? "lightgrey" : "black" }}
        >
          <span
            dangerouslySetInnerHTML={{
              __html: showSecondary ? iconTextSecondary : iconText,
            }}
            style={{
              textAlign: "center",
              fontSize: `calc(1vmin * ${iconTextSize})`,
            }}
          ></span>
        </div>
      )}
    </div>
  );
};

export default Gauge;

// 90 deg = radians 1.5708
