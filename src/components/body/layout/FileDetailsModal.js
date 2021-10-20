import React from "react"
import Dialog from "@material-ui/core/Dialog"
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent"
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import LinkIcon from '@material-ui/icons/Link'
import ClearIcon from '@material-ui/icons/Clear'
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import { ReactComponent as CodeExt } from '../../../assets/file_ext/code_ext.svg'
import { ReactComponent as PdfExt } from '../../../assets/file_ext/pdf_ext.svg'
import { ReactComponent as PptExt } from '../../../assets/file_ext/ppt_ext.svg'
import { ReactComponent as TxtExt } from '../../../assets/file_ext/txt_ext.svg'
import { ReactComponent as DocExt } from '../../../assets/file_ext/doc_ext.svg'
import { ReactComponent as ImgExt } from '../../../assets/file_ext/image_ext.svg'
import SpreadSheetExt from '../../../assets/file_ext/spread_sheet_ext.png'
import Tooltip from '@material-ui/core/Tooltip'
import { useDispatch, useSelector } from 'react-redux'
import { descFileAction } from '../../../redux/actions/files'
import { useSetMessage, useResetMessage } from '../../snackbar/MessageProvider'
import { useSnackbarHandleOpen } from '../../snackbar/SnackbarProvider'

const Shared = styled.div`
    display : flex;
    align-items:center;
    justify-content : flex-start;
    margin:0 0 8px 0;
`
const Value = styled.span`
    font-size:13px;
    font-weight : 500;
    color:'#333';
    margin:0 0 0 60px;
`
const Property = styled.span`
    font-size:14px;
    font-weight : 400;
`
const FileName = styled.div`
    display:flex;
    align-items:center;
    justify-content:flex-start;
    font-size:22px;
    line-height:24px;
    font-weight:500;
    color:#111;
    margin:0 0 24px 0;
`
const Desc = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
`
const Img = styled.img`
    width:100%;
    border-radius:3px;
`
const ImgContainer = styled.div`
    max-height:150px;
    display:flex;
    align-items:center;
    min-height:150px;
    overflow : hidden;
    border-radius:3px;
    margin : -8px 0 16px 0;
`
const textareaStyle = {
    fontSize: '13px',
    fontFamily: 'roboto',
    background: '#fff',
    lineHeight: '20px',
    padding: '6px 12px',
    fontWeight: '400',
    color: '#172b4d',
    display: 'block',
    whiteSpace: 'pre-wrap',
    width: '92%',
    border: '2px solid #0079bf',
    outline: 'none',
    resize: 'none',
    borderRadius: '3px',
    margin: '0 0 16px 0',
    '&::placeholder': {
        fontFamily: 'roboto',
        fontSize: '14px',
        letterSpacing: 'normal',
        fontWeight: '400',
        color: '#5e6c84',
    }
}
const Description = styled.div`
    color : #333;
    font-size : 14px;
    line-height : 20px;
    word-break : break-all;
    white-space : pre-wrap;

`
export default function FileDetailsModal({ open, handleClose, file }) {

    const dispatch = useDispatch()
    const user = useSelector(state => state.currentUser)
    const [createdAt, setCreatedAt] = React.useState('')
    const [filesize, setFileSize] = React.useState('')
    const [modified, setModified] = React.useState('')
    const [descOpen, setDescOpen] = React.useState(false)
    const [desc, setDesc] = React.useState(file.description)

    const setMessage = useSetMessage()
    const resetMessage = useResetMessage()
    const handleOpen = useSnackbarHandleOpen()

    React.useEffect(() => {
        const month = {
            0: 'Jan',
            1: 'Feb',
            2: 'Mar',
            3: 'Apr',
            4: 'May',
            5: 'Jun',
            6: 'Jul',
            7: 'Aug',
            8: 'Sept',
            9: 'Oct',
            10: 'Nov',
            11: 'Dec'
        }
        let date = new Date(file.createdAt)
        let day = date.getDate()
        let monthNum = date.getMonth()
        let year = date.getFullYear()
        setCreatedAt(`${day} ${month[monthNum]}, ${year}`)
        date = new Date(file.updatedAt)
        day = date.getDate()
        monthNum = date.getMonth()
        year = date.getFullYear()
        setModified(`${day} ${month[monthNum]}, ${year}`)
        const fileinBytes = file.size
        let fileSize = fileinBytes / 1024
        if (fileSize >= 1000) {
            fileSize = fileSize / 1024
            setFileSize(`${fileSize.toFixed(2)} MB`)
        } else {
            setFileSize(`${fileSize.toFixed(2)} KB`)
        }
    }, [file])

    const fileDescription = async () => {
        if (desc === '') {
            setDesc(file.description)
            setDescOpen(false)
            return
        }
        if (desc === file.description) {
            setDesc(file.description)
            setDescOpen(false)
            return
        }
        try {
            const res = await dispatch(descFileAction(file._id, desc))
            resetMessage()
            setMessage({ msg: `${res}`, type: 'success' })
            handleOpen()
            setDescOpen(false)

        } catch (error) {
            resetMessage()
            setMessage({ msg: `${error.response.data.message}`, type: 'error' })
            handleOpen()
        }
    }

    return (
        <Dialog
            open={open}
            scroll='body'
            onClose={handleClose}
            hideBackdrop={true}
        >
            <DialogContent style={{ minWidth: '320px', maxWidth: '320px' }}>
                <FileName>
                    <div style={{ margin: '0 16px 0 0' }}>
                        {['jpg', 'png', 'jpeg'].includes(file.type.toLowerCase()) ? <ImgExt fill='#d93125' style={{ width: '25px', height: '25px' }} /> : ''}
                        {['csv', 'xlsx'].includes(file.type.toLowerCase()) ? <img alt='' src={SpreadSheetExt} style={{ width: '25px', height: '25px' }} /> : ''}
                        {['word', 'doc', 'docx'].includes(file.type.toLowerCase()) ? <DocExt fill='#1c579f' style={{ width: '25px', height: '25px' }} /> : ''}
                        {['pdf'].includes(file.type.toLowerCase()) ? <PdfExt fill='#ff0f17' style={{ width: '25px', height: '25px' }} /> : ''}
                        {['ppt', 'pptx',].includes(file.type.toLowerCase()) ? <PptExt fill='#e2360b' style={{ width: '25px', height: '25px' }} /> : ''}
                        {['txt'].includes(file.type.toLowerCase()) ? <TxtExt fill='#5d6268' style={{ width: '25px', height: '25px' }} /> : ''}
                        {['js', 'sql', 'java', 'c', 'cpp', 'html', 'css'].includes(file.type.toLowerCase()) ? <CodeExt fill='#f2d600' style={{ width: '25px', height: '25px' }} /> : ''}
                    </div>
                    <span style={{ wordBreak: 'break-all' }}>{file.filename}</span>
                </FileName>
                {['jpg', 'png', 'jpeg', 'svg'].includes(file.type.toLowerCase()) ? <ImgContainer><Img draggable='false' alt='' src={`https://file-share-mern.herokuapp.com/${file.path}`} /></ImgContainer> : ''}
                {file.access === 'Restricted' ? <Shared>
                    <Avatar style={{ height: '30px', width: '30px' }}>
                        <LockOutlinedIcon fontSize='small' />
                    </Avatar>
                    <p style={{ margin: '0 0 0 8px', fontSize: '13px', color: '#333', fontWeight: '500' }}>Not shared</p>
                </Shared> :
                    <Shared>
                        <Tooltip title={`${file.owner.name} is the owner`} placement='bottom'>
                            <Avatar style={{ height: '30px', width: '30px', background: '#4286f4' }} alt={file.owner.name}>
                            </Avatar>
                        </Tooltip>
                        <div style={{ height: '20px', width: '1px', background: '#999', margin: '0 8px' }}></div>
                        <Tooltip title='Anyone on the Internet with this link can view' placement='bottom'>
                            <Avatar style={{ height: '30px', width: '30px', background: '#06ac0c' }}>
                                <LinkIcon fontSize='small' />
                            </Avatar>
                        </Tooltip>
                    </Shared>}
                <table width='100%'>
                    <tbody>
                        <tr style={{ height: '30px' }}>
                            <td><Property>Type</Property></td>
                            <td><Value>{file.type}</Value></td>
                        </tr>
                        <tr style={{ height: '30px' }}>
                            <td><Property>Size</Property></td>
                            <td><Value>{`${filesize} (${file.size} bytes)`}</Value></td>
                        </tr>
                        <tr style={{ height: '30px' }}>
                            <td><Property>Owner</Property></td>
                            <td><Value>{`${file.owner.name} (${file.owner.email === user.email ? 'you' : 'owner'})`}</Value></td>
                        </tr>
                        <tr style={{ height: '30px' }}>
                            <td><Property>Modified</Property></td>
                            <td><Value>{modified}</Value></td>
                        </tr>
                        <tr style={{ height: '30px' }}>
                            <td><Property>Created</Property></td>
                            <td><Value>{createdAt}</Value></td>
                        </tr>
                    </tbody>
                </table>
                {!descOpen && <Desc>
                    <Property>Description</Property>
                    <div>{!file.shared &&
                        <IconButton onClick={() => setDescOpen(true)}>
                            <CreateOutlinedIcon />
                        </IconButton>
                    }</div>
                </Desc>}
                {descOpen &&
                    <div>
                        <Desc>
                            <Property>Description</Property>
                            <IconButton onClick={() => setDescOpen(true)}>
                                <ClearIcon />
                            </IconButton>
                        </Desc>
                        <TextareaAutosize
                            rows={3}
                            value={desc}
                            style={textareaStyle}
                            onChange={(e) => setDesc(e.target.value)}
                            autoFocus
                            onBlur={() => fileDescription()}
                        />
                    </div>}
                {!descOpen && <Description>{file.description}</Description>}
                <Button size='small' variant='contained' style={{ float: 'right', backgroundColor: '#4286f4', margin: '8px 0 16px 0' }} onClick={handleClose} color="primary" autoFocus>
                    Close
                </Button>
            </DialogContent>
        </Dialog>
    );
}
