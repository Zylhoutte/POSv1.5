import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Header from '../components/Out'
import Drawer from '../components/Drawer'
import Productitem from 'components/ProductItem'









function Home() {
  
  const navigate = useNavigate()
  



  const {user} = useSelector((state) => state.auth)

  

  useEffect(() => {
    
    if(!user) {
      navigate('/login')
    }
 
    
    return () => {
   
    }
  }, [user, navigate])

 

  return (
    <>

  
  

  

<Drawer/>




   

    

    
    
    </>
  )
}

export default Home