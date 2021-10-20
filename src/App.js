import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import MyFiles from './components/routes/myfiles/MyFiles'
import Recent from './components/routes/recent/Recent';
import Shared from './components/routes/sharedwithme/Shared';
import Starred from './components/routes/starred/Starred';
import PrivateRoute from './components/routes/PrivateRoute'
import PublicRoute from './components/routes/PublicRoute'
import ShareLink from './components/routes/sharefilewithlink/ShareLink'
import SnackbarProvider from './components/snackbar/SnackbarProvider'
import CustomizedSnackbar from './components/snackbar/CustomizedSnackbar'
import MessageProvider from './components/snackbar/MessageProvider'
import Auth from './components/routes/home/Auth'
import VerifyEmail from './components/routes/home/VerifyEmail'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <MessageProvider>
          <SnackbarProvider>
            <CustomizedSnackbar />
            <Router>
              <Switch>
                <PublicRoute exact path='/' component={Auth} />
                <PublicRoute exact path='/auth/:token/verify/email' component={VerifyEmail} />
                <PrivateRoute exact path='/myfiles' component={MyFiles} />
                <PrivateRoute exact path='/shared-with-me' component={Shared} />
                <PrivateRoute exact path='/recent' component={Recent} />
                <PrivateRoute exact path='/starred' component={Starred} />
                <PrivateRoute exact path='/:id/share' component={ShareLink} />
              </Switch>
            </Router>
          </SnackbarProvider>
        </MessageProvider>
      </div>
    </Provider>
  );
}

export default App;
