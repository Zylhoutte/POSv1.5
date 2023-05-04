import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {useTheme} from "@mui/material";
import CardMedia from '@mui/material/CardMedia';

const ProductList = ({ product }) => {
  const theme = useTheme();



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
        <Typography sx={{ mb: "1.5rem" }} variant="h5">
        ₱{Number(product.price).toFixed(2)}
        </Typography>
      </CardContent>
    </Card>
 </>
    
  );
};

export default ProductList;
