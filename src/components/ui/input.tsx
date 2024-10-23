// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input
"use client";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import * as React from "react";
import { cn } from "../../lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, onChange, type, ...props }, ref) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const radius = useMotionValue(0);
    const [focused, setFocused] = React.useState(false);
    const [visible, setVisible] = React.useState(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
      const { left, top } = currentTarget.getBoundingClientRect();

      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    const bg = useMotionTemplate`
      radial-gradient(
        ${radius}px circle at ${mouseX}px ${mouseY}px,
        #ffd9ae,
        transparent 80%
      )
    `;


    return (
      <motion.div
        style={{
          background: bg,
        }}
        transition={{
          duration: 2000
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => {
          if (focused) {
            radius.set(100)
          } else {
            radius.set(100)
          }
          setVisible(true);
        }}
        onMouseLeave={() => {
          if (focused) {
            radius.set(1000)
          } else {
            radius.set(0)
          }
          setVisible(false);
        }}
        onFocus={() => {
          if (visible) {
            radius.set(100)
          } else {
            radius.set(1000)
          }
          setFocused(true);
        }}
        onBlur={() => {
          if (visible) {
            radius.set(100)
          } else {
            radius.set(0)
          }
          setFocused(false);
        }}
        className="p-[2px] rounded-lg transition duration-300 group/input"
      >
        <input
          type={type}
          className={cn(
            `flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent 
          file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
          focus-visible:outline-none focus-visible:ring-[2px]
           disabled:cursor-not-allowed disabled:opacity-50
           dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
            transition duration-400
           `,
            className
          )}
          onChange={onChange}
          ref={ref}
          {...props}
        />
      </motion.div>
    );
  }
);
Input.displayName = "Input";

export { Input };
