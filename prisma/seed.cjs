const { PrismaClient, Units } = require("./generated/client");

const prisma = new PrismaClient();

async function seedRecipes() {
  try {
    await prisma.recipe.deleteMany();
    await prisma.food.deleteMany();

    await prisma.$queryRaw`ALTER SEQUENCE "Food_id_seq" RESTART WITH 1`;
    console.log("reset food auto increment to 1");

    await prisma.$queryRaw`ALTER SEQUENCE "Recipe_id_seq" RESTART WITH 1`;
    console.log("reset recipe auto increment to 1");

    const foods = [
      {
        name: "biscuits",
        unit: Units.GRAM,
      },
      {
        name: "pâte feuilletée",
        unit: Units.PIECE,
      },
      {
        name: "crème d'amande",
        unit: Units.GRAM,
      },
      {
        name: "œufs",
        unit: Units.PIECE,
        massPerPiece: 50,
      },
      {
        name: "sucre",
        unit: Units.GRAM,
        density: 800,
      },
      {
        name: "beurre",
        unit: Units.GRAM,
      },
      {
        name: "chocolat noir",
        unit: Units.GRAM,
      },
      {
        name: "farine",
        unit: Units.GRAM,
        density: 600,
      },
      {
        name: "sel",
        unit: Units.TEASPOON,
      },
    ];

    for (const food of foods) {
      await prisma.food.create({
        data: food,
      });
    }

    const recipes = [
      {
        name: "cheesecake au citron",
        image: "/images/cheesecake.jpg",
        description: "Un cheesecake au citron, c'est bon.",
        plateCount: 8,
        ingredients: {
          create: [
            {
              foodName: "biscuits",
              quantity: 200,
            },
            {
              foodName: "beurre",
              quantity: 80,
            },
            {
              foodName: "œufs",
              quantity: 3,
            },
            {
              foodName: "sucre",
              quantity: 100,
            },
          ],
        },
        steps: {
          create: [
            {
              description: "Préchauffer le four à 180°C.",
              index: 0,
            },
            {
              description: "Mélanger les ingrédients secs dans un bol.",
              index: 1,
            },
          ],
        },
      },
      {
        name: "galette des rois",
        image: "/images/galette.jpg",
        description: "Qui aura la fève ?",
        plateCount: 8,
        ingredients: {
          create: [
            {
              foodName: "pâte feuilletée",
              quantity: 2,
            },
            {
              foodName: "crème d'amande",
              quantity: 200,
            },
            {
              foodName: "œufs",
              quantity: 1,
            },
            {
              foodName: "sucre",
              quantity: 50,
            },
          ],
        },
        steps: {
          create: [
            {
              description: "Préchauffer le four à 200°C.",
              index: 0,
            },
            {
              description: "Étaler la pâte feuilletée.",
              index: 1,
            },
          ],
        },
      },
      {
        name: "brownie au chocolat",
        image: "/images/brownie.jpg",
        description: "Le brownie, c'est la vie.",
        plateCount: 8,
        ingredients: {
          create: [
            {
              foodName: "chocolat noir",
              quantity: 200,
            },
            {
              foodName: "beurre",
              quantity: 250,
            },
            {
              foodName: "sucre",
              quantity: 250,
            },
            {
              foodName: "farine",
              quantity: 200,
            },
            {
              foodName: "œufs",
              quantity: 4,
            },
            {
              foodName: "sel",
              quantity: 1,
            },
          ],
        },
        steps: {
          create: [
            {
              description: "Préchauffer le four à 180°C.",
              index: 0,
            },
            {
              description:
                "Prendre la tablette de chocolat noir encore emballée et lancez la sur le sol pour la casser en morceaux.",
              index: 1,
            },
            {
              description:
                "Couper #2 en morceaux et faire fondre dans une casserole avec #1. Mettre le beurre en premier, il fond moins vite. Garder l'emballage du beurre pour beurrer le moule.",
              index: 2,
            },
            {
              description: "Dans un grand bol, mélanger #3, #4 et #6.",
              index: 3,
            },
            {
              description: "Ajouter #5 et mélanger.",
              index: 4,
            },
            {
              description:
                "Lorsque le mélange chocolat et beurre est totalement fondu, ajouter au bol et mélanger.",
              index: 5,
            },
            {
              description:
                "Beurrer un moule avec l'emballage du beurre, et y déposer la garniture.",
              index: 6,
            },
            {
              description:
                "Enfourner pendant 20 à 30 minutes, suivant la consistance souhaitée. Bien sûr tout dépend du four, surveiller la cuisson, et se louper les premières fois.",
              index: 7,
            },
          ],
        },
      },
    ];

    for (const recipe of recipes) {
      await prisma.recipe.create({
        data: recipe,
      });
    }

    console.log("Database seeding completed!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedRecipes();
