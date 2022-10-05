// https://github.com/apollographql/apollo-client/issues/4794
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'graphql-tag';
import { Box, Heading } from '@chakra-ui/react';

import { withApollo } from '../lib/apollo';
import Layout from '../components/Layout/Layout';
import HabitForm from '../components/Habits/HabitForm';
import HabitList from '../components/Habits/HabitList';

const HELLO_QUERY = gql`
  query HelloQuery {
    sayHello
  }
`;

const Home = () => {
  const { data, loading, error } = useQuery(HELLO_QUERY);

  if (loading) return <Box />;

  if (error) {
    console.error('index errors: ', error);
  }

  return (
    <Layout>
      <Box w="100%">
        <Heading as="h1" textAlign="center">
          Level Up
        </Heading>
        <Box m="0 auto">
          <HabitForm />
          <HabitList />
        </Box>
      </Box>
    </Layout>
  );
};

export default withApollo(Home);
