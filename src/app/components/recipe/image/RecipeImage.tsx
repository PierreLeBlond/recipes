import { Button } from "@/src/lib/material";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { FormInputs } from "@/src/lib/types/FormInputs";
import { cn } from "@/src/lib/utils";
import { convertToBase64 } from "@/src/lib/s3/convertToBase64";
import { useQueryState } from "@/src/lib/hooks/useQueryState";

export function RecipeImage() {
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string>();

  const { setValue } = useFormContext<FormInputs>();
  const recipeImage = useWatch({ name: "image" });
  const { edit } = useQueryState();

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

  const image = preview || recipeImage;

  return (
    <div className="relative h-full w-full">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={hiddenInputRef}
        onChange={handleFileChange}
       />
      <Button
        type="button"
        color="white"
        variant="filled"
        disabled={!edit}
        onClick={handleOnClick}
        className="group relative h-full w-full !bg-transparent bg-cover bg-center p-0 text-blue-gray-500 disabled:shadow-md"
        style={{ backgroundImage: `url('${image}')` }}
      >
        <div
          className={cn(
            "flex h-full w-full flex-col items-center justify-center gap-y-4 transition-all duration-300",
            {
              "text-blue-gray-50 opacity-0 group-hover:opacity-100 group-hover:backdrop-blur-md":
                image,
            },
          )}
        >
          {edit && (
            <>
              <Plus strokeWidth={4} />
              <p>{image ? "Changer l'image" : "Ajouter une image"}</p>
            </>
          )}
        </div>
      </Button>
    </div>
  );
}
