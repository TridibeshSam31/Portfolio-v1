"use client";

import { motion, type HTMLMotionProps } from "motion/react";

type Props = Omit<HTMLMotionProps<"div">, "ref"> & { delay?: number; y?: number; as?: "div" | "li" };

/** Fade-and-lift on first entering the viewport. Uses initial={false} to ensure content is never blank. */
export function Reveal({ delay = 0, y = 16, as = "div", children, className = "", ...rest }: Props) {
  if (as === "li") {
    return (
      <motion.li
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const }}
        className={className}
        {...(rest as unknown as Omit<HTMLMotionProps<"li">, "ref">)}
      >
        {children}
      </motion.li>
    );
  }
  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
