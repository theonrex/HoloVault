// Helper function to truncate the signature
export const truncateData = (signature) => {
  return `${signature.slice(0, 9)}.....${signature.slice(-9)}`;
};
export const truncateDataSignature = (str) => {
  if (str.length <= 10) {
    return str;
  }
  return `${str.slice(0, 5)}...${str.slice(-5)}`;
};
// Utility function to truncate data
export const getFirstAndLastFive = (str) => {
  if (str.length <= 10) {
    return str;
  }
  return `${str.slice(0, 5)}...${str.slice(-5)}`;
};
