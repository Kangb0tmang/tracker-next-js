//** Example taken from https://github.com/vercel/next.js/blob/6e77c071c7285ebe9998b56dbc1c76aaf67b6d2f/examples/with-apollo/lib/apollo.js **/

import React, { useMemo } from 'react';
/* !! https://nextjs.org/docs/upgrading#remove-headrewind */
// import Head from 'next/head';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';

let apolloClient = null;

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */
export function withApollo(PageComponent, { ssr = true } = {}) {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = useMemo(
      () => apolloClient || initApolloClient(apolloState),
      []
    );
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component';

    if (displayName === 'App') {
      console.warn('This withApollo HOC only works with PageComponents.');
    }

    WithApollo.displayName = `withApollo(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (ctx) => {
      const { AppTree } = ctx;

      // Initialize ApolloClient, add it to the ctx object so
      // we can use it in `PageComponent.getInitialProp`.
      const apolloClient = (ctx.apolloClient = initApolloClient());

      // Run wrapped getInitialProps methods
      let pageProps = {};
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx);
      }

      // Only on the server:
      if (typeof window === 'undefined') {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res && ctx.res.finished) {
          return pageProps;
        }

        // Only if ssr is enabled
        if (ssr) {
          try {
            // Run all GraphQL queries
            const { getDataFromTree } = await import('@apollo/react-ssr');
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient,
                }}
              />
            );
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error(`Error while running ${getDataFromTree}`, error);
          }

          /* !! https://nextjs.org/docs/upgrading#remove-headrewind */
          // getDataFromTree does not call componentWillUnmount
          // head side effect therefore need to be cleared manually
          // Head.rewind();
        }
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract();

      return {
        ...pageProps,
        apolloState,
      };
    };
  }

  return WithApollo;
}

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
function initApolloClient(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return createApolloClient(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient(initialState);
  }

  return apolloClient;
}

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
function createApolloClient(initialState = {}) {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // Disables forceFetch on the server (so queries are only run once)
    link: new HttpLink({
      uri: 'http://localhost:3000/api/graphql', // Server URL (must be absolute)
      credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
      fetch,
    }),
    cache: new InMemoryCache().restore(initialState),
  });
}

// Old example
// // https://stackoverflow.com/questions/53478128/apolloboost-was-initialized-with-unsupported-options
// import { ApolloClient } from '@apollo/client';
// import Head from 'next/head';
// import { ApolloProvider } from '@apollo/react-hooks';
// import fetch from 'isomorphic-unfetch';
// import { InMemoryCache } from 'apollo-cache-inmemory';

// export function withApollo(PageComponent) {
//   // Client side
//   const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
//     // Use existing one or new apolloClient
//     const client = apolloClient || initApolloClient(apolloState);

//     return (
//       <ApolloProvider client={client}>
//         <PageComponent {...pageProps} />
//       </ApolloProvider>
//     );
//   };

//   // Server side
//   // ctx = context
//   WithApollo.getinitialProps = async (ctx) => {
//     const { AppTree } = ctx;
//     const apolloClient = (ctx.apolloClient = initApolloClient());

//     let pageProps = {};
//     if (PageComponent.getinitialProps) {
//       pageProps = await PageComponent.getinitialProps(ctx);
//     }

//     // If on server
//     if (typeof window === 'undefined') {
//       if (ctx.res && ctx.res.finished) {
//         return pageProps;
//       }

//       try {
//         // Gets data from tree before app is rendered
//         const { getDataFromTree } = await import('@apollo/react-ssr');
//         await getDataFromTree(
//           <AppTree
//             pageProps={{
//               ...pageProps,
//               apolloClient,
//             }}
//           />
//         );
//       } catch (e) {
//         console.error(e);
//       }

//       // Manually clears <head> - NextJS specific function
//       Head.rewind();
//     }

//     const apolloState = apolloClient.cache.extract();
//     return {
//       ...pageProps,
//       apolloState,
//     };
//   };

//   return WithApollo;
// }

// const initApolloClient = (initialState = {}) => {
//   // Check if window is undefined
//   // const ssrMode = typeof window === 'undefined';
//   const cache = new InMemoryCache().restore(initialState);

//   const client = new ApolloClient({
//     // Local only, change to prod when deploying
//     uri: 'http://localhost:3000/api/graphql',
//     fetch,
//     cache,
//   });

//   return client;
// };
