import { RecipeEdit } from "@/src/app/components/recipe/edit/RecipeEdit";
import { Button } from "@/src/lib/material";
import { ChevronLeft } from "lucide-react";

export default async function RecipeCreatePage() {
  return (
    <div className="flex w-full flex-col justify-center p-2 sm:p-8 lg:p-16">
      <div className="pb-2 sm:pb-4">
        <Button className="flex w-16 items-center justify-center" color="white">
          <a href="/">
            <ChevronLeft strokeWidth={4}></ChevronLeft>
          </a>
        </Button>
      </div>
      <RecipeEdit props={{ recipe: null }}></RecipeEdit>
    </div>
  );
}
