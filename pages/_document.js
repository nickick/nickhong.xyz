import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta property="og:image" content="https://nickhong.xyz/og-image.jpeg" />
          <meta property="og:image:type" content="image/jpeg" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content="Nick Hong, Web3 Dev" />
          <meta name="description" content="Home for Nick Hong, Web3 Dev" />
          <meta property="og:title" content="nickhong.xyz" />
          <meta property="og:description" content="Home for Nick Hong, Web3 Dev" />
          <meta property="og:url" content="https://nickhong.xyz/" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@pepperonick" />
          <meta name="twitter:creator" content="@pepperonick" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond&family=Red+Hat+Display&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
