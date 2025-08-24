import mongoose from "mongoose";
import comment from "../Models/commentModel.js";


const getUserComments = async (req, res) => {
    try {
        const { postId } = req.params

        const createcomment = await comment.aggregate([
            {
                $match: { postId: new mongoose.Types.ObjectId(postId) }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: {
                    path: "$user",
                    preserveNullAndEmptyArrays: true
                }
            }
        ])

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
        const populatedComment = await comment.findById(createcomment._id).populate('userId');

        res.status(200).json({ ...populatedComment})
    } catch (err) {
        console.log(err.message)
        return res.status(500).send({ err: err })
    }
}
export { getUserComments, postUserComments };
