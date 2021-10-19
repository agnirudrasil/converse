import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import cors from "cors";
import http from "http";
import { buildSchema } from "type-graphql";
import { PostResolver } from "./graphql/post";
import { GraphiqlApolloServerPlugin } from "./graphiql-plugin";

(async () => {
    const app = express();
    const httpServer = http.createServer(app);

    const server = new ApolloServer({
        schema: await buildSchema({ resolvers: [PostResolver] }),
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            GraphiqlApolloServerPlugin,
        ],
    });
    await server.start();

    app.use(cors());

    server.applyMiddleware({ app });

    await new Promise<string>(resolve =>
        httpServer.listen({ port: 4000 }, () => resolve("Server Started"))
    );
    console.log(
        `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
    );
})();
