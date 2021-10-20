import React from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const location = useLocation()
  const isAuthenticated = useSelector(state => state.isAuthenticated)
  return <Route {...rest} render={(props) => (
    isAuthenticated && localStorage.getItem('refresh_token')!== null ? <Component {...props} />
      : <Redirect to={{
        pathname: '/',
        state : { from : location }
      }} />
  )} />
}
export default PrivateRoute