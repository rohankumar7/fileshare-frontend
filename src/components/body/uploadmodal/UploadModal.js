import React from 'react'
import styled from 'styled-components'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import filesvg from '../../../assets/file.svg'
import './uploadModal.css'
import { useDispatch } from 'react-redux'
import axiosInstance from '../../../axios/axios'
import { useSnackbarHandleOpen } from '../../snackbar/SnackbarProvider'
import { useSetMessage, useResetMessage } from '../../snackbar/MessageProvider'

const DropZone = styled.div`
    height:250px;
    min-height:250px;
    border:2px dashed #ddd;
    border-radius:3px;
    margin:8px 0 24px 0;
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    transition: 0.2s all ease-in;
    background-color:#fff;
`
const IconContainer = styled.div`
    position : relative;
    width:75px;
    height:100px;
`
const Image = styled.img`
    width: 75px;
    position: absolute;
    transition: transform 0.25s ease-in-out;
    transform-origin: bottom;
`
const FileInput = styled.input`
    display:none;
`
const Title = styled.div`
    font-size:large;
    font-weight:500;
    color:#666;
`
const SpanBtn = styled.span`
    color: #2196f3;
    cursor: pointer;
`
const RowFlex = styled.div`
display: ${props => props.open ? 'flex' : 'none'};
width:100%;
flex-direction: row; 
justify-content: flex-start;
align-items:center;
margin:24px 0 16px 0;
`
const ProgressBar = styled.div`
height:8px;
width:${props => props.percent};
border-radius:9px;
background:${props => props.percent === '100%' ? '#61bd4f' : '#0079bf'};
transition:.2s ease-in-out;
`
const OuterProgress = styled.div`
height:auto;
width:100%;
border-radius:9px;
background:#e0e3e8;
`
const Percent = styled.div`
font-size:13px;
min-width:32px;
max-width:auto;
color:#71909a;
margin:0 8px 0 0;
text-align:center;
`

function UploadModal({ open, handleClose }) {

    const handleOpen = useSnackbarHandleOpen()
    const resetMessage = useResetMessage()
    const setMessage = useSetMessage()

    const dispatch = useDispatch()
    const inputRef = React.useRef(null)
    const [dragging, setDragging] = React.useState(false)
    const [percent, setPercent] = React.useState(0);
    const [openProgress, setOpenProgress] = React.useState(false)

    const openFileBrowser = () => {
        const input = inputRef.current
        input.click()
    }
    const inputFile = () => {
        uploadFile(inputRef.current.files[0])
    }
    const uploadFile = async (file) => {
        const formData = new FormData()
        formData.append('file', file)
        try {
            setOpenProgress(true)
            const res = await axiosInstance.post('/files/upload', formData, {
                headers: {
                    'Content-Type': `multipart/form-data`,
                },
                onUploadProgress: ProgressEvent => {
                    setPercent(parseInt(
                        Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
                    ))
                }
            })
            dispatch({
                type : 'ADD_FILE',
                payload : { newFile : res.data, fileID : res.data._id }
            })
            setPercent(0)
            resetMessage()
            setMessage({msg : 'file uploaded!', type : 'success'})
            handleOpen()
            setOpenProgress(false)
        } catch (error) {
            console.log(error.message)
        }
    }
    const handleDragLeave = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragging(false)
    }
    const handleDragOver = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragging(true)
    }
    const handleDrop = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragging(false)
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            uploadFile(e.dataTransfer.files[0])
        }
    }
    return (
        <Dialog
            open={open}
            maxWidth='sm'
            fullWidth={true}
            scroll='body'
            onClose={handleClose}
            hideBackdrop={true}
        >
            <DialogContent>
                <DropZone
                    onDrop={e => handleDrop(e)}
                    onDragOver={e => handleDragOver(e)}
                    onDragLeave={e => handleDragLeave(e)}
                    className={dragging ? 'dropzone dragged' : ''}>
                    <IconContainer>
                        <Image src={filesvg} draggable="false" className="center" alt="File Icon" />
                        <Image src={filesvg} draggable="false" className="left" alt="File Icon" />
                        <Image src={filesvg} draggable="false" className="right" alt="File Icon" />
                    </IconContainer>
                    <FileInput ref={inputRef} type="file" onChange={inputFile} />
                    <Title>Drop your File here or, <SpanBtn onClick={openFileBrowser}>browse</SpanBtn></Title>
                </DropZone>
                <RowFlex open={openProgress}>
                    <Percent percent={percent}>{`${percent}%`}</Percent>
                    <OuterProgress>
                        <ProgressBar percent={`${percent}%`}></ProgressBar>
                    </OuterProgress>
                </RowFlex>
            </DialogContent>
        </Dialog>
    )
}

export default UploadModal
