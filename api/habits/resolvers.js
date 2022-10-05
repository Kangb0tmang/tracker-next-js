import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

import Habits from './habits';

export const habitsResolvers = {
  Query: {
    async habits() {
      try {
        // Gets all habits
        const habits = await Habits.find();
        // Return all habits in an array
        return habits;
      } catch (error) {
        console.log('Error in Resolvers: ', error);
      }
    },
  },

  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar',
    parseValue(value) {
      // Value from the client
      return new Date(value);
    },
    serialize(value) {
      // Value sent to the client
      return value.getTime();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        // ast value is always in string format
        return new Date(ast.value);
      }
      return null;
    },
  }),
};
