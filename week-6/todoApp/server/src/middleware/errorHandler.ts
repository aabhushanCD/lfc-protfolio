export const errorHandler = (err: Error, req: any, res: any) => {
  console.error("Error:", err);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
};
