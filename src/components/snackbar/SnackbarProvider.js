import React, { useContext, useState } from 'react'

const SnackbarOpen = React.createContext()
const SnackbarHandleOpen = React.createContext()
const SnackbarHandleClose = React.createContext()

export const useSnackbarOpen = () => {
    return useContext(SnackbarOpen)
}

export const useSnackbarHandleOpen = () => {
    return useContext(SnackbarHandleOpen)
}

export const useSnackbarHandleClose = () => {
    return useContext(SnackbarHandleClose)
}

function SnackbarProvider({ children }) {

    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setOpen(false);
    }

    return (
        <SnackbarOpen.Provider value={open}>
            <SnackbarHandleOpen.Provider value={handleOpen}>
                <SnackbarHandleClose.Provider value={handleClose}>
                    {children}
                </SnackbarHandleClose.Provider>
            </SnackbarHandleOpen.Provider>
        </SnackbarOpen.Provider>
    )
}

export default SnackbarProvider
