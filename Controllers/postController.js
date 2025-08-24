import cloudinary from "../Config/Cloudinary.js";
import { emitToAll } from "../Config/SocketService.js";
import post from "../Models/PostModel.js";

const createPost = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "posts",
    });

    let PostObj = new post({
      ...req.body,
      Image: result.secure_url,
      ImagePublicId: result.public_id,
    });
    let data = await PostObj.save();
    const io = req.app.get("io");
    emitToAll(io, "new_post", data);
    res.status(201).json({ message: "Success", data });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const getAllPost = async (req, res) => {
  try {
    let allPost = await post.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "User",
          foreignField: "_id",
          as: "User",
        },
      },
      {
        $unwind: {
          path: "$User",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    res.status(201).json({ message: "Success", allPost });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

export { createPost, getAllPost };
