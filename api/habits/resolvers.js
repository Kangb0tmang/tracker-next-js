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
};
