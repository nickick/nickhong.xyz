import { Box } from '@mui/material';
import Head from 'next/head';
import Home from '../src/Home';

export default function HomePage() {
  return (
    <Box>
      <Head>
        <title>nickhong.xyz</title>
      </Head>
      <Home />
    </Box>
  );
}
