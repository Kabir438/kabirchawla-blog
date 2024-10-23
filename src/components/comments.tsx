"use client"

import publishComments from "@/actions/publishComments";
import useTime from "@/hooks/useTime";
import type getBlog from "@/utils/getBlog";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useState } from "react"
import { adjectives, animals, uniqueNamesGenerator } from "unique-names-generator";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import timeAgo from "@/utils/timeAgo";

function stringToPastelColor(seed: string): string {
    // Simple hash function to convert string to a number
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Generate HSL values from the hash
    const h = (hash % 360);            // Hue between 0 and 360
    const s = 70 + (hash % 30);         // Saturation between 70% and 100%
    const l = 85 + (hash % 10);         // Lightness between 85% and 95% for pastel effect

    return `hsl(${h}, ${s}%, ${l}%)`;   // HSL color string
}


const generateName = () => uniqueNamesGenerator({
    dictionaries: [adjectives, animals], // colors can be omitted here as not used
    length: 2,
    separator: ' ',
})
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.substring(1))
    .join(" ");

export default function Comments({
    post
}: {
    post: Awaited<ReturnType<typeof getBlog>>
}) {
    const [myComments, setMyComments] = useState<null | typeof post['comments']>(null)
    const time = useTime();
    return (
        <>
            <Card className="my-8">
                <CardHeader>
                    <CardTitle className="text-2xl">Add a Comment</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4"
                        onSubmit={(ev) => {
                            ev.preventDefault();
                            const comment = (document.getElementById("comment") as HTMLTextAreaElement).value;
                            (document.getElementById("comment") as HTMLTextAreaElement).value = "";
                            const name = generateName();
                            setMyComments(prev => [...(prev || []), {
                                message: comment,
                                commented_at: new Date().toISOString(),
                                name: localStorage.getItem("user") || name,
                            }])
                            if (!localStorage.getItem("user")) { localStorage.setItem("user", name) }
                            document.querySelector('.myComment:last-child')?.scrollIntoView();
                            publishComments({
                                message: comment,
                                commented_at: new Date().toISOString(),
                                name: localStorage.getItem("user") || name
                            }, post._id)
                        }}
                        onKeyDown={(event) => {
                            const isMac = navigator.platform.toUpperCase().includes('MAC');
                            const isCommandEnter = isMac && event.metaKey && event.key === 'Enter';
                            const isCtrlEnter = !isMac && event.ctrlKey && event.key === 'Enter';

                            if (isCommandEnter || isCtrlEnter) {
                                event.preventDefault(); // Prevent default behavior if needed
                                const comment = (document.getElementById("comment") as HTMLTextAreaElement).value;
                                (document.getElementById("comment") as HTMLTextAreaElement).value = ""
                                const name = generateName();
                                setMyComments(prev => [...(prev || []), {
                                    message: comment,
                                    commented_at: new Date().toISOString(),
                                    name: localStorage.getItem("user") || name
                                }])
                                if (!localStorage.getItem("user")) { localStorage.setItem("user", name) }
                                document.querySelector('.myComment:last-child')?.scrollIntoView();
                                publishComments({
                                    message: comment,
                                    commented_at: new Date().toISOString(),
                                    name: localStorage.getItem("user") || name
                                }, post._id)
                            }
                        }}
                    >
                        <div className="grid w-full gap-1.5">
                            <textarea
                                id="comment"
                                className="flex font-semibold placeholder:text-gray-300 text-gray-300 min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-2 ring-gray-300 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Type your comment here."
                                style={{
                                    color: 'white',
                                    fontWeight: '500',
                                    letterSpacing: '0.5px',
                                    fontSize: '16px'
                                }}
                            />
                        </div>
                        <Button type="submit" className="font-semibold">Submit Comment</Button>
                    </form>
                </CardContent>
            </Card>

            <h2 className="mt-8 text-2xl font-bold mb-4">Comments</h2>
            <div className="space-y-4">
                {myComments?.sort((comment1, comment2) => Date.parse(comment1.commented_at) - Date.parse(comment2.commented_at))?.map((myComment, commentIndex) => (
                    <Card key={`0-${commentIndex}-${myComment.message}`} className="myComment">
                        <CardHeader>
                            <div className="flex items-center space-x-2">
                                <Avatar className="h-12 w-12 rounded-full overflow-hidden" style={{
                                    backgroundColor: stringToPastelColor(myComment.name)
                                }}>
                                    <AvatarImage src={`https://api.dicebear.com/9.x/notionists/svg?seed=${myComment.name.replace("User#", "")}`} className="scale-125" alt={`User ${myComment.name}`} />
                                    <AvatarFallback>{myComment.name.split(" ").map(i => i[0]).join("")}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">{myComment.name}</p>
                                    <p className="text-sm text-muted-foreground">{timeAgo(Date.parse(myComment.commented_at), time.getTime())}</p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p>{myComment.message}</p>
                        </CardContent>
                    </Card>
                ))}
                {post.comments.sort((comment1, comment2) => Date.parse(comment2.commented_at) - Date.parse(comment1.commented_at)).map((comment, commentIndex) => (
                    <Card key={`1-${commentIndex}-${comment.message}`}>
                        <CardHeader>
                            <div className="flex items-center space-x-2">
                                <Avatar className="h-12 w-12 rounded-full overflow-hidden" style={{
                                    backgroundColor: stringToPastelColor(comment.name)
                                }}>
                                    <AvatarImage src={`https://api.dicebear.com/9.x/notionists/svg?seed=${comment.name.replace("User#", "")}`} className="scale-125" alt={`User ${comment.name}`} />
                                    <AvatarFallback>{comment.name.split(" ").map(i => i[0]).join("")}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">{comment.name}</p>
                                    <p className="text-sm text-muted-foreground">{timeAgo(Date.parse(comment.commented_at), time.getTime())}</p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p>{comment.message}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    )
}