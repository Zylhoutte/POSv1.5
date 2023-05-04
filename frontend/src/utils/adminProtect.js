import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const adminProtect = (Component) => {
  const WrappedComponent = (props) => {
    const navigate = useNavigate()
    const { admin } = useSelector((state) => state.admin)

    if (!admin || !admin.isAdmin) {
      navigate('/not-authorized')
      return null
    }

    return <Component {...props} />
  }

  return WrappedComponent
}

export default adminProtect
