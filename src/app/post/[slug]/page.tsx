import { firaCode, inter } from "@/app/fonts"
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
import Image from "next/image"
import Link from "next/link"
import type { z } from "zod"
import Rater from "../../../components/rater"

export async function generateMetadata({ params }: { params: Promise<{ slug: string; }> }) {
  const post = await getBlog((await params).slug);
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.href}`, // Assuming slug is part of the URL
      type: 'article',
      article: {
        publishedTime: new Date(post.publishedAt).toISOString(),
        authors: [post.author.name], // Assuming the author object has a 'name' field
        tags: post.categories.map((category) => category.title), // Assuming 'categories' have a 'name' field
      },
      images: [
        {
          url: urlFor(post.image).url(), // Assuming imageSchema contains a 'url'
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [urlFor(post.image).url()],
    },
    alternates: {
      canonical: `/post/${post.href}`,
    },
  }
}

export default async function BlogPost(props0: { params: Promise<{ slug: string; }> }) {
  const params = await props0.params;

  const {
    slug
  } = params;

  const post = await getBlog(slug);
  return (
    <>
      <article className="container mx-auto px-8 py-8">
        <a href="https://kabirchawla.com/?from=blog" className="mb-10">
          <Button style={{
            height: "max-content"
          }} variant={"secondary"} className="group/button bg-slate-400 justify-start !px-2 sm:!px-4 mb-3 flex flex-wrap w-min sm:w-max sm:flex-nowrap !h-[unset] border-[2px] border-slate-200 border-opacity-0 font-semibold text-md bg-opacity-15 hover:border-opacity-95 hover:bg-slate-400 hover:bg-opacity-25">
            <ArrowLeft className="group-hover/button:mr-2 transition-all" />
            Go Back to<span className="text-[#ffd9ae] group-hover/button:text-[#ffffff]  hover:[text-shadow:0px_0px_4px_#ffffff] [text-shadow:0px_0px_4px_#ffd9aeaa] ml-1 underline">KabirChawla.com</span>
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
        <div className="rounded-xl [filter:url(#glow)] relative overflow-hidden sm:aspect-[16_/_7] mt-4 mb-0 sm:mb-8">
          {post?.bannerImage && "asset" in post.bannerImage && <Image
            src={urlFor(post.bannerImage.asset).url()}
            alt="AI and Web Development"
            width={800}
            height={400}
            className="rounded-tr-xl absolute top-0 left-0 rounded-tl-xl object-cover w-full aspect-[16/9] sm:aspect-[16_/_7] object-center [filter:url(#glow)]"
          />}
          <div className="absolute w-full h-full top-1 left-0 md:from-[#000000_0%] from-[#000000_20%] scale-x-125 bg-gradient-to-t"></div>
          <div className="flex flex-col relative sm:pt-0 pt-5 gap-2 w-full h-full top-0 left-0 justify-end px-4 pb-4">
            <CountViews documentId={post._id} />
            <div className="space-y-2 mt-2">
              <div className="flex items-center space-x-2">
                {
                  post.categories.map(category => (
                    <Badge className="rounded-md gradient-box cursor-default bg-zinc-800 hover:bg-zinc-800 border-[1px] border-zinc-400 text-zinc-200" key={category.slug.current}>{category.title}</Badge>
                  ))
                }
              </div>
              <h1 className="text-3xl sm:text-5xl !mt-2 font-bold">{post.title}</h1>
              <div className="sm:flex hidden sm:items-center sm:space-x-4 items-start flex-col sm:flex-row text-sm text-muted-foreground">
                <div className="flex items-center ">
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
        <div className="flex sm:hidden sm:items-center mb-8 sm:space-x-4 items-start flex-col sm:flex-row text-sm text-muted-foreground">
          <div className="flex items-center ">
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
        <div className="prose prose-lg max-w-none text-lg">
          <PortableText
            value={post.body}
            components={{
              types: {
                image: ({ value }: { value: z.infer<typeof imageSchema> }) => (
                  <div className="flex justify-center items-center w-full my-8 relative max-w-full sm:max-w-[unset] sm:min-w-max">
                    <SanityImage src={value} width={"lg:w-[500px] w-[300px]"} alt={"some-img"} className="object-cover !relative" />
                  </div>
                ),
                code: ({ value }: {
                  value: {
                    code: string;
                    language: string;
                  }
                }) => {
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
        <div className="my-8 flex items-stretch gap-4 lg:gap-0 justify-center lg:justify-start flex-wrap max-h-max lg:flex-nowrap space-x-6 h-max lg:max-h-48 overflow-y-hidden">
          <Avatar className="flex-none h-36 sm:h-48 w-auto aspect-square">
            <AvatarImage src={urlFor(post.author.image).url()} alt={post.author.image.alt || post.author.name} className="h-full w-full object-cover flex justify-center items-center" />
            <AvatarFallback className="flex h-full w-full text-4xl items-center justify-center">{post.author.name.split(" ").map(word => word[0]).join("")}</AvatarFallback>
          </Avatar>
          <div className="flex-grow flex flex-col justify-center !mx-0 lg:!mx-6">
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