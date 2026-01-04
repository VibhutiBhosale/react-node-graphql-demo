const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const GraphQLJSON = require("graphql-type-json");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  resolvers: {
    JSON: GraphQLJSON,
    ...resolvers,
  },
});

server.listen({ port: 8000 }).then(({ url }) => {
  console.log(`GraphQL running at ${url}`);
});
