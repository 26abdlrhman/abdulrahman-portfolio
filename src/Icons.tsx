type Direction = "up-right" | "down-left" | "down" | "up" | "left" | "right";
const paths: Record<Direction, string> = {
  "up-right": "M5 19 19 5M5 5h14v14",
  "down-left": "M19 5 5 19M5 5v14h14",
  down: "M12 3v18M5 14l7 7 7-7",
  up: "M12 21V3M5 10l7-7 7 7",
  left: "M21 12H3M10 5l-7 7 7 7",
  right: "M3 12h18M14 5l7 7-7 7",
};
export function Arrow({ direction = "up-right" }: { direction?: Direction }) {
  return <svg className="arrow icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d={paths[direction]} /></svg>;
}
export function Spark() {
  return <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" focusable="false"><path d="M12 2v20M2 12h20M5 5l14 14M5 19 19 5" /></svg>;
}
export function Globe() {
  return <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/></svg>;
}
