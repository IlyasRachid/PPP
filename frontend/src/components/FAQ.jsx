import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function FAQ() {
  const [expanded, setExpanded] = React.useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(
      isExpanded ? [...expanded, panel] : expanded.filter((item) => item !== panel),
    );
  };

  return (
    <Container
      id="faq"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Typography
  component="h2"
  variant="h4"
  sx={{
    color: 'text.primary',
    width: { sm: '100%', md: '60%' },
    textAlign: { sm: 'left', md: 'center' },
  }}
>
  Frequently Asked Questions
</Typography>
<Box sx={{ width: '100%' }}>
  <Accordion
    expanded={expanded.includes('panel1')}
    onChange={handleChange('panel1')}
  >
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1d-content"
      id="panel1d-header"
    >
      <Typography component="span" variant="subtitle2">
        How can I purchase tickets for WC2030 matches?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography
        variant="body2"
        gutterBottom
        sx={{ maxWidth: { sm: '100%', md: '70%' } }}
      >
        You can easily purchase tickets through our website. Simply select the match you want to attend, choose your ticket type, and complete the payment process. You'll receive a digital ticket via email.
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion
    expanded={expanded.includes('panel2')}
    onChange={handleChange('panel2')}
  >
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel2d-content"
      id="panel2d-header"
    >
      <Typography component="span" variant="subtitle2">
        Can I stream WC2030 games online?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography
        variant="body2"
        gutterBottom
        sx={{ maxWidth: { sm: '100%', md: '70%' } }}
      >
        Yes, our platform offers live streaming of all WC2030 games. You can watch the matches on any device with an internet connection.
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion
    expanded={expanded.includes('panel3')}
    onChange={handleChange('panel3')}
  >
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel3d-content"
      id="panel3d-header"
    >
      <Typography component="span" variant="subtitle2">
        What should I do if I have issues with my ticket or streaming?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography
        variant="body2"
        gutterBottom
        sx={{ maxWidth: { sm: '100%', md: '70%' } }}
      >
        If you encounter any issues, please contact our customer support team at <Link href="mailto:support@wc2030.com">support@wc2030.com</Link> or call our toll-free number. We're here to help!
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion
    expanded={expanded.includes('panel4')}
    onChange={handleChange('panel4')}
  >
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel4d-content"
      id="panel4d-header"
    >
      <Typography component="span" variant="subtitle2">
        Are there different types of tickets available?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography
        variant="body2"
        gutterBottom
        sx={{ maxWidth: { sm: '100%', md: '70%' } }}
      >
        Yes, we offer Standard, Premium, and VIP tickets. Each type provides different levels of access and benefits, so you can choose the one that best suits your needs.
      </Typography>
    </AccordionDetails>
  </Accordion>
</Box>
        
    </Container>
  );
}
