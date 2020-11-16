export const isValidRange = (number, max) => number <= max && number > 0;

export const isValidTime = (beforeTime, afterTime) => {
  const currentTime = new Date();
  return currentTime >= beforeTime && currentTime < afterTime;
};

export const isBeforeTime = (targetTime) => {
  const currentTime = new Date();
  return currentTime < targetTime;
};

export const isAfterTime = (targetTime) => {
  const currentTime = new Date();
  return currentTime >= targetTime;
};

export const toDays = (time) => {
  return Math.floor(time / (1000 * 60 * 60 * 24));
};

export const toHours = (time) => {
  return Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
};

export const toMinutes = (time) => {
  return Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
};

export const toSeconds = (time) => {
  return Math.floor((time % (1000 * 60)) / 1000);
};
