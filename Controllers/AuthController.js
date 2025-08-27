import User from "../Models/AuthModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cloudinary from "../Config/Cloudinary.js";
dotenv.config();
const signUpUser = async (req, res) => {
  const { Name, Email, Password } = req.body;
  try {
    let isUserAlreadyThere = await User.findOne({ Email });
    if (isUserAlreadyThere) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);
    const AddUser = new User({
      Name: Name,
      Email: Email,
      Password: hashedPassword,
    });

    let data = await AddUser.save();

    let token = jwt.sign({ id: data?._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    console.log(token);
    return res
      .status(201)
      .json({ message: "User Created Successfully", token, userData: data });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
};

const loginUser = async (req, res) => {
  const { Email, Password } = req.body;

  try {
    let isUser = await User.findOne({ Email });
    console.log(isUser, "isUserisUser");
    if (!isUser)
      return res
        .status(400)
        .json({ message: "User Not avalible with this Email" });

    let isMatch = await bcrypt.compare(Password, isUser.Password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    let token = jwt.sign({ id: isUser._id }, process.env.SECRET_KEY);
    console.log(isUser, "isUserisUser");
    return res
      .status(200)
      .json({ message: "User Loged In Successfully", token, userData: isUser });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Server Error" });
  }
};

const editUserProfile = async (req, res) => {
  console.log(req.userId, "userIduserId");
  const id = req.userId;

  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "profileImg",
    });
    let data = await User.findByIdAndUpdate(id, {
      ProfileImg: result.secure_url,
      ProfilePicPublicId: result.public_id,
      City: req.City,
    });
    console.log(data);
    res.status(201).json({ message: "Success", data });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

export { signUpUser, loginUser, editUserProfile };
