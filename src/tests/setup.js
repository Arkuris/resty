
const originalLog = console.log;
const originalWarn = console.warn;
const originalError = console.error;

console.log = (...args) => {
  if (process.env.NODE_ENV === 'test') return;
  originalLog(...args);
};

console.warn = (...args) => {
  if (process.env.NODE_ENV === 'test') return;
  originalWarn(...args);
};

console.error = (...args) => {
  if (process.env.NODE_ENV === 'test') return;
  originalError(...args);
};
