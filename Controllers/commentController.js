const comment = require("../Models/commentModel")

const getUserComments = async (req, res) => {
    try {
        console.log("oooooooooooooooo")
        const createcomment = await comment.find({})
        console.log(createcomment, "createcomment")
        res.status(200).json(createcomment)
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Err :", err.message)
    }
}

const postUserComments = async (req, res) => {
    try {
        const createcomment = await comment.create({
            ...req.body
        })
        console.log(createcomment, "createcommentcreatecomment")
        res.status(200).json({ ...createcomment._doc })

    } catch (err) {
        console.log(err.message)
        res.status(500).json({ err: err.message })
    }
}

module.exports = { getUserComments, postUserComments }