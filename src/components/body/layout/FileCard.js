import React from 'react'

import { ReactComponent as CodeExt } from '../../../assets/file_ext/code_ext.svg'
import { ReactComponent as PdfExt } from '../../../assets/file_ext/pdf_ext.svg'
import { ReactComponent as PptExt } from '../../../assets/file_ext/ppt_ext.svg'
import { ReactComponent as TxtExt } from '../../../assets/file_ext/txt_ext.svg'
import { ReactComponent as DocExt } from '../../../assets/file_ext/doc_ext.svg'
import { ReactComponent as ImgExt } from '../../../assets/file_ext/image_ext.svg'
import SpreadSheetExt from '../../../assets/file_ext/spread_sheet_ext.png'

import CodeSkeleton from '../../../assets/file_format_skeleton/code.png'
import PdfSkeleton from '../../../assets/file_format_skeleton/pdf.png'
import PptSkeleton from '../../../assets/file_format_skeleton/ppt.png'
import SpreadSheetSkeleton from '../../../assets/file_format_skeleton/spreadsheet.png'
import TxtSkeleton from '../../../assets/file_format_skeleton/txt.png'
import DocSkeleton from '../../../assets/file_format_skeleton/doc.png'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import HelpOutlineRoundedIcon from '@material-ui/icons/HelpOutlineRounded'
import Tooltip from '@material-ui/core/Tooltip'
import styled from 'styled-components'
import Menu from './menu/Menu'
import FileDetailsModal from './FileDetailsModal'

const Container = styled.div`
    max-width : 250px;
    min-width : 250px;
    position:relative;
    min-height:190px;
    margin : 8px;
    @media(max-width:552px){
        width:170px;
    }
`
const ImageContainer = styled.div`
    padding : 12px 12px 0 12px;
    background : #f8f8f8;
`
const ImageFileContainer = styled.div`
    padding : 0;
    min-height:150px;
    max-height:150px;
    overflow:hidden;
    @media(max-width:552px){
        min-height:102px;
        max-height:102px;
    }
`
const ImageFile = styled.img`
    width : 100%;
`
const Image = styled.img`
    width : 100%;
    border : 1px solid rgba(0,0,0,0.2);
    border-radius : 3px;
    box-shadow : 0 0 8px 1px rgba(0,0,0,0.2);
`
const DetailContainer = styled.div`
    height: 40px;
    width: 100%;
    display: flex;
    justify-content:space-between;
    align-items: center; 
    padding: 0px 10px;
`
const RowFlex = styled.div`
    display :flex;
    flex-direction:row;
    justify-content:flex-start;
    align-items:center;
`
const FileName = styled.p`
    margin: 0 0 0 16px; 
    font-size: 14px; 
    font-weight: 500; 
    color:#71909a; 
    white-space: nowrap; 
    overflow: hidden; 
    width: 150px; 
    text-overflow: ellipsis;
    @media(max-width:552px){
        width:90px;
    }
`
const Details = styled.span`
    position:absolute;
    top:6px;
    right:6px;
    height: 30px;
    width:30px;
    border-radius: 50%;
    display:none;
    background-color:rgba(255,255,255,0.8);
    ${Container}:hover & {
        display:flex;
        justify-content:center;
        align-items:center;
        cursor:pointer;
    }
`
function FileCard({ file }) {
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

    return (
        <Container>
            <Details>
                <HelpOutlineRoundedIcon style={{ color: '#71909a' }} onClick={handleModalOpen} />
                <FileDetailsModal open={modalOpen} handleClose={handleModalClose} file={file}/>
            </Details>
            <Card variant='outlined'>
                <CardContent style={{ padding: '0px' }}>
                    {['jpg', 'png', 'jpeg', 'svg'].includes(file.type.toLowerCase()) ? <ImageFileContainer><ImageFile draggable='false' src={`https://file-share-mern.herokuapp.com/${file.path}`} /></ImageFileContainer> :
                        <ImageContainer>
                            {['csv', 'xlsx'].includes(file.type.toLowerCase()) ? <Image draggable='false' src={SpreadSheetSkeleton} /> : ''}
                            {['word', 'doc', 'docx'].includes(file.type.toLowerCase()) ? <Image draggable='false' src={DocSkeleton} /> : ''}
                            {['pdf'].includes(file.type.toLowerCase()) ? <Image draggable='false' src={PdfSkeleton} /> : ''}
                            {['ppt', 'pptx',].includes(file.type.toLowerCase()) ? <Image draggable='false' src={PptSkeleton} /> : ''}
                            {['txt'].includes(file.type.toLowerCase()) ? <Image draggable='false' src={TxtSkeleton} /> : ''}
                            {['js', 'sql', 'java', 'c', 'cpp', 'html', 'css'].includes(file.type.toLowerCase()) ? <Image draggable='false' src={CodeSkeleton} /> : ''}
                        </ImageContainer>}
                    <DetailContainer>
                        <RowFlex>
                            {['jpg', 'png', 'jpeg','svg'].includes(file.type.toLowerCase()) ? <ImgExt fill='#d93125' style={{ width: '26px', height: '26px' }} /> : ''}
                            {['csv', 'xlsx'].includes(file.type.toLowerCase()) ? <img alt='' src={SpreadSheetExt} style={{ width: '26px', height: '26px' }} /> : ''}
                            {['word', 'doc', 'docx'].includes(file.type.toLowerCase()) ? <DocExt fill='#1c579f' style={{ width: '26px', height: '26px' }} /> : ''}
                            {['pdf'].includes(file.type.toLowerCase()) ? <PdfExt fill='#ff0f17' style={{ width: '26px', height: '26px' }} /> : ''}
                            {['ppt', 'pptx',].includes(file.type.toLowerCase()) ? <PptExt fill='#e2360b' style={{ width: '26px', height: '26px' }} /> : ''}
                            {['txt'].includes(file.type.toLowerCase()) ? <TxtExt fill='#5d6268' style={{ width: '26px', height: '26px' }} /> : ''}
                            {['js', 'sql', 'java', 'c', 'cpp', 'html', 'css'].includes(file.type.toLowerCase()) ? <CodeExt fill='#f2d600' style={{ width: '26px', height: '26px' }} /> : ''}
                            <Tooltip title={file.filename} placement="bottom">
                                <FileName>{file.filename}</FileName>
                            </Tooltip>
                        </RowFlex>
                        <MoreVertIcon onClick={handleClick} style={{ margin: '0 10px 0 0', color: '#71909a', cursor: 'pointer' }} />
                    </DetailContainer>
                    <Menu anchorEl={anchorEl} handleClose={handleClose} file={file}></Menu>
                </CardContent>
            </Card>
        </Container>
    )
}

export default FileCard
