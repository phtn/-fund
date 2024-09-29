import type { HTMLProps } from "react";
import type { LucideIcon } from "lucide-react";
import type { HeartIcon } from "@heroicons/react/24/outline";

export type ClassName = HTMLProps<HTMLElement>["className"];
export type DualIcon = LucideIcon | typeof HeartIcon;
