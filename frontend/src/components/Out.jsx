import {FaSignInAlt, FaUser} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/admins/adminSlice'
import { Button,} from '@mui/material';



function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/admin')

  }

  return (
<>
     
            <Button variant="contained" onClick={onLogout}>
               Logout
             </Button>
   
</>
  )
}

export default Header