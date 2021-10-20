import React from 'react'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import LinkIcon from '@material-ui/icons/Link'
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined'
import Avatar from '@material-ui/core/Avatar'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import CircularProgress from '@material-ui/core/CircularProgress'

import { useDispatch } from 'react-redux'
import { changeAccessAction } from '../../../../../redux/actions/files'

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
const Info = styled.span`
    font-size:15px;
    margin:-4px 0 0 0;
`
const LinkBox = styled.input`
    height:30px;
    width:80%;
    margin:0 8px 0 0;
    border:none;
    font-size:15px;
    font-weight:500;
    font-family:Quicksand;
    outline:none;
    border-radius:3px;
    background-color:#f1f3f4;
    padding:4px 12px;
    color:#777;
`
const Space = styled.div`
    height:16px;
`

export default function Link({ file }) {

    const dispatch = useDispatch()
    const textRef = React.useRef(null)
    const [loader, setLoader] = React.useState(false)


    const setMessage = useSetMessage()
    const resetMessage = useResetMessage()
    const handleOpen = useSnackbarHandleOpen()


    const setAccess = async (e) => {
        setLoader(true)
        try {
            const res = await dispatch(changeAccessAction(file._id, e.target.value))
            setLoader(false)
            resetMessage()
            setMessage({ msg: `${res}`, type: 'success' })
            handleOpen()
        } catch (error) {
            setLoader(false)
            resetMessage()
            setMessage({ msg: `${error.message}`, type: 'error' })
            handleOpen()
        }
    }
    function copyToClipboard(e) {
        textRef.current.select();
        document.execCommand('copy');
        e.target.focus();
        resetMessage()
        setMessage({ msg: `copied to clipboard!`, type: 'info' })
        handleOpen()
    };
    return (
        <div>
            <Space />
            <RowFlex>
                <Avatar style={{ backgroundColor: '#4286f4', height: '36px', width: '35px' }}>
                    <LinkIcon />
                </Avatar>
                <Head>Get link</Head>
            </RowFlex>
            <Space />
            <RowFlex>
                <LinkBox ref={textRef} value={`http://localhost:3000/${file._id}/share`} readOnly={true} />
                <Button onClick={copyToClipboard} size='small' variant='text' style={{ color: '#4286f4',fontSize:'12px' }}>Copy link</Button>
            </RowFlex>
            <Space />
            <RowFlex>
                <Avatar style={{ backgroundColor: '#e8eaed', height: '36px', width: '35px' }}>
                    <PeopleAltOutlinedIcon style={{ color: '#777' }} />
                </Avatar>
                <ColFlex>
                    <RowFlex>
                        <Select
                            value={file.access}
                            disabled={file.shared === true ? true : false}
                            style={{ borderRadius: '3px', fontSize: '14px', fontWeight: '500' }}
                            onChange={(e) => { setAccess(e) }}
                            disableUnderline
                        >
                            <MenuItem value={'Restricted'}>Restricted</MenuItem>
                            <MenuItem value={'Anyone with the link'}>Anyone with the link</MenuItem>
                        </Select>
                        {loader && <CircularProgress color='primary' style={{ height: '22px', width: '22px',margin:'0 8px' }} />}
                    </RowFlex>
                    <Info>{file.access === 'Restricted' ? 'Only people added can open with this link' : 'Anyone on the Internet with this link can view'}</Info>
                </ColFlex>
            </RowFlex>
        </div>
    );
}