import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { CreateRecipeDialog } from "./CreateRecipeDialog";
import { Typography } from "../../ui/typography";
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card";

export function CreateRecipeCard() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Card
        className="relative h-full w-full flex-col items-center justify-end overflow-hidden hover:cursor-pointer"
        onClick={() => setOpen(true)}
        variant="edit"
      >
        <CardContent className="absolute inset-0 h-full w-full">
          <div className="absolute inset-0 h-full w-full from-black/80 via-black/50 to-black/10 sm:bg-gradient-to-t" />
        </CardContent>
        <div className="relative hidden h-full flex-col justify-between sm:flex">
          <CardHeader>
            <Typography className="text-white">
              <PlusCircle size={48} />
            </Typography>
          </CardHeader>
          <CardFooter>
            <Typography variant="h2" className="text-white">
              Ajouter une recette
            </Typography>
          </CardFooter>
        </div>
        <div className="relative flex h-full items-center gap-4 p-2 sm:hidden">
          <Typography className="text-white">
            <PlusCircle size={32} />
          </Typography>
          <Typography variant="h3" className="text-white">
            Ajouter une recette
          </Typography>
        </div>
      </Card>
      <CreateRecipeDialog props={{ open, setOpen }} />
    </>
  );
}
