import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { useSnackbarOpen, useSnackbarHandleClose } from './SnackbarProvider'
import { useMessage } from './MessageProvider'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CustomizedSnackbar() {

    const open = useSnackbarOpen()
    const handleClose = useSnackbarHandleClose()
    const message = useMessage()

    return (
        <div>
            <Snackbar anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }} open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={message.type}>
                    {message.msg}
                </Alert>
            </Snackbar>
        </div>
    );
}
