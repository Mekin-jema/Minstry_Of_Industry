import React,{useContext} from 'react'
import { LoginContext } from '../helpers/LoginContext'
import { useNavigate } from 'react-router-dom'
const Logout = () => {
  const navigate = useNavigate();
  const {logout} = useContext(LoginContext);
  logout();
  return (
    <div>{navigate('/')}</div>
  )
}

export default Logout
