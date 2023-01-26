import { style } from "@vanilla-extract/css";

export const styles = {
  main: style({
    position: "relative",
    width: "100%",
    height: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    fontFamily: ["Roboto", "sans-serif"].join(","),
    display: "grid",
    gridAutoFlow: "row",
    gridTemplateRows: "auto",
    gridAutoRows: "1fr",
    justifyContent: "center",
  }),
  statusIcon: style({
    position: "absolute",
    paddingRight: "2rem",
  }),
  body: style({
    display: "grid",
    gridAutoFlow: "row",
    gridAutoColumns: "1fr",
    position: "relative",
  }),
  row: style({
    display: "grid",
    gridAutoFlow: "column",
    gridAutoColumns: "1fr",
  }),
  svgContainer: style({
    position: "absolute",
    width: "100%",
    height: "100%",
  }),
  lines: style({
    position: "absolute",
  }),
  pathRadials: style({
    strokeWidth: "2px",
  }),
  pathChevrons: style({
    strokeWidth: "4px",
  }),
};
