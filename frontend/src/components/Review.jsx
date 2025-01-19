import * as React from 'react';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function Review({ formValues }) {
  return (
    <Stack spacing={2}>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Products" secondary="4 selected" />
          <Typography variant="body2">$134.98</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Shipping" secondary="Plus taxes" />
          <Typography variant="body2">$9.99</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            $144.97
          </Typography>
        </ListItem>
      </List>
      <Divider />
      <Stack
        direction="column"
        divider={<Divider flexItem />}
        spacing={2}
        sx={{ my: 2 }}
      >
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Shipment details
          </Typography>
          <Typography gutterBottom>
            {formValues.firstName} {formValues.lastName}
          </Typography>
          <Typography gutterBottom sx={{ color: 'text.secondary' }}>
            {formValues.email}
          </Typography>
          <Typography gutterBottom sx={{ color: 'text.secondary' }}>
            {formValues.phone}
          </Typography>
          <Typography gutterBottom sx={{ color: 'text.secondary' }}>
            {formValues.address}
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Payment details
          </Typography>
          {formValues.paymentType === 'creditCard' && (
            <Grid container>
              <Stack
                direction="row"
                spacing={1}
                useFlexGap
                sx={{ width: '100%', mb: 1 }}
              >
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  Card type:
                </Typography>
                <Typography variant="body2">Visa</Typography>
              </Stack>
              <Stack
                direction="row"
                spacing={1}
                useFlexGap
                sx={{ width: '100%', mb: 1 }}
              >
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  Card holder:
                </Typography>
                <Typography variant="body2">{formValues.cardName}</Typography>
              </Stack>
              <Stack
                direction="row"
                spacing={1}
                useFlexGap
                sx={{ width: '100%', mb: 1 }}
              >
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  Card number:
                </Typography>
                <Typography variant="body2">{formValues.cardNumber}</Typography>
              </Stack>
              <Stack
                direction="row"
                spacing={1}
                useFlexGap
                sx={{ width: '100%', mb: 1 }}
              >
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  Expiry date:
                </Typography>
                <Typography variant="body2">{formValues.expirationDate}</Typography>
              </Stack>
            </Grid>
          )}
          {formValues.paymentType === 'bankTransfer' && (
            <Grid container>
              <Stack
                direction="row"
                spacing={1}
                useFlexGap
                sx={{ width: '100%', mb: 1 }}
              >
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  Bank:
                </Typography>
                <Typography variant="body2">Mastercredit</Typography>
              </Stack>
              <Stack
                direction="row"
                spacing={1}
                useFlexGap
                sx={{ width: '100%', mb: 1 }}
              >
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  Account number:
                </Typography>
                <Typography variant="body2">123456789</Typography>
              </Stack>
              <Stack
                direction="row"
                spacing={1}
                useFlexGap
                sx={{ width: '100%', mb: 1 }}
              >
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  Routing number:
                </Typography>
                <Typography variant="body2">987654321</Typography>
              </Stack>
            </Grid>
          )}
        </div>
      </Stack>
    </Stack>
  );
}