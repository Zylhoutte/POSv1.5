import React from "react";
import { useDispatch } from "react-redux";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { addToCart } from "../features/cart/cartSlice";
import {useTheme} from "@mui/material";
import CardMedia from '@mui/material/CardMedia';


const Product = ({ product }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
 <>
 <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardMedia
        sx={{ height: 200 }}
        image={product.image}
     
      />
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
        </Typography>
        <Typography variant="h5" component="div">
        {product.name}
        </Typography>
        <Typography variant="h5">
        ₱{Number(product.price).toFixed(2)}
        </Typography>
        <Button variant="contained" onClick={handleAddToCart}>Add to cart</Button>
      </CardContent>
    </Card>
 </>
    
  );
};

export default Product;
