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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { updateCart, deleteFromCart, clearCart, increment,decrement } from '../features/cart/cartSlice';

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



  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      render: (image, record) => (
        <img src={image} alt={record.name} height={60} width={60} />
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Action',
      render: (_, record) => (
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

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
                  {columns.map((column) => (
                    <TableCell key={column.title}>{column.title}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
  {cartItems.map((item) => (
    <TableRow key={item._id}>
      <TableCell component="th" scope="row">
        {item.name}
      </TableCell>
      <TableCell align="right">₱{item.price.toFixed(2)}</TableCell>
      <TableCell align="center">
        <IconButton
          aria-label="decrement"
          onClick={() => handleQuantityDecrement(item._id)}
          size="small"
        >
          <RemoveIcon fontSize="inherit" />
        </IconButton>
        <TextField
          value={item.quantity}
          size="small"
          textAlign="center"
        />
        <IconButton
          aria-label="increment"
          onClick={() => handleQuantityIncrement(item._id)}
          size="small"
        >
          <AddIcon fontSize="inherit" />
        </IconButton>
      </TableCell>
      <TableCell align="right">
        ₱{(item.price * item.quantity).toFixed(2)}
      </TableCell>
      <TableCell align="center">
        <IconButton
          aria-label="delete"
          onClick={() => handleDeleteClick(item._id)}
          size="small"
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </TableCell>
    </TableRow>
  ))}
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
              Total price: 
            </Typography>
            <Button variant="contained" color="primary">
              Checkout
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default CartPage;
