// const comment = require("../Models/commentModel")

const getUserComments = (req, res) => {
  try {
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Err :", err.message);
  }
};

const postUserComments = (req, res) => {
  try {
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ err: err.message });
  }
};

export { getUserComments, postUserComments };
