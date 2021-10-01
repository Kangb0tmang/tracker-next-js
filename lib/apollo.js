import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import fetch from 'isomorphic-unfetch';

export function withApollo(PageComponent) {
  const WithApollo = (props) => {
    const client = new ApolloClient({
      // Local only, change to prod when deploying
      uri: 'http://localhost:3000/api/graphql',
      fetch,
    });

    return (
      <ApolloProvider client={client}>
        <PageComponent {...props} />
      </ApolloProvider>
    );
  };

  return WithApollo;
}
