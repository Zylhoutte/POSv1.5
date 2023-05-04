import FlexBetween from "../../components/FlexBetween";
import Header from "../../components/Header";
import {
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "components/BreakdownChart";
import OverviewChart from "components/OverviewChart";
import StatBox from "components/StatBox";
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';



const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const theme = useTheme();
  const [billsData, setBillsData, isLoading] = useState([]);
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalSale, setTotalSale] = useState(0);
  const [todaySale, setTodaySale] = useState(0);
  const [monthlySales, setMonthlySales] = useState({});



  const {admin} = useSelector((state) => state.admin)
  const getAllBills = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const {data} = await axios.get('/api/bills/getbills');
      const uniqueCustomers = new Set(data.map((bill) => bill.customerName));
      setTotalCustomers(uniqueCustomers.size);
      setBillsData(data);
      setTotalSale(data.reduce((total, bill) => total + bill.subTotal, 0));
      const today = new Date();
      const todayBills = data.filter((bill) => {
        const billDate = new Date(bill.createdAt);
        return (
          billDate.getDate() === today.getDate() &&
          billDate.getMonth() === today.getMonth() &&
          billDate.getFullYear() === today.getFullYear()
        );
      });
      const todaySaleAmount = todayBills.reduce((total, bill) => total + bill.subTotal, 0);
      setTodaySale(todaySaleAmount);

      // Calculate monthly sales
      const monthlySales = {};
      data.forEach((bill) => {
        const monthYear = new Date(bill.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' });
        if (!monthlySales[monthYear]) {
          monthlySales[monthYear] = 0;
        }
        monthlySales[monthYear] += bill.subTotal;
      });
      setMonthlySales(monthlySales);

     
      dispatch({
        type: "HIDE_LOADING",
      });
      console.log(data);

    } catch(error) {
      dispatch({
        type: "HIDE_LOADING",
      });
      console.log(error);
    }
  };

  useEffect(() => {
      getAllBills();
  }, []);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 0.5,
    },
    {
      field: "customerName",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "customerAddress",
      headerName: "Address",
      flex: 0.5,
    },

  ];

  useEffect(() => {
    
    if(!admin) {
      navigate('/admin')
    }
 
    
    return () => {
   
    }
  }, [admin, navigate])



  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Total Customers"
          value={totalCustomers}
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Sales Today"
          value={`₱${todaySale.toFixed(2)}`}
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart view="sales" isDashboard={true} />
        </Box>
        <StatBox
          title="Monthly Sales"
          value={`₱${totalSale.toFixed(2)}`}
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Yearly Sales"
         value={`₱${totalSale.toFixed(2)}`}
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
          loading={isLoading || !billsData}
          getRowId={(row) => row._id}
          rows={billsData || []}
          columns={columns}
        />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Sales By Category
          </Typography>
          <BreakdownChart isDashboard={true} />
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Breakdown of real states and information via category for revenue
            made for this year and total sales.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
