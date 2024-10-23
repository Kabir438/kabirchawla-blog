"use server"

import admin, { db } from "./firebase"

const incrementViewCount = async (documentId: string) => {
    try {
        // const res = await client
        //     .patch(documentId)
        //     .inc({ actualViews: 1 })
        //     .commit()
        const res = await db
            .collection("posts")
            .doc(documentId)
            .update({
                viewCount: admin.firestore.FieldValue.increment(1),
            })
        return res;
    } catch(e) {
        return e;
    }
}

export default incrementViewCount;