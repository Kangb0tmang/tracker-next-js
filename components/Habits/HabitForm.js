import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useForm } from 'react-hook-form';
import { FormControl, FormLabel, Box, Input, Button } from '@chakra-ui/react';

// https://chakra-ui.com/getting-started/with-hook-form

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

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    addHabit({
      variables: {
        habit: {
          name: data.habit,
        },
      },
    });
  };

  return (
    <Box maxW="300px">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb="20px">
          <FormLabel htmlFor="habit">Habit</FormLabel>
          <Input {...register('habit')} id="habit" />
        </FormControl>
        <Button type="submit">Submit</Button>
      </form>
    </Box>
  );
};

export default HabitForm;
