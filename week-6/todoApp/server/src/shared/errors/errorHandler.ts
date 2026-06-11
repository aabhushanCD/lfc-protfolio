export const errorHandler = (err: any, req: any, res: any) => {
  console.error("Error:", err);
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message, error: message });
};
