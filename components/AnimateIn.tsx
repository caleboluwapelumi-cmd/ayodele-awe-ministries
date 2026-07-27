"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type Direction = "up" | "left" | "right" | "fade";

const VARIANTS = {
  up: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
} as const;

export default function AnimateIn({
  children,
  delay = 0,
  direction = "up",
  className,
}: {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  /** Passed through so the wrapper can inherit grid/flex sizing from its parent. */
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      variants={VARIANTS[direction]}
    >
      {children}
    </motion.div>
  );
}
