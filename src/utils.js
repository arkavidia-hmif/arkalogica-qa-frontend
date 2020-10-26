export const isValidRange = (number, max) => number <= max && number > 0;

export const isValidTime = (beforeTime, afterTime) => {
  //   const date =
  //     new Date(beforeTime) <= new Date() && Date(afterTime) >= new Date();
  //   console.log(date);
  return true;
};

export const isBetweenTime = (beforeTime, afterTime) => {
  const currentTime = new Date();
  return currentTime >= beforeTime && currentTime <= afterTime;
};

export const isBeforeTime = (targetTime) => {
  const currentTime = new Date();
  return currentTime <= targetTime;
};

export const isAfterTime = (targetTime) => {
  const currentTime = new Date();
  return currentTime >= targetTime;
};
