"use client";

import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import { imageSchema } from "@/utils/contentType";
import { useQuery } from "@tanstack/react-query";
import NextImage from "next/image";
import { ComponentProps, RefObject, useRef } from "react";
import { z } from "zod";

interface SanityImageProps
    extends Omit<ComponentProps<typeof NextImage>, "src" | "fill" | "width"> {
    src: z.infer<typeof imageSchema>;
    width: number | `${number}px` | string;
}

const wait = (time: number) => new Promise((resolve) => setTimeout(resolve, time))

const getImage = async (image: SanityImageProps["src"]) => {
    if (typeof Image === "undefined") {
        await wait(250);
        return getImage(image);
    }
    const imageURL = urlFor(image).url();
    const result = await fetch(imageURL);
    const blob = await result.blob();
    const img = new Image();
    const objectUrl = URL.createObjectURL(blob);

    img.src = objectUrl;

    return new Promise<{ aspectRatio: number; url: string }>((resolve, reject) => {
        img.onload = () => {
            const width = img.width;
            const height = img.height;
            const aspectRatio = width / height;
            resolve({ aspectRatio, url: imageURL });
            URL.revokeObjectURL(objectUrl); // Clean up the object URL
        };
        img.onerror = (e) => reject(`Image failed to load: ${e}`);
        setTimeout(() => reject("Timeout Error"), 3000);
    });
};

const getWidthOfElement = async <T extends HTMLElement,>(ref: RefObject<T | null>) => {
    const element = ref.current;
    if (!element) {
        await wait(50);
        return getWidthOfElement(ref)
    }
    const width = element.getBoundingClientRect().width;
    return width
}

const useImageLoader = ({ src, ref }: { src: SanityImageProps["src"]; ref: RefObject<HTMLDivElement | null> }) => {
    const imageDetails = useQuery({
        queryFn: async () => {
            const [details, width] = await Promise.all([getImage(src), getWidthOfElement(ref)] as const)
            return {
                width,
                ...details
            }
        },
        queryKey: [`image-${urlFor(src).url()}`]
    }); // Suspense-based data fetching
    return imageDetails;
};


export default function SanityImageContent({
    src,
    width,
    ...props
}: SanityImageProps) {
    const ref = useRef<HTMLDivElement>(null)
    const { isPending, error, data } = useImageLoader({ src, ref });

    console.log(src)
    return (
        <div
            ref={ref}
            className={cn(
                typeof width === "number" && `w-[${width}px]`,
                typeof width === "string" && width.endsWith("px") && `w-[${width}]`,
                typeof width === "string" && !width.endsWith("px") && width,
                "rounded-xl overflow-hidden"
            )}
            style={{
                filter: src.glow ? "url(#glow)" : undefined
            }}
        >
            {isPending && <p>Loading Image...</p>}

            {(error || (!data && !isPending)) && <p>Image could not be loaded</p>}

            {
                data && !error && !isPending && <NextImage
                    {...props}
                    src={data.url}
                    alt={src.alt || props.alt}
                    height={(Number(data.width) / data.aspectRatio) || 0}
                    width={data.width || 0}
                />
            }
        </div>
    );
}
