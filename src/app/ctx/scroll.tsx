"use client";
import { type MotionValue, useScroll, useTransform } from "framer-motion";
import type { PropsWithChildren, RefObject } from "react";
import { createContext, useContext, useEffect, useRef, useState } from "react";

interface ScrollContextValues {
  y: MotionValue<number>;
  targetRef: RefObject<HTMLDivElement>;
  containerRef: RefObject<HTMLDivElement>;
  scrollPosition: number;
}

const ScrollCtx = createContext<ScrollContextValues | null>(null);

export const ScrollProvider = ({ children }: PropsWithChildren) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0); // Track scroll position in pixels

  const { scrollYProgress } = useScroll({
    container: containerRef,
    target: targetRef,
    layoutEffect: false,
  });

  const y = useTransform(scrollYProgress, [0, 1], [0.4, 1]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setScrollPosition(container.scrollTop);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ScrollCtx.Provider value={{ y, targetRef, containerRef, scrollPosition }}>
      <div
        ref={containerRef}
        style={{ height: "100vh", overflowY: "scroll" }}
        className="w-full bg-primary-100"
      >
        {children}
      </div>
    </ScrollCtx.Provider>
  );
};

export const useScrollCtx = () => {
  const context = useContext(ScrollCtx);
  if (!context) throw new Error();
  return context;
};
