import { Button } from "@/src/lib/material";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { FormInputs } from "./FormInputs";
import Image from "next/image";
import { cn } from "@/src/lib/utils";
import { convertToBase64 } from "@/src/lib/s3/convertToBase64";
import { Recipe } from "@/prisma/generated/client";

type ImageEditProps = {
  setValue: UseFormSetValue<FormInputs>;
  recipe: Recipe | null;
};

export const ImageEdit = ({
  props: { setValue, recipe },
}: {
  props: ImageEditProps;
}) => {
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string>();

  const handleOnClick = () => {
    hiddenInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.item(0);
    if (!file) {
      return;
    }
    convertToBase64(file).then((base64) => {
      setPreview(base64);
      setValue("image", base64, { shouldDirty: true });
    });
  };

  const image = preview || recipe?.image;

  return (
    <div className="relative h-full w-full">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={hiddenInputRef}
        onChange={handleFileChange}
      ></input>
      <Button
        type="button"
        onClick={handleOnClick}
        className={cn(
          "flex h-full w-full flex-col items-center justify-center gap-y-4 text-gray-700 transition-all",
          {
            "opacity-0 hover:opacity-80": image,
          },
        )}
        color="white"
      >
        <Plus strokeWidth={4}></Plus>
        <p>{image ? "Changer l'image" : "Ajouter une image"}</p>
      </Button>
      {image && (
        <Image
          src={image}
          alt="preview image"
          fill={true}
          className="absolute -z-10 h-full w-full rounded-md object-cover transition-all duration-75"
        ></Image>
      )}
    </div>
  );
};
