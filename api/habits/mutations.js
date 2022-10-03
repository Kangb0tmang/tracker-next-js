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

    async addEvent(_, { habitId, date }) {
      console.log('add event');
      try {
        date.setHours(0, 0, 0, 0);
        const habit = await Habits.findOneAndUpdate(
          {
            _id: habitId,
            'events.date': {
              $ne: date,
            },
          },
          {
            $addToSet: {
              events: {
                date,
              },
            },
          }
        );
        return habit;
      } catch (error) {
        console.log('addEvent error: ', error);
      }
    },

    async removeEvent(_, { habitId, eventId }) {
      console.log('remove event');
      try {
        const habit = await Habits.findOneAndUpdate(
          {
            _id: habitId,
          },
          {
            $pull: {
              events: {
                _id: eventId,
              },
            },
          }
        );
        return habit;
      } catch (error) {
        console.log('removeEvent error: ', error);
      }
    },
  },
};
