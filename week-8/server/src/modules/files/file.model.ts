import { Schema, model } from "mongoose";

const fileSchema = new Schema(
  {
    originalName: {
      type: String,
      required: true,
    },
    objectKey: {
      type: String,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const FileModel = model("File", fileSchema);

export { FileModel };
