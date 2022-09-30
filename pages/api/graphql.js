import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { ApolloServer, gql } from 'apollo-server-micro';
import mongoose from 'mongoose';

const typeDefs = gql`
  type User {
    id: ID
  }
  type Query {
    sayHello: String
  }
`;

const resolvers = {
  Query: {
    sayHello: () => {
      return 'Hello there';
    },
  },
};

// https://lyonwj.com/blog/graphql-server-next-js-neo4j-aura-vercel#using-graphql-playground-with-apollo-server-v3
// GraphQL Playground deprecated, can enable it again as a plugin
// Should be a public GraphQL API
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const startServer = apolloServer.start();

// Check if DB is connected
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  console.log('Connected to Mongo');
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (mongoose.connections[0].readyState !== 1) {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  await startServer;
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
}

/* Example from video, was for older version */
// Config is the same

// const apolloServer = new ApolloServer({
//   typeDefs,
//   resolvers,
// });
// const apolloServer = new ApolloServer({ typeDefs, resolvers });

/* Previous basic API example */
// Short way
// export default (req, res) => {
//   // NextJS helpers
//   res.status(200).json({
//     test: 'Hello there',
//   });
// };

// Long way
// export default (req, res) => {
//   res.setHeader('Content-Type', 'application/json'); // Type of response
//   res.statusCode = 200;
//   res.end(
//     JSON.stringify({
//       test: 'Hello there',
//     })
//   );
// };
