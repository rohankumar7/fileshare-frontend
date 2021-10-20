import React from 'react'
import styled from 'styled-components'
import { ReactComponent as CodeExt } from '../../../assets/file_ext/code_ext.svg'
import { ReactComponent as PdfExt } from '../../../assets/file_ext/pdf_ext.svg'
import { ReactComponent as PptExt } from '../../../assets/file_ext/ppt_ext.svg'
import { ReactComponent as TxtExt } from '../../../assets/file_ext/txt_ext.svg'
import { ReactComponent as DocExt } from '../../../assets/file_ext/doc_ext.svg'
import { ReactComponent as ImgExt } from '../../../assets/file_ext/image_ext.svg'
import SpreadSheetExt from '../../../assets/file_ext/spread_sheet_ext.png'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { IconButton } from '@material-ui/core'
import Menu from './menu/Menu'
import FileDetailsModal from './FileDetailsModal'
import { useSelector } from 'react-redux'

const FileName = styled.p`
    font-size : 13px;
    color:#333;
    font-weight : bold;
    cursor:pointer;
    width:300px;
    overflow: hidden;
    white-space: nowrap;  
    text-overflow: ellipsis;
`
const CreatedAt = styled.div`
    @media(max-width:1081px){
        display: none;
    }
`
const Owner = styled.div`
    @media(max-width:1081px){
        display: none;
    }
`
const Size = styled.div`
    @media(max-width:1081px){
        display: none;
    }
`
function FileList({ file }) {

    const user = useSelector(state => state.currentUser)
    const [createdAt, setCreatedAt] = React.useState('')
    const [filesize, setFileSize] = React.useState('')
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [modalOpen, setModalOpen] = React.useState(false)
    const handleModalOpen = () => {
        setModalOpen(true);
    }
    const handleModalClose = () => {
        setModalOpen(false);
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }
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
        const date = new Date(file.createdAt)
        const day = date.getDate()
        const monthNum = date.getMonth()
        const year = date.getFullYear()
        setCreatedAt(`${day} ${month[monthNum]}, ${year}`)
        let fileSize = file.size / 1024
        if (fileSize >= 1000) {
            fileSize = fileSize / 1024
            setFileSize(`${fileSize.toFixed(2)} MB`)
        } else {
            setFileSize(`${fileSize.toFixed(2)} KB`)
        }
    }, [file])
    return (
        <tr style={{borderBottom:'1px solid #ddd'}}>
            <td>
                {['jpg', 'png', 'jpeg','svg'].includes(file.type.toLowerCase()) ? <ImgExt fill='#d93125' style={{ width: '20px', height: '20px' }} /> : ''}
                {['csv', 'xlsx'].includes(file.type.toLowerCase()) ? <img alt='' src={SpreadSheetExt} style={{ width: '20px', height: '20px' }} /> : ''}
                {['word', 'doc', 'docx'].includes(file.type.toLowerCase()) ? <DocExt fill='#1c579f' style={{ width: '20px', height: '20px' }} /> : ''}
                {['pdf'].includes(file.type.toLowerCase()) ? <PdfExt fill='#ff0f17' style={{ width: '20px', height: '20px' }} /> : ''}
                {['ppt', 'pptx',].includes(file.type.toLowerCase()) ? <PptExt fill='#e2360b' style={{ width: '20px', height: '20px' }} /> : ''}
                {['txt'].includes(file.type.toLowerCase()) ? <TxtExt fill='#5d6268' style={{ width: '20px', height: '20px' }} /> : ''}
                {['js', 'sql', 'java', 'c', 'cpp', 'html', 'css'].includes(file.type.toLowerCase()) ? <CodeExt fill='#f2d600' style={{ width: '20px', height: '20px' }} /> : ''}
            </td>
            <td><FileName onClick={handleModalOpen}>{file.filename}</FileName></td>
            <FileDetailsModal open={modalOpen} handleClose={handleModalClose} file={file}/>
            <td><CreatedAt>{createdAt}</CreatedAt></td>
            <td><Owner>{file.owner.email === user.email ? 'me' : file.owner.name}</Owner></td>
            <td><Size>{`${filesize}`}</Size></td>
            <td>
                <IconButton onClick={handleClick} style={{float:'right'}}>
                    <MoreVertIcon />
                </IconButton>
                <Menu anchorEl={anchorEl} handleClose={handleClose} file={file}></Menu>
            </td>
        </tr>
    )
}

export default FileList
