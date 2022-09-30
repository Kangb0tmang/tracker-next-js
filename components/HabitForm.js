import { Form, Field } from '@leveluptuts/fresh';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const ADD_HABIT = gql`
  mutation addHabit($habit: HabitInput) {
    addHabit(habit: $habit) {
      _id
      name
    }
  }
`;

const HabitForm = () => {
  // Same in mutations
  const [addHabit] = useMutation(ADD_HABIT, {
    // Refreshing the cache
    // Same query name in HabitList.js
    refetchQueries: ['getHabits'],
  });

  return (
    <Form
      onSubmit={(data) => {
        addHabit({
          variables: {
            habit: {
              name: data.habit,
            },
          },
        });
      }}
    >
      <Field>Habit</Field>
    </Form>
  );
};

export default HabitForm;
