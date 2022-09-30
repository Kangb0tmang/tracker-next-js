// https://github.com/apollographql/apollo-client/issues/4794
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'graphql-tag';

import { withApollo } from '../lib/apollo';
import Layout from '../components/Layout';
import HabitForm from '../components/HabitForm';
import HabitList from '../components/HabitList';

const HELLO_QUERY = gql`
  query HelloQuery {
    sayHello
  }
`;

const Home = () => {
  const { data, loading, error } = useQuery(HELLO_QUERY);

  if (loading) return <div />;

  if (error) {
    console.error('index errors: ', error);
  }

  return (
    <Layout>
      <div className="hero">
        <h1 className="title">Level Up</h1>
        <div className="list">
          <HabitForm />
          <HabitList />
        </div>
      </div>

      <style jsx>{`
        .hero {
          width: 100%;
          color: #333;
        }
        .title {
          margin-top: 0;
          width: 100%;
          padding-top: 80px;
          line-height: 1.15;
          font-size: 48px;
        }
        .title,
        .description {
          text-align: center;
        }
        .list {
          max-width: 600px;
          margin: 0 auto;
        }
      `}</style>
    </Layout>
  );
};

export default withApollo(Home);
