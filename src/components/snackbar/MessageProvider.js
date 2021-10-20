import React, { useContext, useState } from 'react'

const Message = React.createContext()
const SetMessage = React.createContext()
const ResetMessage = React.createContext()

export const useMessage = () => {
    return useContext(Message)
}

export const useSetMessage = () => {
    return useContext(SetMessage)
}

export const useResetMessage = () => {
    return useContext(ResetMessage)
}

const MessageProvider = ({ children }) => {

    const [message, setMsg] = useState({ msg: '', type: '' })

    const handleMessage = (obj) => {
        setMsg(obj)
    }

    const resetMessage = () => {
        setMsg({ msg: '', type: '' })
    }

    return (
        <Message.Provider value={message}>
            <SetMessage.Provider value={handleMessage}>
                <ResetMessage.Provider value={resetMessage}>
                    {children}
                </ResetMessage.Provider>
            </SetMessage.Provider>
        </Message.Provider>
    )
}

export default MessageProvider
