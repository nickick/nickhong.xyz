/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/forbid-prop-types */

import { CssBaseline } from '@mui/material';
import PropTypes from 'prop-types';

import Layout from '../src/Layout';
import LoadedContextProvider from '../src/LoadedContextProvider';
import ThemeContextProvider from '../src/ThemeContextProvider';
import '../styles/globals.css';

function App({ Component, pageProps }) {
  return (
    <ThemeContextProvider>
      <LoadedContextProvider>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </LoadedContextProvider>
    </ThemeContextProvider>
  );
}

App.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default App;
