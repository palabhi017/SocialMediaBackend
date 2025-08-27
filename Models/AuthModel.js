import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  ProfileImg: {
    type: String,
  },
  ProfilePicPublicId: {
    type: String,
  },
  City: {
    type: String,
  },
  Gender: {
    type: String,
  },
});

export default mongoose.model("user", UserSchema);
