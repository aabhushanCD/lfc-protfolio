import { Schema, model } from "mongoose";

const fileSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    originalName: {
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

const Files = model("File", fileSchema);

export { Files };
