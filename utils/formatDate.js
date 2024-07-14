export const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const now = new Date();
  const differenceInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  );

  const formattedDate = date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return `about ${differenceInHours} hours ago (${formattedDate})`;
};
