const cos = Math.cos;
const sin = Math.sin;
const π = Math.PI;

const f_matrix_times = ([[a, b], [c, d]]:Array<any>, [x, y]:Array<any>) => [
  a * x + b * y,
  c * x + d * y,
];
const f_rotate_matrix = (x:number) => [
  [cos(x), -sin(x)],
  [sin(x), cos(x)],
];
const f_vec_add = ([a1, a2]:Array<any>, [b1, b2]:Array<any>) => [a1 + b1, a2 + b2];

export const f_svg_ellipse_arc = (
  [cx, cy]:Array<any>,
  [rx, ry]:Array<any>,
  [t1, Δ]:Array<any>,
  φ:number,
  makePie = false
) => {
  /* [
returns a SVG path element that represent a ellipse.
cx,cy → center of ellipse
rx,ry → major minor radius
t1 → start angle, in radian.
Δ → angle to sweep, in radian. positive.
φ → rotation on the whole, in radian
URL: SVG Circle Arc http://xahlee.info/js/svg_circle_arc.html
Version 2019-06-19
] */
  Δ = Δ % (2 * π);
  const rotMatrix = f_rotate_matrix(φ);
  const [sX, sY] = f_vec_add(
    f_matrix_times(rotMatrix, [rx * cos(t1), ry * sin(t1)]),
    [cx, cy]
  );
  const [eX, eY] = f_vec_add(
    f_matrix_times(rotMatrix, [rx * cos(t1 + Δ), ry * sin(t1 + Δ)]),
    [cx, cy]
  );
  const fA = Δ > π ? 1 : 0;
  const fS = Δ > 0 ? 1 : 0;

  const d = makePie
    ? "M " +
      cx +
      " " +
      cy +
      " " +
      "L " +
      sX +
      " " +
      sY +
      " A " +
      [rx, ry, (φ / (2 * π)) * 360, fA, fS, eX, eY].join(" ") +
      " L " +
      cx +
      " " +
      cy
    : "M " +
      sX +
      " " +
      sY +
      " A " +
      [rx, ry, (φ / (2 * π)) * 360, fA, fS, eX, eY].join(" ");
  return d;
};

export const percentToRadians = (pc: number | undefined) => {
  const full = 1.5708 * 3;
  return ((pc || 0 - 0) * (full - 0)) / (100 - 0) + 0;
};

type FindPointProps = {
  cx: number;
  cy: number;
  rad: number;
  angle: number;
};

export const findPoint = ({ cx, cy, rad, angle }:FindPointProps) => {
  var cornerRad = (angle * Math.PI) / 180;
  var nx = Math.cos(cornerRad) * rad + cx;
  var ny = Math.sin(cornerRad) * rad + cy;
  return { x: nx, y: ny };
};
