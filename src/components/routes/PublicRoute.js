import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PublicRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector(state => state.isAuthenticated)
  return <Route {...rest} render={(props) => (
    !(isAuthenticated && localStorage.getItem('refresh_token')!== null) ? <Component {...props} />
      : <Redirect to={{
        pathname: '/myFiles'
      }} />
  )} />
}
export default PublicRoute