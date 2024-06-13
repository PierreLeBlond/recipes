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
        className="relative h-full w-full flex-col items-center justify-end overflow-hidden rounded-none hover:cursor-pointer xs:rounded-lg"
        onClick={() => setOpen(true)}
        variant="edit"
      >
        <CardContent className="absolute inset-0 h-full w-full">
          <div className="absolute inset-0 h-full w-full from-primary/10 to-primary/30 sm:bg-gradient-to-t" />
        </CardContent>
        <div className="relative hidden h-full flex-col justify-between sm:flex">
          <CardHeader>
            <Typography className="text-primary">
              <PlusCircle size={48} />
            </Typography>
          </CardHeader>
          <CardFooter>
            <Typography variant="h2" className="text-primary">
              AJOUTER UNE RECETTE
            </Typography>
          </CardFooter>
        </div>
        <div className="relative flex h-full items-center gap-4 p-2 sm:hidden">
          <Typography className="text-primary">
            <PlusCircle size={32} />
          </Typography>
          <Typography variant="h3" className="text-xl text-primary">
            AJOUTER UNE RECETTE
          </Typography>
        </div>
      </Card>
      <CreateRecipeDialog props={{ open, setOpen }} />
    </>
  );
}
