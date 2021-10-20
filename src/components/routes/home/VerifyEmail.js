import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSetMessage, useResetMessage } from '../../snackbar/MessageProvider'
import { useSnackbarHandleOpen } from '../../snackbar/SnackbarProvider'
import axios from 'axios'

function VerifyEmail() {

    const setMessage = useSetMessage()
    const resetMessage = useResetMessage()
    const handleOpen = useSnackbarHandleOpen()

    const history = useHistory()
    const { token } = useParams()

    React.useEffect(() => {
        verifyEmail()
    }, [])
    const verifyEmail = async () => {
        try {
            const response = await axios.get(`https://file-share-mern.herokuapp.com/auth/confirm/email/${token}`)
            console.log(response)
            if (response.status === 200) {
                resetMessage()
                setMessage({ msg: `${response.data.message}`, type: 'success' })
                handleOpen()
                history.push('/')
            }
        } catch (error) {
            resetMessage()
            setMessage({ msg: `${error.response.data.message}`, type: 'error' })
            handleOpen()
            history.push('/')
        }
    }
    return (
        <div>

        </div>
    )
}

export default VerifyEmail
