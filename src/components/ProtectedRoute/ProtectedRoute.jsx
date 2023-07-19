import { Navigate } from "react-router-dom";
import Main from "../Main/Main";
export default function ProtectedRoute({ component: Component, ...props }) {
  return (
    
      
        props.loggedIn ? <Main {...props} /> : <Navigate to={'/sign-in'} replace/>
    
  )
}