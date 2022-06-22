import {
  Box, Container, Link as MuiLink, Typography,
} from '@mui/material';
import Link from 'next/link';

export default function OtherWork() {
  return (
    <Container
      sx={{
        width: '100%',
        px: 10,
        display: 'flex',
      }}
    >
      <Box
        sx={{
          flex: 2,
        }}
      />
      <Box
        sx={{
          flex: 8,
          display: 'flex',
        }}
      >
        <Box
          flex={2}
        >
          <Typography
            variant="h2"
          >
            Other Work
          </Typography>
        </Box>
        <Box
          flex={6}
        >
          <Typography
            variant="body"
          >
            Before journeying into Web3, I worked for 10 years as a
            fullstack Software Engineer / Engineering Manager
            at several Web2 companies:
            {' '}
            <MuiLink href="https://medium.com" target="_blank">Medium</MuiLink>
            ,
            {' '}
            <MuiLink href="https://eaze.com" target="_blank">Eaze</MuiLink>
            ,
            {' '}
            <MuiLink href="https://instacart.com" target="_blank">Instacart</MuiLink>
            , and
            {' '}
            <MuiLink href="https://therealreal.com" target="_blank">TheRealReal</MuiLink>
            .
            <br />
            <br />
            I&apos;m a skilled fullstack engineer, with experience in React.js, Solidity,
            Next.js, Express.js, Node.js, and Ruby on Rails.
            <br />
            <br />
            I&apos;ve also had 4 years of experience managing high performance engineering
            teams in fast-moving, high-pressure startups.
          </Typography>
          <Typography
            variant="body"
          >
            <br />
            <br />
            For more details, take a look at
            {' '}
            <Link href="/resume"><MuiLink>my resume.</MuiLink></Link>
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          flex: 2,
        }}
      />
    </Container>
  );
}
