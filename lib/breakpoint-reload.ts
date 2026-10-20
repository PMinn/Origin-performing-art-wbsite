// 桌機（寬 >= 48rem 且橫向）／手機版型是在掛載時決定的；旋轉或縮放跨過界線時重新載入，讓版型與動畫重新初始化。
export const DESKTOP_QUERY = "(min-width: 48rem) and (orientation: landscape)";

export function reloadOnBreakpointChange() {
  const mq = window.matchMedia(DESKTOP_QUERY);
  const onChange = () => window.location.reload();
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
