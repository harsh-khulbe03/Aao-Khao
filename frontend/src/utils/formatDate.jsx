export function formatDate(orderDate) {
  const date = new Date(orderDate);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
