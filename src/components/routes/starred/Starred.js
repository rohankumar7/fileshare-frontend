import React from 'react'
import styled from 'styled-components'
import BodyTop from '../../body/BodyTop'
import ListLayout from '../../body/layout/ListLayout'
import CardLayout from '../../body/layout/CardLayout'
import UploadModal from '../../body/uploadmodal/UploadModal'
import SideBar from '../../navbar/SideBar'
import TopBar from '../../navbar/TopBar'
import { useSelector } from 'react-redux'

const MyFilesContainer = styled.div`
    height: 100vh; 
    position: relative;
`
const Body = styled.div`
    height:90vh;
    position:relative;
    overflow:auto;
    margin-left : ${props => props.open ? '256px' : '0px'};
    transition : margin 0.3s;
    @media(max-width:1081px){
        margin-left : 0;
    }
`
function Starred() {

    const files = useSelector(state => state.myFiles).filter(file => file.starred === true)
    const fileOrder = useSelector(state => state.currentUser.files)

    const [open, setOpen] = React.useState(true)
    const [listOpen, setListOpen] = React.useState(false)
    const [modalOpen, setModalOpen] = React.useState(false)
    const [searchOpen, setSearchOpen] = React.useState(false)

    const [search, setSearch] = React.useState('')

    let computedFiles = files

    if (search) {
        computedFiles = computedFiles.filter(
            file => file.filename.toLowerCase().includes(search.toLowerCase())
        )
    }


    const handleModalOpen = () => {
        setModalOpen(true)
    }
    const handleModalClose = () => {
        setModalOpen(false)
    }


    return (
        <MyFilesContainer>
            <TopBar open={open} setOpen={setOpen} searchOpen={searchOpen} setSearchOpen={setSearchOpen} search={search} setSearch={setSearch} />
            <SideBar open={open} navPos={3} handleOpen={handleModalOpen} />
            <Body open={open}>
                <UploadModal open={modalOpen} handleClose={handleModalClose} />
                <BodyTop tabname={'Starred'}
                    listOpen={listOpen}
                    setListOpen={setListOpen}
                />
                {
                    listOpen ? <ListLayout files={computedFiles} fileOrder={fileOrder} /> : <CardLayout files={computedFiles} fileOrder={fileOrder} />
                }
            </Body>
        </MyFilesContainer>
    )
}

export default Starred
