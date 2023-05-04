import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCart, deleteFromCart, clearCart } from '../features/cart/cartSlice';
import { Button, Checkbox, FormControlLabel, InputLabel, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { Modal,Radio } from '@mui/material';
import Box from '@mui/material/Box';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





const CartItems = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const [isPWD, setIsPWD] = useState(false);
  const [isSeniorCitizen, setIsSeniorCitizen] = useState(false);
  const [open, setOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cashChange, setCashChange] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleCreateInvoiceClick = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleCustomerNameChange = (event) => {
    setCustomerName(event.target.value);
  };

  const handleCustomerPhoneChange = (event) => {
    setCustomerPhone(event.target.value);
  };

  const handleCustomerAddressChange = (event) => {
    setCustomerAddress(event.target.value);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleCashChange = (event) => {
    const cashInput = parseFloat(event.target.value);
    const balance = cashInput - total;
    setCashChange(balance < 0 ? 0 : balance);
    setTotalBalance(balance < 0 ? -balance : 0);
  };

  
  const handleQuantityChange = (event, id) => {
    const quantity = parseInt(event.target.value, 10);
    if (quantity > 0) {
      dispatch(updateCart({ _id: id, quantity }));
    }
  };

  const handleDeleteClick = (id) => {
    dispatch(deleteFromCart({ _id: id }));
  };

  const handleClearCartClick = () => {
    dispatch(clearCart());
  };

  const subTotal = cartItems.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

 

  

  const discount = (isPWD || isSeniorCitizen) ? subTotal * 0.2 : 0; // Assuming 20% discount for PWD and Senior Citizen
  const total = subTotal + subTotal * 0.1 - discount; // Assuming 10% tax

  const handleCreateInvoice = () => {
    const invoice = {
      cartItems,
      isPWD,
      isSeniorCitizen,
      subTotal,
      tax: subTotal * 0.1,
      discount,
      total,
       customerName,
       customerPhone,
       customerAddress,
      paymentMethod,
    };

    

    axios.post('/api/bills/addbills', invoice)
    .then(response => {
      console.log(response.data); // Handle response
      dispatch(clearCart());
      setOpen(false);
      toast.success('Invoice created successfully!');
    })
    .catch(error => {
      console.log(error); // Handle error
      toast.error('Error creating invoice.');
    });

    dispatch(clearCart());
    setOpen(false);

   
    const receipt = `----------------------------------------
    Thank you for shopping with us!
    ----------------------------------------
    Customer Name: ${customerName}
    Phone: ${customerPhone}
    Address: ${customerAddress}
    Payment Method: ${paymentMethod}
    ----------------------------------------
    Items:
    ${cartItems.map(item => `${item.name} (${item.quantity}) - ₱${item.price.toFixed(2)}`).join('\n')}
    ----------------------------------------
    Subtotal: ₱${subTotal.toFixed(2)}
    Tax: ₱${((subTotal + discount) * 0.1).toFixed(2)}
    ${discount > 0 ? `Discount: $${discount.toFixed(2)}\n` : ''}
    Total: ₱${total.toFixed(2)}
    Cash: ₱${(total - cashChange).toFixed(2)}
    Change: ₱${cashChange.toFixed(2)}
    ----------------------------------------
    Date: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
    `;
    
    
      // Open print dialog
      const printWindow = window.open('', 'Print Receipt');
      printWindow.document.write(`<pre>${receipt}</pre>`);
      printWindow.print();
      printWindow.close();

 
    
    
  };
  

  return (
    <div>
      {cartItems.length === 0 ? (
  <Typography variant="body1" textAlign="center">Your cart is empty.</Typography>
) : (
  <div>
    <ul>
      {cartItems.map((product) => (
        <ListItem key={product.id}>
          <ListItemText primary={product.name} secondary={`Price: $${product.price}`} />
          <TextField
            type="number"
            inputProps={{ min: 1 }}
            value={product.quantity}
            onChange={(event) => handleQuantityChange(event, product._id)}
          />
          <Button variant="outlined" color="error" onClick={() => handleDeleteClick(product._id)}>
            Delete
          </Button>
        </ListItem>
      ))}
    </ul>
    <div>
      <FormControlLabel
        control={<Checkbox checked={isPWD} onChange={() => setIsPWD(!isPWD)} />}
        label="PWD"
      />
      <FormControlLabel
        control={<Checkbox checked={isSeniorCitizen} onChange={() => setIsSeniorCitizen(!isSeniorCitizen)} />}
        label="Senior Citizen"
      />
    </div>
    <Typography variant="body1">Subtotal: ₱{subTotal.toFixed(2)}</Typography>
    <Typography variant="body1">Tax: ₱{(subTotal + discount).toFixed(2) * 0.1}</Typography>
    {discount > 0 && <Typography variant="body1">Discount: ₱{discount.toFixed(2)}</Typography>}
    <Typography variant="body1">Total: ₱{total.toFixed(2)}</Typography>
    <Button variant="contained" onClick={handleCreateInvoiceClick}>Create Invoice</Button>
    <Button variant="contained" onClick={handleClearCartClick}>Clear Cart</Button>

<Modal open={open} onClose={handleModalClose}>
<Box sx={style}>
<div>
<ToastContainer />
  <h2>Customer Details</h2>
  <TextField
    label="Name"
    value={customerName}
    onChange={handleCustomerNameChange}
  />
  <TextField
    label="Phone"
    value={customerPhone}
    onChange={handleCustomerPhoneChange}
  />
  <TextField
    label="Address"
    value={customerAddress}
    onChange={handleCustomerAddressChange}
  />
  <h2>Payment Method</h2>
  <FormControlLabel
    control={<Radio />}
    label="Cash"
    value="cash"
    checked={paymentMethod === 'cash'}
    onChange={handlePaymentMethodChange}
  />
  <FormControlLabel
    control={<Radio />}
    label="Credit Card"
    value="credit card"
    checked={paymentMethod === 'credit card'}
    onChange={handlePaymentMethodChange}
  />
  {paymentMethod === 'cash' && (
    <>
      <h2>Cash Payment</h2>
      <TextField
        label="Amount Received"
        type="number"
        step="0.01"
        onChange={handleCashChange}
      />
      <p>Change: ${cashChange.toFixed(2)}</p>
      <p>Total Balance: ${totalBalance.toFixed(2)}</p>
    </>
  )}
  <p>Total: ₱{total.toFixed(2)}</p>
  <Button variant="contained" onClick={handleCreateInvoice}>Create Invoice</Button>
</div>
</Box>
      </Modal>
</div>
)}
</div>
);
};

export default CartItems;
