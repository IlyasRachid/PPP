import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid2";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

import PropTypes from "prop-types";

export default function AddressForm({ formValues, onChange }) {
  // Gérer la sélection du type de billet
  const handleTicketTypeChange = (event) => {
    onChange({
      target: {
        name: "ticketType",
        value: event.target.value,
      },
    });
  };

  return (
    <Grid container spacing={3}>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="first-name" required>
          First name
        </FormLabel>
        <OutlinedInput
          id="first-name"
          name="firstName"
          type="name"
          placeholder="John"
          autoComplete="first name"
          required
          size="small"
          value={formValues.firstName}
          onChange={onChange}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="last-name" required>
          Last name
        </FormLabel>
        <OutlinedInput
          id="last-name"
          name="lastName"
          type="last-name"
          placeholder="Snow"
          autoComplete="last name"
          required
          size="small"
          value={formValues.lastName}
          onChange={onChange}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="email" required>
          Email
        </FormLabel>
        <OutlinedInput
          id="email"
          name="email"
          type="email"
          placeholder="Your personnel email"
          autoComplete="shipping email"
          required
          size="small"
          value={formValues.email}
          onChange={onChange}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="phone" required>
          Phone Number
        </FormLabel>
        <OutlinedInput
          id="phone"
          name="phone"
          type="phone"
          placeholder="Your personnel phone number"
          autoComplete="shipping phone"
          required
          size="small"
          value={formValues.phone}
          onChange={onChange}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="address">Address line</FormLabel>
        <OutlinedInput
          id="address"
          name="address"
          type="address"
          placeholder="Apartment, suite, unit, etc. (optional)"
          autoComplete="shipping address-line"
          required
          size="small"
          value={formValues.address}
          onChange={onChange}
        />
      </FormGrid>
      {/* Ajout du groupe de boutons radio au-dessus de la case à cocher */}
      <FormGrid size={{ xs: 12 }}>
        <FormLabel component="legend" required>
          Ticket Type
        </FormLabel>
        <RadioGroup
          name="ticketType"
          value={formValues.ticketType || ""}
          onChange={handleTicketTypeChange}
          row // Afficher les boutons radio en ligne
        >
          <FormControlLabel
            value="VIP"
            control={<Radio size="small" />} // Taille réduite pour correspondre aux autres champs
            label="VIP Ticket"
          />
          <FormControlLabel
            value="Premium"
            control={<Radio size="small" />}
            label="Premium Ticket"
          />
          <FormControlLabel
            value="Standard"
            control={<Radio size="small" />}
            label="Standard Ticket"
          />
        </RadioGroup>
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormControlLabel
          control={<Checkbox name="saveAddress" value="yes" />}
          label="Use this information for payment details"
        />
      </FormGrid>
    </Grid>
  );
}

AddressForm.propTypes = {
  formValues: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
