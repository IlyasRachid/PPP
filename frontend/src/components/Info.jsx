import * as React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

const products = [
  {
    name: 'Standard Ticket - Morocco vs Spain',
    desc: 'Group Stage Match - June 15, 2030',
    price: '$50.00',
  },
  {
    name: 'WC2030 Official Jersey',
    desc: 'Size: L, Color: Red',
    price: '$45.00',
  },
  {
    name: 'Stadium Seat Cushion',
    desc: 'Comfortable cushion for your seat',
    price: '$15.00',
  },
  {
    name: 'Live Streaming Pass',
    desc: 'Access to all WC2030 matches online',
    price: '$30.00',
  },
];

function Info({ totalPrice }) {
  return (
    <React.Fragment>
      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
        Total
      </Typography>
      <Typography variant="h4" gutterBottom>
        {totalPrice}
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText
              sx={{ mr: 2 }}
              primary={product.name}
              secondary={product.desc}
            />
            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
              {product.price}
            </Typography>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}

Info.propTypes = {
  totalPrice: PropTypes.string.isRequired,
};

export default Info;
