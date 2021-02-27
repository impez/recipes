const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "variables.env" });

const Recipe = require("./models/Recipe");
const User = require("./models/User");

const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use("/graphiql", graphiqlExpress({ endpoint: "graphql" }));

app.use(
  "/graphql",
  graphqlExpress({
    schema,
    context: {
      Recipe,
      User,
    },
  })
);

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log("Server listening");
});
