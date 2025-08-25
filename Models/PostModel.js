import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    Image: {
      type: String,
      require: true,
    },
    ImagePublicId: {
      type: String,
      require: true,
    },
    User: {
      type: mongoose.Types.ObjectId,
      require: true,
    },
    Caption: {
      type: String,
    },
    Location: {
      type: String,
    },
    commentCount: {
      type: Number,
    }
  },
  {
    timestamps: true,
  }
);

const post = mongoose.model("post", postSchema);

export default post;
