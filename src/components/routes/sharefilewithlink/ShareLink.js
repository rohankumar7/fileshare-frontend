import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { shareLinkAction } from '../../../redux/actions/files'
import { ReactComponent as Logo } from '../../../assets/logo.svg'
import LockImg from '../../../assets/lock.png'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import { useSelector } from 'react-redux'
import { useSetMessage, useResetMessage } from '../../snackbar/MessageProvider'
import { useSnackbarHandleOpen } from '../../snackbar/SnackbarProvider'
import axiosInstance from '../../../axios/axios'

const Container = styled.div`
    margin : 100px 0 0 0;
    display : flex;
    justify-content:center;
    align-items : center;
`

const Header = styled.div`
    font-size : 48px;
    margin : 24px 0 0 0;
`

const Label = styled.div`
    color : #71909a;
    margin : 4px 0 24px 0;
`

const LogoText = styled.p`
    font-weight:500;
    font-size:22px;
    color:#777;
    margin: 0 8px;
`

function ShareLink() {

    const user = useSelector(state => state.currentUser)

    const setMessage = useSetMessage()
    const resetMessage = useResetMessage()
    const handleOpen = useSnackbarHandleOpen()

    const history = useHistory()
    const { id } = useParams()
    const dispatch = useDispatch()
    const [error, setError] = React.useState('')
    React.useEffect(() => {
        setTimeout(() => {
            share()
        }, 2000);
    }, [])

    const share = async () => {
        try {
            const res = await dispatch(shareLinkAction(id))
            if (res) {
                history.push('/shared-with-me')
            }
        } catch (error) {
            setError(error.message)
            resetMessage()
            setMessage({ msg: `${error.message}`, type: 'error' })
            handleOpen()
            if (error.status === 400 && (error.message === 'you are the owner!' || error.message === 'already shared!'))
                history.push('/myfiles')
        }
    }
    const redirectToMyFiles = () => {
        history.push('/myfiles')
    }
    const requestAccess = async () => {
        try {
            const data = {
                sender: user.email
            }
            const response = await axiosInstance.post(`/files/access-request/${id}`, data)
            if (response.status === 200) {
                resetMessage()
                setMessage({ msg: `email sent for access request!`, type: 'success' })
                handleOpen()
            }
        } catch (error) {
            resetMessage()
            setMessage({ msg: `${error.response.data.message}`, type: 'error' })
            handleOpen()
        }
    }
    return (
        <div>{error === 'you need access!' &&
            <Container>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Logo style={{ height: '42px', width: '42px' }} />
                        <LogoText>Fileshare</LogoText>
                    </div>
                    <Header>You need access</Header>
                    <Label>Ask for access, or switch to an account with access.</Label>
                    <Button
                        color='primary'
                        size='small'
                        style={{ backgroundColor: '#4286f4' }}
                        onClick={()=> requestAccess()}
                        variant='contained'
                        type='submit'>request access</Button>
                    <Button
                        color='secondary'
                        size='small'
                        style={{ margin: '0 0 0 16px' }}
                        variant='contained'
                        onClick={redirectToMyFiles}
                        type='submit'>cancel</Button>
                    <Label style={{ marginTop: '24px' }}>You are signed in as</Label>
                    <Chip
                        avatar={<Avatar></Avatar>}
                        label={user.email}
                        color="inherit"
                    />

                </div>
                <div>
                    <img src={LockImg} draggable={false} alt='' />
                </div>
            </Container>}
        </div>
    )
}

export default ShareLink
