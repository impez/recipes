exports.resolvers = {
  Query: {
    getAllRecipes: () => {},
  },

  Mutation: {
    addRecipe: async (root, args, ctx) => {
      const { Recipe } = ctx;
      const { name, category, description, instructions, username } = args;

      const newRecipe = await new Recipe({
        name,
        description,
        category,
        instructions,
        username,
      }).save();

      return newRecipe;
    },
  },
};
