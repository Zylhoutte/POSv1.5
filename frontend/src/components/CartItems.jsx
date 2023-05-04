import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Modal,
  InputLabel,
  FormControl,
  Radio,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import NativeSelect from '@mui/material/NativeSelect';
import { updateCart, deleteFromCart, clearCart, increment,decrement } from '../features/cart/cartSlice';
import ModalForm from './ModalForm';

const CartPage = () => {

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

  const handleDiscountChange = (event) => {
    const discountValue = parseInt(event.target.value, 10);
    setIsPWD(discountValue === 10);
    setIsSeniorCitizen(discountValue === 20);
  };

  
  const handleQuantityChange = (event, id) => {
    const quantity = parseInt(event.target.value, 10);
    if (quantity > 0) {
      dispatch(updateCart({ _id: id, quantity }));
    }
  };

  const handleQuantityIncrement = (id) => {
    dispatch(increment({ _id: id, quantity: cartItems.find(item => item._id === id).quantity + 1 }));
  };
  
  const handleQuantityDecrement = (id) => {
    dispatch(decrement({ _id: id, quantity: cartItems.find(item => item._id === id).quantity - 1 }));
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
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography variant="h4" align="center" gutterBottom>
          Cart
        </Typography>
        {cartItems.length > 0 ? (
          <Paper>
            <Table>
  <TableHead>
    <TableRow>
      <TableCell>Item Name</TableCell>
      <TableCell align="right">Quantity</TableCell>
      <TableCell align="right">Price</TableCell>
      <TableCell align="right">Total</TableCell>
      <TableCell align="right">Actions</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {cartItems.map((item) => (
      <TableRow key={item._id}>
        <TableCell component="th" scope="row">
          {item.name}
        </TableCell>
        <TableCell align="right">
          <IconButton
            aria-label="remove"
            onClick={() => handleQuantityDecrement(item._id)}
          >
            <RemoveIcon />
          </IconButton>
          <TextField
            size="small"
            value={item.quantity}
            InputProps={{ inputProps: { min: 1 } }}
            style={{ width: '50px', textAlign: 'center' }}
          />
          <IconButton
            aria-label="add"
            onClick={() => handleQuantityIncrement(item._id)}
          >
            <AddIcon />
          </IconButton>
        </TableCell>
        <TableCell align="right">₱{item.price.toFixed(2)}</TableCell>
        <TableCell align="right">
          ₱{(item.quantity * item.price).toFixed(2)}
        </TableCell>
        <TableCell align="right">
          <IconButton
            aria-label="delete"
            onClick={() => handleDeleteClick(item._id)}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    ))}
    <TableRow>
      <TableCell colSpan={3} />
      <TableCell align="right">Subtotal</TableCell>
      <TableCell align="right">₱{subTotal.toFixed(2)}</TableCell>
    </TableRow>
<TableRow>
<FormControl fullWidth>
  <InputLabel variant="standard" htmlFor="uncontrolled-native">
  </InputLabel>
  <NativeSelect
        defaultValue={30}
        onChange={handleDiscountChange}
        inputProps={{
          name: 'discount',
          id: 'discount-native',
        }}
      >
    <option value={10}>PWD</option>
    <option value={20}>Senior Citzen</option>
    <option value={30}></option>
  </NativeSelect>
</FormControl>
  <TableCell colSpan={2} />
  <TableCell align="right">Discount</TableCell>
  <TableCell align="right">
    {(isPWD || isSeniorCitizen) ? `₱${discount.toFixed(2)}` : '-'}
  </TableCell>
</TableRow>

    <TableRow>
      <TableCell colSpan={3} />
      <TableCell align="right">Tax</TableCell>
      <TableCell align="right">₱{(subTotal * 0.1).toFixed(2)}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell colSpan={3} />
      <TableCell align="right">Total</TableCell>
      <TableCell align="right">₱{total.toFixed(2)}</TableCell>
    </TableRow>
  </TableBody>
</Table>
          </Paper>
        ) : (
          <Typography variant="subtitle1" align="center">
            Your cart is empty
          </Typography>
        )}
        {cartItems.length > 0 && (
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Typography variant="h6" component="span" mr={2}>
              Total price: ₱{total.toFixed(2)}
            </Typography>
            <Box m={2}>
            <Button variant="contained" onClick={handleCreateInvoiceClick}>
              Checkout
            </Button>
            </Box>
            <Box m={2}>
          <Button variant="contained" onClick={handleClearCartClick}>Clear Cart</Button>
          <Modal open={open} onClose={handleModalClose}>
         <Box sx={style}>
         <ToastContainer />
  <h2>Customer Details</h2>
  <TextField
    label="Customer Name"
    name="customerName"
    value={customerName}
    onChange={handleCustomerNameChange}
    fullWidth
    margin="normal"
  />
  <TextField
     label="Customer Phone"
     name="customerPhone"
    value={customerPhone}
    onChange={handleCustomerPhoneChange}
    fullWidth
    margin="normal"
  />
  <TextField
    label="Customer Address"
    name="customerAddress"
    value={customerAddress}
    onChange={handleCustomerAddressChange}
    fullWidth
    margin="normal"
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
      <p>Change: ₱{cashChange.toFixed(2)}</p>
      <p>Total Balance: ₱{totalBalance.toFixed(2)}</p>
    </>
  )}
  <p>Total: ₱{total.toFixed(2)}</p>
  <Button variant="contained" onClick={handleCreateInvoice}>Create Invoice</Button>
        </Box>
        </Modal>
          </Box>
          </Box>    
        )}
      </Box>
    </Container>
  );
};

export default CartPage;
