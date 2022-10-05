import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Grid, Box, Heading } from '@chakra-ui/react';

import Habit from './Habit';

const GET_HABITS = gql`
  query getHabits {
    habits {
      _id
      name
      events {
        _id
        date
      }
    }
  }
`;

const HabitList = () => {
  const { data, loading, error } = useQuery(GET_HABITS);

  if (loading) return <Box />;

  if (error) {
    console.error('Habit List errors: ', error);
    return <Box />;
  }

  const { habits } = data;

  return (
    <Box as="section" mt="50px">
      <Heading as="h2" mb="20px">
        My Habits
      </Heading>
      <Grid
        gap={5}
        autoFlow="row dense"
        templateColumns={['', '', 'repeat(2, 1fr)']}
      >
        {habits.map((habit, index) => (
          <Habit key={habit._id} habit={habit} index={index} />
        ))}
      </Grid>
    </Box>
  );
};

export default HabitList;
