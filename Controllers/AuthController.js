const User = require("../Models/AuthModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
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
      .json({ message: "User Created Successfully", token });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
};

const loginUser = async (req, res) => {
  const { Email, Password } = req.body;

  try {
    let isUser = await User.findOne({ Email });
    if (!isUser)
      return res
        .status(400)
        .json({ message: "User Not avalible with this Email" });

    let isMatch = await bcrypt.compare(Password, isUser.Password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    let token = jwt.sign({ id: isUser._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .json({ message: "User Loged In Successfully", token });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Server Error" });
  }
};

module.exports = { signUpUser, loginUser };
