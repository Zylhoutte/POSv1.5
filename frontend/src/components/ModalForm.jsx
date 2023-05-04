import { useState } from 'react';
import { TextField, Select, MenuItem, Button, FormControl, InputLabel } from '@mui/material';

function MyForm() {
  const [customer, setCustomer] = useState({
    customerName: '',
    customerPhone: '',
    customerAddress: '',
    paymentMethod: '',
  });

  const handleChange = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(customer); // Do whatever you want with the form data
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Customer Name"
        name="customerName"
        value={customer.customerName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Customer Phone"
        name="customerPhone"
        value={customer.customerPhone}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Customer Address"
        name="customerAddress"
        value={customer.customerAddress}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="paymentMethodLabel">Payment Method</InputLabel>
        <Select
          labelId="paymentMethodLabel"
          name="paymentMethod"
          value={customer.paymentMethod}
          onChange={handleChange}
        >
          <MenuItem value="cash">Cash</MenuItem>
          <MenuItem value="paypal">Paypal</MenuItem>
          <MenuItem value="card">Card</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
}
