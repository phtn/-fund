("");
import { type ChangeEvent, type FormEvent, useRef, useState } from "react";
import { guid } from "@/utils/helpers";
import { useConvex } from "@/app/ctx/convex";
import { onError } from "@/app/ctx/toast";

export const useFile = () => {
  const { generateLogoUrl } = useConvex();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [imageData, setImageData] = useState<string>();
  const [filename] = useState(() => guid());

  const inputRef = useRef<HTMLInputElement>(null);

  const clearFile = () => {
    setSelectedFile(undefined);
    setImageData(undefined);
    inputRef.current!.value = "";
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;

    const fileSize = file && file.size / 1000000;
    if (fileSize > 10) {
      onError("File size is too large");
      return;
    }
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result?.toString();
      setImageData(result);
    };

    reader.readAsDataURL(file);
  };

  const createLogoUrl = async (e: FormEvent) => {
    e.preventDefault();
    return await generateLogoUrl();
  };

  return {
    filename,
    selectedFile,
    handleFileChange,
    createLogoUrl,
    imageData,
    clearFile,
    inputRef,
  };
};
