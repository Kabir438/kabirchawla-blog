"use server";

import { db } from "./firebase";

const publishComments = async (comments: {
    message: string;
    name: string;
    commented_at: string;
}, documentId: string) => {
    try {
        await db
            .collection("posts")
            .doc(documentId)
            .collection("comments")
            .add({
                message: comments.message,
                name: comments.name,
                commented_at: comments.commented_at
            })
    } catch (err) {
        console.error(err)
    }
}

export default publishComments;