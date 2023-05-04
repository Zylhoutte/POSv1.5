import {useState, useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom' 
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner  from '../components/Spinner'




function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',

  })

  const { email, password, } = formData
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

  useEffect(() => {
    if(isError) {
      toast.error(message)

    }

    if(isSuccess || user) {
      navigate('/')
    }


    dispatch(reset())

  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))

  }

  

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password
    }

    dispatch(login(userData))

  }

  if (isLoading) {
    return <Spinner />
  }

  return <>
     <div className="Main-container">
      <div className="container-login">
        <div className="wrap-login">
          <div className="login-pic">
            <img src="Dreamers.png" alt="IMG" />
          </div>

          <form className="login-form" onSubmit={onSubmit}>
            <span className="login-form-title">Cashier</span>

            <div className="wrap-input">
              <input
                type="text"
                className="input"
                name="email"
                placeholder="Email"
                value={email}
                onChange={onChange}
                
              />
              <span className="focus-input"></span>
              <span className="symbol-input">
                <i className="fa fa-envelope" aria-hidden="true"></i>
              </span>
            </div>

            <div className="wrap-input">
            <input 
            type="password" 
            className="input" 
            id="password" 
            name="password" 
            value={password} 
            placeholder="Enter password" 
            onChange={onChange}
            />

              <span className="focus-input"></span>
              <span className="symbol-input">
                <i className="fa fa-lock" aria-hidden="true"></i>
              </span>
            </div>

            <div className="login-form-btn-container">
              <button className="login-form-btn" type="submit">
                Login
              </button>
            </div>

            <div className="text-center p-t-1">
              <span className="txt1"></span>
           
            
            </div>

            <div className="text-center p-t-2">
           
               
                <i className="fa fa-long-arrow-right " aria-hidden="true"></i>
             
            </div>
          </form>
        </div>
      </div>
    </div>
  );


    </>
  
}

export default Login