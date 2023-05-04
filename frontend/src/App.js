import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Login from './pages/Login';
import Home from './pages/Home'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound';
import Dashboard from "./scenes/dashboard/index"
import { themeSettings } from "./theme";
import Layout from "./scenes/layout/index";
import Products from "./scenes/products/index";
import Customers from "./scenes/customers/index";
import Transactions from "./scenes/transactions/index";
import Geography from "./scenes/geography/index";
import Overview from "./scenes/overview/index";
import Daily from "./scenes/daily/index";
import Monthly from "./scenes/monthly/index";
import Breakdown from "./scenes/breakdown/index";
import Admins from "./scenes/admin/index";
import Performance from "./scenes/performance/index";
import Cart from "./pages/Cart"


function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <>
      <Router>
        <div className='container'>
        <ThemeProvider theme={theme}>
         <CssBaseline /> 
          <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path='/home' element={<Home />} /> 
            <Route path='/login' element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/cart" element={<Cart />} />
            <Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/products" element={<Products />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/geography" element={<Geography />} />
                <Route path="/overview" element={<Overview />} />
                <Route path="/daily" element={<Daily />} />
                <Route path="/monthly" element={<Monthly />} />
                <Route path="/breakdown" element={<Breakdown />} />
                <Route path="/admins" element={<Admins />} />
                <Route path="/performance" element={<Performance />} />
                
              
            </Route>
            <Route path='*' element={<NotFound />} />
          </Routes>
          </ThemeProvider>
        </div>
      </Router> 
      <ToastContainer />
    </>
  );
}

export default App;
