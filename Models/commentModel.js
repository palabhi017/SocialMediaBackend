import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    require: true,
  },
  postId: {
    type: mongoose.Types.ObjectId,
    require: true,
  },
  comment: {
    type: String,
    require: true,
    trim: true,
  },
});

const comment = mongoose.model("comment", commentSchema);

export default comment;
