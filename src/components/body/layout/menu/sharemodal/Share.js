import React from 'react'
import styled from 'styled-components'
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined'
import CircularProgress from '@material-ui/core/CircularProgress'

import Avatar from '@material-ui/core/Avatar'
import axiosInstance from '../../../../../axios/axios'
import { useSelector } from 'react-redux'

import { useSetMessage, useResetMessage } from '../../../../snackbar/MessageProvider'
import { useSnackbarHandleOpen } from '../../../../snackbar/SnackbarProvider'

const RowFlex = styled.div`
    display : flex;
    justify-content:flex-start;
    flex-direction : row;
    align-items:center;
`
const ColFlex = styled.div`
    display : flex;
    justify-content:flex-start;
    flex-direction : column;
    align-items:flex-start;
    margin:0 0 0 16px;
`
const Head = styled.span`
    font-size:22px;
    font-weight:500;
    margin:0 0 0 16px;
`
const Space = styled.div`
    height:16px;
`
const OwnerName = styled.span`
    font-size:14px;
    font-weight:bold;
`
const OwnerEmail = styled.span`
    font-size:14px;
`
const CreateInput = styled.input`
  height: 40px;
  font-size: 14px;
  padding: 8px 12px;
  box-sizing: border-box;
  font-family:Quicksand;
  color: #172b4d;
  border-radius: 3px;
  border: 2px solid #dfe1e6;
  background: #fafbfc;
  width: 100%;
  font-weight: 500;
  outline: none;
  align-self: center;
  &:hover{
    background: #ebecf0;
  }
  &:focus {
    background: #fff;
    border: 2px solid #0079bf;
  }
`

export default function ShareModal({ file }) {

    const user = useSelector(state => state.currentUser)
    const [email, setEmail] = React.useState('')
    const [loader, setLoader] = React.useState(false)

    const setMessage = useSetMessage()
    const resetMessage = useResetMessage()
    const handleOpen = useSnackbarHandleOpen()

    const sendMail = async (e) => {
        setLoader(true)
        e.preventDefault()
        const data = {
            sender: user.email,
            receiver: email
        }
        if (email === '') {
            resetMessage()
            setMessage({ msg: 'email field is empty!', type: 'error' })
            handleOpen()
            setLoader(false)
            return
        }
        try {
            const response = await axiosInstance.post(`files/link-mail/${file._id}`, data)
            if (response.status === 200) {
                setLoader(false)
                resetMessage()
                setMessage({ msg: 'link shared through mail!', type: 'success' })
                handleOpen()
            }

        } catch (error) {
            setLoader(false)
            resetMessage()
            setMessage({ msg: `${error.response.data.message}`, type: 'error' })
            handleOpen()
        }

    }

    return (
        <div>
            <RowFlex>
                <Avatar style={{ backgroundColor: '#4286f4', height: '36px', width: '35px' }}>
                    <PersonAddOutlinedIcon style={{ fontSize: '20px' }} />
                </Avatar>
                <Head>Share link with people</Head>
            </RowFlex>
            <Space />
            <div style={{ position: 'relative' }}>
                <CreateInput onBlur={sendMail} type='text' value={email} onChange={e => setEmail(e.target.value)} placeholder='Enter email to share' disabled={file.shared === true ? true : false} />
                <div style={{ position: 'absolute', top: '9px', right: '9px' }}>{loader && <CircularProgress color='primary' style={{ height: '22px', width: '22px' }} />}</div>
            </div>
            <Space />
            <RowFlex>
                <Avatar style={{ width: '35px', height: '35px' }} />
                <ColFlex>
                    <OwnerName>{`${file.owner.name} (${file.owner.email === user.email ? 'you' : 'owner'})`}</OwnerName>
                    <OwnerEmail>{file.owner.email}</OwnerEmail>
                </ColFlex>
            </RowFlex>
            <Space />
        </div>
    );
}