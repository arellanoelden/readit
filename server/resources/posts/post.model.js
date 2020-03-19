import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    textContent: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    imageUrl: String,
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
      required: true
    },
    upvotes: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export const Post = mongoose.model("posts", postSchema);
