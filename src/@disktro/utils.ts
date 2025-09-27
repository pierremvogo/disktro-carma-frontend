export const wait = async (delay = 1000) => {
  console.log("Wait ", delay);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, delay);
  });
};
