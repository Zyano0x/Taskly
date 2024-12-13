export function formatDateTime(
  input: string | Date,
  options?: Intl.DateTimeFormatOptions,
): string {
  // Convert input to a Date object if it's a string
  const date = typeof input === "string" ? new Date(input) : input;

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date input");
  }

  // Define default options
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  // Use provided options or fallback to default
  const formatter = new Intl.DateTimeFormat("en-US", options || defaultOptions);
  return formatter.format(date);
}
