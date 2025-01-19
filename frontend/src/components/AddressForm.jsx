import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid2";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function AddressForm({ formValues, onChange }) {
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
      <FormGrid size={{ xs: 12 }}>
        <FormControlLabel
          control={<Checkbox name="saveAddress" value="yes" />}
          label="Use this information for payment details"
        />
      </FormGrid>
    </Grid>
  );
}