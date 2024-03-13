const { PrismaClient, Units } = require("./generated/client");

const prisma = new PrismaClient();

async function seedRecipes() {
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email: "pierre.lespingal@gmail.com",
      },
    });

    await prisma.recipe.deleteMany();
    await prisma.food.deleteMany();

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
        plateCount: 8,
        createdBy: {
          connect: {
            id: user.id,
          },
        },
        ingredients: {
          create: [
            {
              foodName: "biscuits",
              quantity: 200,
              index: 1,
            },
            {
              foodName: "beurre",
              quantity: 80,
              index: 2,
            },
            {
              foodName: "œufs",
              quantity: 3,
              index: 3,
            },
            {
              foodName: "sucre",
              quantity: 100,
              index: 4,
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
        plateCount: 8,
        createdBy: {
          connect: {
            id: user.id,
          },
        },
        ingredients: {
          create: [
            {
              foodName: "pâte feuilletée",
              quantity: 2,
              index: 1,
            },
            {
              foodName: "crème d'amande",
              quantity: 200,
              index: 2,
            },
            {
              foodName: "œufs",
              quantity: 1,
              index: 3,
            },
            {
              foodName: "sucre",
              quantity: 50,
              index: 4,
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
        plateCount: 8,
        createdBy: {
          connect: {
            id: user.id,
          },
        },
        ingredients: {
          create: [
            {
              foodName: "chocolat noir",
              quantity: 200,
              index: 1,
            },
            {
              foodName: "beurre",
              quantity: 250,
              index: 2,
            },
            {
              foodName: "sucre",
              quantity: 250,
              index: 3,
            },
            {
              foodName: "farine",
              quantity: 200,
              index: 4,
            },
            {
              foodName: "œufs",
              quantity: 4,
              index: 5,
            },
            {
              foodName: "sel",
              quantity: 1,
              index: 6,
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
                "Prendre la tablette de chocolat noir encore emballée et la lancer au sol ou sur une table pour la casser en morceaux.",
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
                "Enfourner pendant 20 à 30 minutes, suivant la consistance souhaitée.",
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
