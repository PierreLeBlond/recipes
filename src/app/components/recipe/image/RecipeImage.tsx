import { PlusCircle } from "lucide-react";
import { useRef, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { FormInputs } from "@/src/lib/types/FormInputs";
import { cn } from "@/src/lib/utils";
import { convertToBase64 } from "@/src/lib/s3/convertToBase64";
import { useEditQuery } from "@/src/lib/hooks/useEditQuery";
import { useSession } from "next-auth/react";
import { Typography } from "../../ui/typography";
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card";

export function RecipeImage() {
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string>();

  const { setValue } = useFormContext<FormInputs>();
  const recipeImage = useWatch<FormInputs, "image">({ name: "image" });
  const session = useSession();
  const edit = useEditQuery(session.data);

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
    <Card
      className={cn(
        "xs:rounded-lg relative h-full w-full flex-col items-center justify-end overflow-hidden rounded-none",
        {
          "hover:cursor-pointer": edit,
        },
      )}
      onClick={edit ? handleOnClick : undefined}
      variant={edit ? "edit" : "default"}
    >
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={hiddenInputRef}
        onChange={handleFileChange}
      />
      <CardContent
        className="group xs:rounded-lg absolute h-full w-full bg-transparent! bg-cover bg-center p-0 shadow-md"
        style={image ? { backgroundImage: `url('${image}')` } : {}}
      />
      {edit && (
        <div className="relative flex h-full flex-col justify-between">
          <CardHeader>
            <Typography className="text-primary">
              <PlusCircle size={48} className="rounded-full backdrop-blur-md" />
            </Typography>
          </CardHeader>
          <CardFooter
            className={cn(
              "border-secondary-foreground/40 pt-6 backdrop-blur-md",
              {
                "border-t": image,
              },
            )}
          >
            <Typography variant="h2" className="text-primary">
              {image ? "Modifier cette image" : "Ajouter une image"}
            </Typography>
          </CardFooter>
        </div>
      )}
    </Card>
  );
}
