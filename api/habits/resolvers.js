export const habitsResolvers = {
  // Same in .graphql
  Query: {
    async habits() {
      // Placeholder message
      console.log('habits');
      return [
        {
          _id: 'some array',
          name: 'Some habit',
        },
      ];
    },
  },
};
