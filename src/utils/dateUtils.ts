export const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "long",
  weekday: "short",
  day: "numeric",
});

export function formatInputDate(string: { slice: (arg0: number, arg1: number) => number; }): Date {
  return new Date(string.slice(6, 10), string.slice(3, 5) - 1, string.slice(0, 2));
}
