import { globalStyle, style } from "@vanilla-extract/css";

interface Props {
  gaugeColor: { r: number; g: number; b: number };
  darkMode: boolean;
  bgColor: string;
  width: string;
  hasSecondary: boolean;
}

export const styles = {
  parent: style({
    flex: 1,
    position: "relative",
    width: "100%",
    height: "100%",
  }),
  outer: style({
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    boxSizing: "border-box",
    boxShadow: "1px 1px 3px rgba(0,0,0,0.5)",
    "@media": {
      "screen and (min-width:600px)": {
        //border: `3px solid rgba(${r}, ${g}, ${b}, 0.8)`,
        boxShadow: "1px 1px 5px rgba(0,0,0,0.5)",
      },
    },
  }),
  inner: style({
    height: "66%",
    width: "66%",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: "auto",
    borderRadius: "50%",
  }),
  innerMain: style({
    zIndex: 5,
  }),
  innerBuffer: style({
    zIndex: 4,
  }),
  svgContainer: style({
    height: "100%",
    width: "100%",
  }),
  svgIcon: style({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "120px",
    zIndex: 5,
  }),
  pathInvis: style({
    fill: "transparent", // <=====
  }),
  svgRadials: style({
    zIndex: 3,
  }),
  pathRadials: style({
    strokeWidth: "5px",
  }),
  pathText: style({
    fontSize: "4.5rem",
    transform: "scale(+1,-1)",
  }),
  iconTextContainer: style({
    height: "100%",
    width: "100%",
    zIndex: 7,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
};

globalStyle(`${styles.parent} > div`, {
  position: "absolute",
});
globalStyle(`${styles.parent} *`, {
  //cursor: hasSecondary ? "pointer" : "",
});
globalStyle(`${styles.svgIcon} > img`, {
  width: "40%",
  left: "auto",
  right: "auto",
  zIndex: 6,
  "@media": {
    "screen and (max-width:600px)": {
      filter: "drop-shadow( 1px 1px 1px rgba(0, 0, 0, .5))",
    },
    "screen and (min-width:600px)": {
      filter: "drop-shadow( 2px 2px 2px rgba(0, 0, 0, .5))",
    },
  },
});
globalStyle(`${styles.iconTextContainer} > * > *`, {
  maxWidth: "calc(95vmin /3)",
  maxHeight: "calc(95vmin /3)",
});
