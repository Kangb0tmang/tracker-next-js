import Head from 'next/head';
import { Grid, Container } from '@chakra-ui/react';

import Nav from './Nav';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid templateRows="auto 1fr auto" gap={6} minHeight="100vh">
        <Nav />
        <Container maxW={'6xl'} py={8}>
          {children}
        </Container>
      </Grid>
    </>
  );
};

export default Layout;
