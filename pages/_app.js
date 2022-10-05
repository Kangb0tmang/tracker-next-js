import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import '../styles/globals.css';

const theme = extendTheme({
  borderColors: {
    items: ['#718096', '#F56565', '#F6E05E', '#68D391', '#63B3ED'],
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
