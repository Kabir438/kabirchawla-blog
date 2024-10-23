"use client";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import type getBlogs from "@/utils/getBlogs";
import { type MotionValue, motion, useMotionTemplate, useMotionValue, useTransform } from "framer-motion";
import { Clock, Eye, StarHalfIcon, StarIcon } from "lucide-react";
import Image from "next/image"
import Link from "next/link";
import type React from "react";
import { useState } from "react";
import { Badge } from "./badge";

export default function FullCard(props: Awaited<ReturnType<typeof getBlogs>>[number] & { className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [width, setWidth] = useState<undefined | number>(undefined);
  const x = useTransform(mouseX, [0, width || 100], [-7.5, 7.5])
  const y = useTransform(mouseY, [0, width || 100], [-7.5, 7.5])
  const transform = useMotionTemplate`translate(${x}px, ${y}px)`;
  // return <></>
  return (
    <Link href={`/post/${props.href.current}`} prefetch className={props.className}>
      <Card
        mouseX={mouseX}
        mouseY={mouseY}
        updateWidth={(newWidth: number) => setWidth(newWidth)}
        className="min-w-64"
      >
        <CardSkeletonContainer
          mouseX={mouseX}
          mouseY={mouseY}
          cardWidth={width}
        >
          <CardContent >
            {"asset" in props.image && <Image
              // src="https://images.unsplash.com/photo-1544077960-604201fe74bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80"
              // alt="Random Image"
              src={urlFor(props.image.asset).url()}
              alt={props.image.alt || "No alternative for this image"}
              fill
              className="object-cover"
            // layout=""
            />}
          </CardContent>
        </CardSkeletonContainer>
        <motion.div
          style={{
            transform
          }}
          className={"group-[.unhovered]/card:!transform-none transform-gpu"}
        >
          <div className="flex flex-nowrap items-end mt-2 text-sm text-gray-400 justify-between relative -bottom-1">
            <div className="flex flex-col items-start justify-start group-[.hovered]/card:[-4px_-4px_7px_#575757,_4px_4px_7px_#575757] group-[.hovered]/card:scale-110 group-[.hovered]/card:translate-x-[5%] transition-all ease-in-out">
              <span className={cn("flex items-center justify-center gap-1",
                (Math.floor(props.rating) - props.rating < 0) && "ml-0"
              )}>
                {
                  [
                    Array(Math.floor(props.rating)).fill(null).map((item, index) => <StarIcon className="w-4 h-4 text-yellow-400" key={`star2342-${item + index}`} />)
                  ]
                }
                {
                  [
                    (Math.floor(props.rating) - props.rating < 0) && <StarHalfIcon className="w-4 h-4 text-yellow-400" />
                  ]
                }
              </span>
              <span className="group-[.hovered]/card:[-4px_-4px_7px_#575757,_4px_4px_7px_#575757] group-[.hovered]/card:scale-110 group-[.hovered]/card:translate-x-[5%] transition-all ease-in-out flex items-center justify-start gap-1"><Clock className="w-3 h-3" />{props.timeTakenToRead} read</span>
            </div>
            <span className="mr-[1px] flex items-center justify-start gap-1"><Eye className="w-3 h-3" />{(props.actualViews + props.baseViews)} View{(props.actualViews + props.baseViews) === 1 ? "" : "s"}</span>
          </div>
          <CardTitle>{props.title}</CardTitle>
          <CardDescription>
            {props.description}
          </CardDescription>

          <div className="flex flex-wrap gap-2 mt-3 group-[.hovered]/card:[-4px_-4px_7px_#575757,_4px_4px_7px_#575757] group-[.hovered]/card:scale-110 group-[.hovered]/card:translate-x-[5%] transition-all ease-in-out pr-[5%]">
            {
              props.categories.map(category => (
                <Badge className="gradient-box rounded-sm cursor-default bg-zinc-800 hover:bg-zinc-800 border-[1px] border-zinc-400 text-zinc-200" key={`cat1-${category.slug.current}`}>{category.title}</Badge>
              ))
            }
          </div>
        </motion.div>
      </Card>
    </Link>
  );
}

const CardContent = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div
      style={{
        aspectRatio: "1 / 1",
        maxWidth: "100%"
      }} className="p-8 overflow-hidden h-full relative flex items-center justify-center group-[.hovered]/card:[-4px_-4px_7px_#575757,_4px_4px_7px_#575757] group-[.hovered]/card:scale-110 group-[.hovered]/card:translate-x-[5%] transition-all ease-in-out">
      {children}
    </div>
  );
};

export const Card = ({
  className,
  children,
  mouseX,
  mouseY,
  updateWidth
}: {
  className?: string;
  children: React.ReactNode;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  updateWidth: (b: number) => void;
}) => {
  const [hovered, setHovered] = useState(false);

  function handleMouseMove({ currentTarget, clientX, clientY }: {
    currentTarget: HTMLElement,
    clientX: number,
    clientY: number,
  }) {
    const { left, top } = currentTarget.getBoundingClientRect();

    // console.log(clientX - left)

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  return (
    <div
      className={cn(
        "group/card max-w-xs w-full mx-auto p-4 rounded-xl border border-[rgba(255,255,255,0.10)] dark:bg-[rgba(40,40,40,0.70)] dark:hover:bg-[rgba(29,29,29,0.7)] hover:scale-105 bg-gray-100 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] ease-in-out transition-all hover:shadow-[2px_4px_28px_0px_rgba(248,248,248,0.06)_inset] group",
        className,
        hovered && "hovered",
        hovered || "unhovered"
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      ref={(el) => { if (el?.getBoundingClientRect().width) { updateWidth(el?.getBoundingClientRect().width) } }}
    >
      {children}
    </div>
  );
};

export const CardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3
      className={cn(
        "text-lg font-semibold text-gray-800 group-[.unhovered]/card:!transform-none dark:text-white pb-2 pt-0 group-[.hovered]/card:[-4px_-4px_7px_#575757,_4px_4px_7px_#575757] group-[.hovered]/card:scale-110 group-[.hovered]/card:translate-x-[5%] transition-all ease-in-out",
        className
      )}
    >
      {children}
    </h3>
  );
};

export const CardDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        "text-sm font-normal group-[.unhovered]/card:!transform-none text-neutral-600 dark:text-neutral-400 max-w-sm group-[.hovered]/card:[-4px_-4px_7px_#575757,_4px_4px_7px_#575757] group-[.hovered]/card:scale-110 group-[.hovered]/card:translate-x-[5%] transition-all ease-in-out pr-[5%]",
        className
      )}
    >
      {children}
    </p>
  );
};

export const CardSkeletonContainer = ({
  className,
  children,
  mouseX,
  mouseY,
  cardWidth
}: {
  className?: string;
  children: React.ReactNode;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  cardWidth: number | undefined;
}) => {
  const x = useTransform(mouseX, [0, cardWidth || 100], [-10, 10])
  const y = useTransform(mouseY, [0, cardWidth || 100], [-10, 10])
  const transform = useMotionTemplate`translate(${x}px, ${y}px)`;
  return (
    <motion.div
      className={cn(
        "h-[unset] md:h-[20rem] rounded-xl z-40 group-[.unhovered]/card:!transform-none overflow-hidden",
        className,
      )}
      style={{
        transform,
        aspectRatio: "1 / 1",
        maxWidth: "100%",
        height: "unset"
      }}
    >
      {children}
    </motion.div>
  );
};
