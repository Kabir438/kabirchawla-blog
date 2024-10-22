"use server";

import { db } from "./firebase";

const publishComments = async (comments: {
    message: string;
    name: string;
    commented_at: string;
}, documentId: string) => {
    try {
        const res = await db
            .collection("posts")
            .doc(documentId)
            .collection("comments")
            .add({
                message: comments.message,
                name: comments.name,
                commented_at: comments.commented_at
            })
        console.log(res)
    } catch (err) {
        console.log(err, "error creating");
    }
}

export default publishComments;