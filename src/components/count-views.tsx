"use client";

import incrementViewCount from "@/actions/incrementViewCount";
import { useEffect } from "react";

export default function CountViews({
    documentId
}: {
    documentId: string
}) {
    useEffect(() => {
        const hasSeen = !!localStorage.getItem(`seen-${documentId}`);
        if (hasSeen) return;
        incrementViewCount(documentId)
        localStorage.setItem(`seen-${documentId}`, "true");

    }, [documentId])
    return null;
}