import { ClockIcon } from "@heroicons/react/24/outline";
import {
  CheckCheckIcon,
  CircleSlash2Icon,
  FileTextIcon,
  ImportIcon,
} from "lucide-react";
import { type Option } from "@/components/ui/types";

export const statuses: Option[] = [
  {
    value: "draft",
    label: "draft",
    icon: FileTextIcon,
    color: "text-amber-100",
    cell: "bg-amber-100/50",
  },
  {
    value: "submitted",
    label: "submitted",
    icon: ClockIcon,
    color: "text-sky-300",
    cell: "bg-sky-100 text-sky-600",
  },
  {
    value: "received",
    label: "received",
    icon: ImportIcon,
    color: "text-indigo-300",
    cell: "bg-indigo-100/50 text-indigo-700/50",
  },
  {
    value: "voided",
    label: "voided",
    icon: CircleSlash2Icon,
    color: "text-rose-200",
    cell: "bg-rose-100/30 text-rose-500",
  },
  {
    value: "completed",
    label: "completed",
    icon: CheckCheckIcon,
    color: "text-teal-500",
    cell: "bg-teal-100/50 text-teal-700",
  },
];

export const events = [
  {
    value: "payment.confirmation",
    label: "payment.confirmation",
  },
];
