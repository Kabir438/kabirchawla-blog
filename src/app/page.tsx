import BrowseBlog from "@/components/browse-blog";
import { Button } from "@/components/ui/button";
import { FlipWords } from "@/components/ui/flip-words";
import { ArrowLeft } from "lucide-react"
import { Poppins } from "next/font/google";
import getBlogs from "../utils/getBlogs";
import getCategories from "../utils/getCategories";

const poppins = Poppins({
  subsets: ["latin-ext"],
  weight: ["400", "600", "800"],
})

export default async function Home() {
  const blogs = await getBlogs();
  const categories = await getCategories();
  // console.log(blogs, categories)
  return (
    <main className="flex-col flex items-start gap-2 p-2 px-5 sm:p-6 sm:px-12">
      <a href="https://kabirchawla.com/?from=blog">
        <Button style={{
          height: "max-content"
        }} variant={"secondary"} className="group/button bg-slate-400 mt-3 sm:mt-0 justify-start !px-2 sm:!px-4 mb-3 flex flex-wrap w-min sm:w-max sm:flex-nowrap !h-[unset] border-[2px] border-slate-200 border-opacity-0 font-semibold text-md bg-opacity-15 hover:border-opacity-95 hover:bg-slate-400 hover:bg-opacity-25">
          <ArrowLeft className="group-hover/button:mr-2 transition-all" />
          Go Back to<span className="text-[#ffd9ae] group-hover/button:text-[#ffffff]  hover:[text-shadow:0px_0px_4px_#ffffff] [text-shadow:0px_0px_4px_#ffd9aeaa] ml-1 underline">KabirChawla.com</span>
        </Button>
      </a>
      <h1 className={`w-full flex justify-center items-center text-white text-5xl font-semibold ${poppins.className}`}>Kabir Chawla{"'"}s Blog</h1>
      <div className="flex flex-col">
        <h3 className="my-0 text-4xl">I<FlipWords duration={750} words={[
          "code",
          "program",
          "develop",
          "engineer"
        ]} /></h3>
        <h4 className="my-0 text-4xl">and write 🖋️ about it</h4>
      </div>

      <hr className="my-10 border-white w-full" style={{
        backgroundImage: 'linear-gradient(90deg, grey 9%, white, grey 91%)',
        height: '1.3px',
        border: '0px'
      }} />

      <div className="w-full flex items-center flex-col">
        <BrowseBlog posts={blogs} categories={categories} />
      </div>
    </main>
  );
}