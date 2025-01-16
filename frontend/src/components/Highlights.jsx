import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';

const items = [
  {
    icon: <SettingsSuggestRoundedIcon />,
    title: 'Seamless Integration',
    description:
      "Our platform effortlessly connects you to all WC2030 games, whether you're buying tickets or streaming live. Experience smooth transitions and easy navigation across all devices.",
  },
  {
    icon: <ConstructionRoundedIcon />,
    title: 'Robust Performance',
    description:
      'Built to handle high demand, our platform ensures you never miss a moment of the action. Enjoy uninterrupted streaming and quick ticket purchases, even during peak times.',
  },
  {
    icon: <ThumbUpAltRoundedIcon />,
    title: 'User-Friendly Design',
    description:
      "Navigate our platform with ease, thanks to an intuitive interface designed for all users. Whether you're tech-savvy or a first-time user, you'll find everything you need in just a few clicks.",
  },
  {
    icon: <AutoFixHighRoundedIcon />,
    title: 'Cutting-Edge Innovation',
    description:
      'Stay ahead with features that set new standards in online ticketing and live streaming. From real-time updates to exclusive content, we provide a comprehensive WC2030 experience.',
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: 'Reliable support',
    description:
      "Count on our responsive customer support team, available to assist you with any issues or questions. We're here to ensure your experience is smooth and enjoyable from start to finish.",
  },
  {
    icon: <QueryStatsRoundedIcon />,
    title: 'Attention to Detail',
    description:
      'Enjoy a meticulously crafted platform where every feature is designed to enhance your WC2030 experience. From personalized notifications to easy payment options, we’ve thought of everything.',
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: 'grey.900',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4" gutterBottom>
            Highlights
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
          Discover why our platform stands out: seamless integration, robust performance, user-friendly design, and cutting-edge innovation. Enjoy reliable customer support and attention to every detail.
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {items.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Stack
                direction="column"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  color: 'inherit',
                  p: 3,
                  height: '100%',
                  borderColor: 'hsla(220, 25%, 25%, 0.3)',
                  backgroundColor: 'grey.800',
                }}
              >
                <Box sx={{ opacity: '50%' }}>{item.icon}</Box>
                <div>
                  <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
