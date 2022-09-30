import Habits from './habits';

export const habitsMutations = {
  // Same in .graphql
  Mutation: {
    async addHabit(_, { habit }) {
      try {
        const newHabit = await Habits.create({
          ...habit,
        });
        return newHabit;
      } catch (error) {
        console.log('Mutations error: ', error);
      }
    },
  },
};
