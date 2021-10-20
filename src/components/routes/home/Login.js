import React from 'react'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { login, googleLogin } from '../../../redux/actions/auth'
import { useDispatch } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import { useSetMessage, useResetMessage } from '../../snackbar/MessageProvider'
import { useSnackbarHandleOpen } from '../../snackbar/SnackbarProvider'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Avatar from '@material-ui/core/Avatar'
import { GoogleLogin } from 'react-google-login'
import Glogo from '../../../assets/g-logo.png'
import CircularProgress from '@material-ui/core/CircularProgress'

function Login({ setOpen }) {
    const location = useLocation()
    const history = useHistory()

    const dispatch = useDispatch()

    const setMessage = useSetMessage()
    const resetMessage = useResetMessage()
    const handleOpen = useSnackbarHandleOpen()

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [loader, setLoader] = React.useState(false)

    const googleSuccess = (response) => {
        const { profileObj } = response
        console.log(profileObj)
        const data = {
            name: profileObj.name,
            email: profileObj.email,
            image: profileObj.imageUrl
        }
        googleLoginSubmit(data)
    }
    const googleFailure = (error) => {
        resetMessage()
        setMessage({ msg: `${error.message}`, type: 'error' })
        handleOpen()
    }

    const loginSubmit = async (e) => {
        setLoader(true)
        e.preventDefault()
        const data = {
            email, password
        }
        try {
            const status = await dispatch(login(data))
            if (status === 200) {
                setLoader(false)
                if (location.state && location.state.from) return history.push(location.state.from.pathname)
                history.push('/myFiles')
            }

        } catch (error) {
            setLoader(false)
            resetMessage()
            setMessage({ msg: `${error.message}`, type: 'error' })
            handleOpen()
        }
    }
    const googleLoginSubmit = async (data) => {
        try {
            const status = await dispatch(googleLogin(data))
            if (status === 200) {
                if (location.state && location.state.from) return history.push(location.state.from.pathname)
                history.push('/myFiles')
            }
        } catch (error) {
            resetMessage()
            setMessage({ msg: `${error.message}`, type: 'error' })
            handleOpen()
        }
    }
    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        padding: '16px',
        minMidth: '300px',
        width: '300px'
    }
    return (

        <form onSubmit={loginSubmit}>
            <Paper style={formStyle} elevation={3}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 0 16px 0' }}>
                    <Avatar style={{ background: '#74ebd5' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <h3 style={{ color: '#70919a', margin: '8px 0 0 16px' }}>Login to your account</h3>
                </div>
                <GoogleLogin
                    clientId='818985442034-tmtrfpg4c47muudk9ovqordjnjceq0pi.apps.googleusercontent.com'
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    render={(renderProps) => (
                        <Button
                            color='inherit'
                            style={{ textTransform: 'none', background: '#fff', color: '#777' }}
                            fullWidth
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            startIcon={<img src={Glogo} height='20px' alt='' />}
                            variant='contained'
                        >Sign in with google</Button>
                    )} />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '16px 0' }}>
                    <div style={{ background: '#ddd', height: '1px', width: '100%' }}></div>
                    <p style={{ margin: '0 8px', color: '#ddd' }}>OR</p>
                    <div style={{ background: '#ddd', height: '1px', width: '100%' }}></div>
                </div>
                <TextField
                    size='small'
                    style={{ marginBottom: '16px' }}
                    variant='outlined' type='email'
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    label='enter email address' />
                <TextField
                    size='small'
                    style={{ marginBottom: '16px' }}
                    variant='outlined' type='password'
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    label='enter password' />
                <p style={{ margin: '-8px 0 8px 0', color: '#71909a' }}>Don't have an account? <span onClick={() => setOpen(false)} style={{ color: '#4286f4', textDecoration: 'underline', cursor: 'pointer' }}>click here</span></p>
                <Button
                    color='primary'
                    size='small'
                    style={{ backgroundColor: '#4286f4' }}
                    variant='contained'
                    type='submit'>{loader ? <CircularProgress color='inherit' style={{ height: '22px', width: '22px' }} /> : 'login'}</Button>
            </Paper>
        </form>

    )
}

export default Login
