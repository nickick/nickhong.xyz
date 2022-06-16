/* eslint-disable react/jsx-props-no-spreading */

import { func, object } from 'prop-types';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

App.propTypes = {
  Component: func.isRequired,
  pageProps: object.isRequired,
};
