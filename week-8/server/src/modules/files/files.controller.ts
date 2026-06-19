import { Request, Response } from "express";
import { Files } from "./file.model.ts";
interface IFile {
  name: string;
  originalName: string;
  size: number;
}
export const uploadFile = async (req: Request, res: Response) => {
  const file = req.file;

  console.log(file);
  const newFile = new Files({
    name: file.filename,
    originalName: file.originalname,
    size: file.size,
  });
  await newFile.save();
  res.json({ message: "File upload Successfully" });
};
