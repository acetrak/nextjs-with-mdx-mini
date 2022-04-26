// import App from 'next/app'
import * as React from 'react';
import { ThemeProvider } from '@mui/styles';
import { CssBaseline, createTheme } from '@mui/material';
import NProgress from 'nprogress';
import Router from 'next/router';
import '../styles/globals.css';

NProgress?.configure({
  showSpinner: false,
  minimum: 0.09,
  speed: 180,
  trickleSpeed: 160,
});


const theme = createTheme({
  palette: {
    primary: {
      main: '#388d64',
    },
  },
});

function MyApp({ Component, pageProps }) {

  React.useEffect(() => {
    NProgress?.done();
  }, [pageProps]);


  React.useEffect(() => {

    Router.beforePopState((e) => {

      const shallow = e.options.shallow;

      if (!shallow) {
        NProgress?.start();
      }
      return true;
    });


  }, []);


  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;