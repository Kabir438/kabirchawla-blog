"use client"

import { cn } from "@/lib/utils";
import type getBlogs from "@/utils/getBlogs";
import type getCategories from "@/utils/getCategories";
import Fuse from "fuse.js"
import { Search } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Filters from "./filters";
import Sort from "./sort";
import FullCard from "./ui/animated-card";
import { Input } from "./ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";

const applySearch = (content: Awaited<ReturnType<typeof getBlogs>>, searchQuery: string) => {
    if (!searchQuery.trim()) {
        return content;
    }
    const fuse = new Fuse(content, {
        keys: ["title", "description"],
    });
    return fuse.search(searchQuery).map(result => result.item) satisfies Awaited<ReturnType<typeof getBlogs>>;
}

const applyFilters = (content: Awaited<ReturnType<typeof getBlogs>>, categories: string[]) => {
    return content.filter(content => content.categories.findIndex(category => categories.map(c => c.trim().toLowerCase()).includes(category.slug.current.trim().toLowerCase())) !== -1) satisfies Awaited<ReturnType<typeof getBlogs>>;
}

const applySort = (content: Awaited<ReturnType<typeof getBlogs>>, sortingTechnique: "relevant" | "latest" | "popular" | "ascending" | "descending" | "rating") => {
    switch (sortingTechnique) {
        case "latest":
            return content.sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
        case "popular":
            return content.sort((a, b) => ((b.baseViews)
                //  + b.actualViews
            ) - (
                    (a.baseViews)
                    // + a.actualViews
                ));
        case "ascending":
            return content.sort((a, b) => a.title > b.title ? 1 : -1);
        case "descending":
            return content.sort((a, b) => a.title > b.title ? -1 : 1);
        case "rating":
            return content.sort((a, b) => b.rating - a.rating);
        default:
            return content;
    }
}

const applyPagniation = (content: Awaited<ReturnType<typeof getBlogs>>, page: number) => {
    return content.filter((_, index) => {
        return index >= (page) * 6 && index < (page + 1) * 6;
    })
}

const doNothing = <T,>(props: T) => props;

const processPosts = ({
    content,
    searchQuery,
    sortingTechnique,
    categories,
    pageIndex
}: {
    content: Awaited<ReturnType<typeof getBlogs>>;
    searchQuery: string;
    sortingTechnique: "relevant" | "latest" | "popular" | "ascending" | "descending" | "rating";
    categories: string[];
    pageIndex?: number;
}) => {
    if (searchQuery.trim()) {
        return (typeof pageIndex === "undefined" ? doNothing : applyPagniation)(applySearch(applyFilters(content, categories), searchQuery), pageIndex as number);
    }
    return (typeof pageIndex === "undefined" ? doNothing : applyPagniation)(applySort(applyFilters(content, categories), sortingTechnique), pageIndex as number);
}

// const ALL_OPTIONS = [
//     { label: "Tips and Tricks", value: "tips-and-tricks" },
//     { label: "Web Dev", value: "webdev" },
//     { label: "AI ML", value: "aiml" },
//     { label: "App Dev", value: "appdev" },
//     { label: "Backend Development", value: "backenddevelopment" },
//     { label: "General", value: "general" },
// ]

const SORTING_TECHNIQUES = ["latest", "relevant", "popular", "ascending", "descending", "rating"] as const

const simplifyCategories = (categories: Awaited<ReturnType<typeof getCategories>>) => categories.map(c => ({
    label: c.title,
    value: c.slug.current,
}))

export default function BrowseBlog({
    posts,
    categories
}: {
    posts: Awaited<ReturnType<typeof getBlogs>>;
    categories: Awaited<ReturnType<typeof getCategories>>;
}) {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [chosenCategories, setChosenCategories] = useState(simplifyCategories(categories));
    const [sortingTechnique, setSortingTechnique] = useState<typeof SORTING_TECHNIQUES[number]>(SORTING_TECHNIQUES[0]);
    const [pageIndex, setPageIndex] = useState(0);
    const numPages = useMemo(() => Math.ceil(processPosts({ content: posts, categories: chosenCategories.map(c => c.value), searchQuery: searchQuery, sortingTechnique: sortingTechnique }).length / 6), [chosenCategories, posts, searchQuery, sortingTechnique]);
    const previousSearch = useRef<string>("");
    useEffect(() => {
        if (searchQuery.trim() && previousSearch.current.trim() !== searchQuery.trim()) {
            previousSearch.current = searchQuery
            setSortingTechnique("relevant")
        } else if (sortingTechnique !== "relevant") {
            setSearchQuery("")
        }
    }, [searchQuery, sortingTechnique])
    return (<>
        <div className="flex justify-between flex-col sm:flex-row items-end gap-1 sm:gap-0 sm:items-start w-full">
            <div className="relative">
                <Input
                    value={searchQuery}
                    onChange={(ev) => setSearchQuery(ev.target.value)}
                    id="search"
                    placeholder="Search..."
                    type="text"
                    className="placeholder:text-gray-300"
                />
                <Search className="absolute w-4 h-4 right-1 top-1/2 text-gray-300 -translate-y-1/2 -translate-x-1/2" />
            </div>
            <div className="flex flex-col items-end md:flex-row gap-1 sm:gap-2">
                <Filters
                    categories={chosenCategories}
                    setCategories={setChosenCategories}
                    options={simplifyCategories(categories)}
                />
                <Sort sortingTechnique={sortingTechnique} setSortingTechnique={setSortingTechnique} />
            </div>
        </div>
        <div className="w-fit mx-auto mt-10 sm:mt-14 flex flex-wrap justify-center items-start" style={{
            alignItems: 'stretch',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '30px',
            rowGap: '30px',
            marginTop: '20px',
            width: '100%'
        }}>
            {
                processPosts({ content: posts, categories: chosenCategories.map(c => c.value), searchQuery: searchQuery, sortingTechnique: sortingTechnique, pageIndex }).map((item, index, arr) => (
                    <FullCard
                        className={cn(arr.length - 1 === index && "self-start", "w-full")}
                        // biome-ignore lint/suspicious/noArrayIndexKey: No other option for testing
                        key={item.href.current + index}
                        {...item}
                    />
                ))
            }
        </div>
        <Pagination className="mt-10">
            <PaginationContent>
                <PaginationItem onClick={() => pageIndex && setPageIndex(prev => prev - 1)} className={cn(pageIndex || "cursor-not-allowed opacity-60")}>
                    <PaginationPrevious className={cn(pageIndex || "cursor-not-allowed", pageIndex && "cursor-pointer")} />
                </PaginationItem>
                {
                    Array(numPages).fill(null).map((_, i) => (
                        // biome-ignore lint/suspicious/noArrayIndexKey: No Other Option
                        (<PaginationItem key={_ + i} onClick={() => setPageIndex(i)}>
                            <PaginationLink className={cn("cursor-pointer", pageIndex === i && "bg-zinc-500 bg-opacity-20 border-[1px] border-zinc-400")}>{i + 1}</PaginationLink>
                        </PaginationItem>)
                    ))
                }
                <PaginationItem onClick={() => (numPages - 1 === pageIndex) || setPageIndex(prev => prev + 1)} className={cn((numPages - 1 === pageIndex) && "cursor-not-allowed opacity-60")}>
                    <PaginationNext className={cn((numPages - 1 === pageIndex) && "cursor-not-allowed", (numPages - 1 === pageIndex) || "cursor-pointer")} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    </>);
}