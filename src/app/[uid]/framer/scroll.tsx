"use client";
import { useScrollCtx } from "@/app/ctx/scroll";
import { motion } from "framer-motion";
export const Scroll = () => {
  const { y, targetRef, scrollPosition } = useScrollCtx();
  return (
    <div className="m-4 hidden h-[100vh] w-full overflow-y-scroll border border-foreground px-10 pt-64 lg:block">
      <motion.div
        ref={targetRef}
        style={{ scaleX: y, scaleY: y }}
        className="h-24 w-24 rounded-lg bg-primary-700 p-6"
      >
        {scrollPosition}
      </motion.div>
    </div>
  );
};
