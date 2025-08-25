import mongoose from "mongoose";
import comment from "../Models/commentModel.js";
import { emitToAll } from "../Config/SocketService.js";
import post from "../Models/PostModel.js";


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
            },
            {
                $sort: {
                    createdAt: -1
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
        await post.findByIdAndUpdate(createcomment.postId, { $inc: { commentCount: 1 } })
        const populatedComment = await comment.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(createcomment._id) }
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

        console.log(populatedComment[0], " populatedComment[0]")

        const io = req.app.get("io");
        emitToAll(io, "commentCount", createcomment.postId);
        emitToAll(io, "newComment", populatedComment[0]);


        res.status(200).json({ ...populatedComment[0] })
    } catch (err) {
        console.log(err.message)
        return res.status(500).send({ err: err })
    }
}
export { getUserComments, postUserComments };
