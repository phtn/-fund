import { TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";

export const RowMotion = motion(TableRow);
export const rowStyles = {
  initial: { x: -20 },
  animate: { x: 0 },
  transition: {
    type: "inertia",
    duration: 0.2,
    ease: "linear",
    stiffness: 10,
    damping: 10,
  },
};
