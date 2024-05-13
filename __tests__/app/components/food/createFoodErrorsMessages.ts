export const createFoodErrorsMessages = {
  name: {
    length: "Le nom doit comporter de 3 et 33 caractères.",
    pattern:
      "Le nom ne doit comporter que des lettres, des espaces, et des apostrophes.",
    unique: "Cet aliment existe déjà.",
  },
  density: "La densité doit être un nombre décimal entre 0.00 et 23.00.",
  massPerPiece:
    "La masse par unité doit être un nombre décimal entre 0.00 et 1000.00.",
} as const;
