export const logger = {
  info: (message: string) => {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
  },
  warn: (message: string) => {
    console.log(`[WARN] ${new Date().toISOString()} - ${message}`);
  },
  error: (message: string) => {
    console.log(`[ERROR] ${new Date().toISOString()} - ${message}`);
  },
};
