import {
  Box, Container, Link as MuiLink, Typography,
} from '@mui/material';

export default function OtherWork() {
  return (
    <Container
      sx={{
        width: '100%',
        px: {
          xs: 4,
          md: 10,
        },
        display: 'flex',
        flexDirection: {
          xs: 'column',
          md: 'row',
        },
        mt: 5,
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
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
        }}
      >
        <Box
          flex={2}
        >
          <Typography
            variant="h2"
            sx={{
              pb: {
                xs: 5,
                md: 0,
              },
            }}
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
            For more details, take a look at my
            {' '}
            <MuiLink
              href="https://www.linkedin.com/in/nickhong/"
              target="_blank"
            >
              Linkedin.
            </MuiLink>
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
