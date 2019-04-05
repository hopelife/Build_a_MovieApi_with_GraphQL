import { GraphQLServer } from "graphql-yoga";
import resolvers from "../_Build_a_MovieApi_with_GraphQL/graphql/resolvers";

const server = new GraphQLServer({
    typeDefs: "graphql/schema.graphql",
    resolvers
})

server.start(() => console.log("Graphql Server Running"));