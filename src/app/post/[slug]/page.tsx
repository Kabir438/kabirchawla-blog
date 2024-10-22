import { inter } from "@/app/layout"
import BlogTable from "@/components/blog-table"
import Code from "@/components/code"
import Comments from "@/components/comments"
import CountViews from "@/components/count-views"
import MuxVideo from "@/components/mux"
import SanityImage from "@/components/sanity-image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import YouTube from "@/components/youtube"
import { cn } from "@/lib/utils"
import { urlFor } from "@/sanity/lib/image"
import type { imageSchema } from "@/utils/contentType"
import getBlog from "@/utils/getBlog"
import { PortableText } from "@portabletext/react"
import { ArrowLeft, Clock, Eye, StarHalfIcon, StarIcon } from "lucide-react"
import { Fira_Code } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import type { z } from "zod"
import Rater from "../../../components/rater"

export const firaCode = Fira_Code({
  subsets: ["latin-ext"],
  weight: ["300", "500", "700"],
});

export function timeAgo(timestamp: number, now?: number): string {
  const n = now || Date.now();
  const seconds = Math.floor((n - timestamp) / 1000);

  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return seconds <= 5 ? "just now" : `${seconds} seconds ago`;
  } if (minutes < 60) {
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  } if (hours < 24) {
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  } if (days < 7) {
    return days === 1 ? "1 day ago" : `${days} days ago`;
  } if (weeks < 4) {
    return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
  } if (months < 12) {
    return months === 1 ? "1 month ago" : `${months} months ago`;
  } if (years < 2) {
    return "1 year ago";
  }
  return `${years} years ago`;
}


export default async function BlogPost(props0: { params: Promise<{ slug: string; }> }) {
  const params = await props0.params;

  const {
    slug
  } = params;

  const post = await getBlog(slug);
  // console.log(post);
  // return <></>
  return (
    <>
      <article className="container mx-auto px-8 py-8">
        <a href="https://kabirchawla.com/?from=blog" className="mb-10">
          <Button variant={"secondary"} className="group/button bg-slate-400 mb-3 border-[2px] border-slate-200 border-opacity-0 font-semibold text-md bg-opacity-15 hover:border-opacity-95 hover:bg-slate-400 hover:bg-opacity-25">
            <ArrowLeft className="group-hover/button:mr-2 transition-all" />
            Go Back to<span className="text-[#ffd9ae] group-hover/button:text-[#ffffff] hover:[text-shadow:0px_0px_4px_#ffffff] [text-shadow:0px_0px_4px_#ffd9aeaa] ml-1 underline">KabirChawla.com</span>
          </Button>
        </a>
        <Breadcrumb>
          <BreadcrumbList className="!gap-[1px]">
            <BreadcrumbItem className="text-gray-400 hover:text-gray-300 hover:underline">
              <BreadcrumbLink useNativeAnchorTag href="/">KabirChawla.com</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="text-gray-400 hover:text-gray-300 hover:underline">
              <BreadcrumbLink href="/">Posts</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="text-white hover:underline">
              <BreadcrumbPage>{slug.split("-").map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(" ")}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="rounded-tr-xl rounded-tl-xl relative overflow-hidden aspect-[16_/_7] mt-4 my-8">
          {post?.bannerImage && "asset" in post.bannerImage && <Image
            src={urlFor(post.bannerImage.asset).url()}
            alt="AI and Web Development"
            width={800}
            height={400}
            className="rounded-tr-xl rounded-tl-xl object-cover w-full aspect-[16_/_7] object-center [filter:url(#glow)]"
          />}
          <div className="absolute w-full h-full top-0 left-0" style={{
            backgroundImage: "linear-gradient(0deg, rgb(9, 9, 11, var(--tw-bg-opacity)) 0%, transparent 69%)"
          }}></div>
          <div className="flex flex-col gap-2 absolute w-full h-full top-0 left-0 justify-end px-4 pb-4">
            <CountViews documentId={post._id} />
            <div className="space-y-2 mt-2">
              <div className="flex items-center space-x-2">
                {
                  post.categories.map(category => (
                    <Badge className="rounded-sm cursor-default bg-zinc-800 hover:bg-zinc-800 border-[1px] border-zinc-400 text-zinc-200" key={category.slug.current}>{category.title}</Badge>
                  ))
                }
              </div>
              <h1 className="text-5xl !mt-2 font-bold">{post.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <span className={cn("flex items-center justify-center gap-1",
                    (Math.floor(post.rating) - post.rating < 0) && "ml-0"
                  )}>
                    {
                      [
                        Array(Math.floor(post.rating)).fill(null).map((item, index) => <StarIcon className="w-4 h-4 text-yellow-400" key={`star456-${item + index}`} />)
                      ]
                    }
                    {
                      [
                        (Math.floor(post.rating) - post.rating < 0) && <StarHalfIcon className="w-4 h-4 text-yellow-400" />
                      ]
                    }
                  </span>
                  <span>{post.rating}</span>
                </div>
                <div className="flex items-center">
                  <Eye className="mr-1 h-4 w-4 text-blue-400" />
                  <span>{post.baseViews + post.actualViews} views</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4 text-teal-400" />
                  <span>8 min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="prose prose-lg max-w-none text-lg">
          <PortableText
            value={post.body}
            components={{
              types: {
                image: ({ value }: { value: z.infer<typeof imageSchema> }) => (
                  <div className="flex justify-center items-center w-full my-8 relative min-w-max">
                    <SanityImage src={value} width={"lg:w-[500px] w-[300px]"} alt={"some-img"} className="object-cover !relative" />
                  </div>
                ),
                code: ({ value }: {
                  value: {
                    code: string;
                    language: string;
                  }
                }) => {
                  // console.log(others)
                  return (
                    <Code value={value} />
                  );
                },
                youtubeVideo: ({ value }: {
                  value: {
                    _type: 'youtubeVideo',
                    videoId: string,
                    _key: string,
                    autoplay: boolean,
                    controls: boolean
                  }
                }) => {
                  return (
                    <YouTube className={cn("lg:w-[700px] w-[300px] h-auto")} videoId={value.videoId} opts={{
                      autoplay: value.autoplay,
                      controls: value.controls,
                    }} />
                  );
                },
                "mux.video": ({ value }: {
                  value: {
                    _type: 'mux.video',
                    _key: string,
                  }
                }) => {
                  console.log("hello", value)
                  return (
                    // <YouTube className={cn(`lg:w-[700px] w-[300px] h-auto`)} videoId={value.videoId} opts={{
                    //   autoplay: value.autoplay,
                    //   controls: value.controls,
                    // }} />
                    (<MuxVideo assetKey={value._key} className="lg:w-[700px] w-[300px]" />)
                  );
                },
                table: (props: {
                  value: {
                    _type: "table";
                    _key: string;
                    rows: {
                      _type: "tableRow";
                      _key: string;
                      cells: string[];
                    }[];
                  }
                }) => {
                  // console.log(JSON..stringify(props.value))
                  return <BlogTable value={props.value} />
                }
              },
              marks: {
                link: ({ children, value }) => (
                  <Link href={value.href} rel="noreferrer" className="underline font-semibold active:text-[#396db7] hover:text-[#599eff] text-[#99c3ff] visited:active:text-[#9b29ff] visited:hover:text-[#c480ff] visited:text-[#d29eff]">
                    {children}
                  </Link>
                ),
                code: ({ children }) => (
                  <code className={`text-gray-200 bg-zinc-700 px-1 rounded-sm ${firaCode.className}`}>{children}</code>
                ),
              },
              block: {
                h1: ({ children }) => <h1 className="text-4xl font-bold">{children}</h1>,
              },
              list: {
                number: ({ children }) => <ol className={cn("mt-xl list-decimal pl-[17px]")}>{children}</ol>,
                bullet: ({ children }) => <ul className="mt-xl list-disc pl-[15px]">{children}</ul>,
              },
              listItem: {
                number: ({ children }) => <li className={cn(`marker:font-[${inter.variable}] marker:!ordinal`, inter.className)}>{children}</li>,
                bullet: ({ children }) => <li>{children}</li>,
              }
            }}
          // components={/* optional object of custom components to use */}
          />
        </div>
        <Separator className="my-8" />
        <div className="my-8 flex items-stretch space-x-6 h-max max-h-48 overflow-y-hidden">
          <Avatar className="flex-none h-48 w-auto aspect-square">
            <AvatarImage src={urlFor(post.author.image).url()} alt={post.author.image.alt || post.author.name} className="h-full w-full object-cover flex justify-center items-center" />
            <AvatarFallback className="flex h-full w-full text-4xl items-center justify-center">{post.author.name.split(" ").map(word => word[0]).join("")}</AvatarFallback>
          </Avatar>
          <div className="flex-grow flex flex-col justify-center">
            <p className="text-xl font-semibold">{post.author.name}</p>
            <p className="text-muted-foreground">{post.author.caption}</p>
            <p className="mt-2">
              {post.author.bio}
            </p>
          </div>
        </div>
        <Separator className="my-8" />
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl">Rate this article</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Rater slug={slug} />
          </CardContent>
        </Card>
        <Comments post={post} />
      </article>
    </>
  );
}