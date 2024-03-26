import { Card, CardBody, CardHeader, Typography } from "@/src/lib/material";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { CreateRecipeDialog } from "./CreateRecipeDialog";

export const CreateRecipeCard = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Card
        className="h-full w-full flex-col justify-end overflow-hidden transition-shadow hover:cursor-pointer hover:shadow-lg hover:shadow-blue-gray-500/20"
        color="blue-gray"
        onClick={() => setOpen(true)}
      >
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className={`absolute inset-0 m-0 h-full w-full rounded-none bg-gradient-to-tl from-blue-gray-300 to-blue-gray-100`}
        >
          <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50 to-black/10" />
        </CardHeader>
        <CardBody className="relative flex h-full flex-col justify-between">
          <Typography variant="h2" className="!text-blue-gray-50">
            <PlusCircle size={48}></PlusCircle>
          </Typography>
          <Typography
            variant="h3"
            color="white"
            className="text-start !text-blue-gray-50"
          >
            Ajouter une recette
          </Typography>
        </CardBody>
      </Card>
      <CreateRecipeDialog props={{ open, setOpen }}></CreateRecipeDialog>
    </>
  );
};
