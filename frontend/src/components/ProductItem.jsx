import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { Box,useMediaQuery,} from "@mui/material";
import Header from "components/Header";
import Product from 'components/Product';


const Productitem = () => {
  const isNonMobile = useMediaQuery("(min-width: 700px)");
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
   const dispatch = useDispatch();

  useEffect(() => {
    const getAllProducts = async () => {
        try {
          dispatch({
            type: "SHOW_LOADING",
          });
          const {data} = await axios.get('/api/products/getproducts');
          setProductData(data);
          dispatch({
            type: "HIDE_LOADING",
          });
          console.log(data);

        } catch(error) {
          console.log(error);
        }
      };

      getAllProducts();
  }, [dispatch]);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subtitle="See your list of products." />
      {productData|| !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {productData.map((product, index) => (
            <Product key={index} product={product}/>
        ))}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Productitem;
