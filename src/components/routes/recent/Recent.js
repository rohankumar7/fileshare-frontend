import React from 'react'
import styled from 'styled-components'
import SideBar from '../../navbar/SideBar'
import TopBar from '../../navbar/TopBar'
import BodyTop from '../../body/BodyTop'
import RecentListLayout from '../../body/layout/RecentListLayout'
import RecentCardLayout from '../../body/layout/RecentCardLayout'
import UploadModal from '../../body/uploadmodal/UploadModal'
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
function Recent() {
    const files = useSelector(state => state.myFiles)

    const [open, setOpen] = React.useState(true)
    const [searchOpen, setSearchOpen] = React.useState(false)
    const [listOpen, setListOpen] = React.useState(false)
    const [modalOpen, setModalOpen] = React.useState(false)


    const handleModalOpen = () => {
        setModalOpen(true)
    }
    const handleModalClose = () => {
        setModalOpen(false)
    }

    const date = new Date()

    const todayFileOrder = files.filter(file => {
        const createdAt = new Date(`${file.createdAt}`)
        if ((createdAt.getDate() - date.getDate()) === 0) {
            return true
        }
        return false
    }).map(file => file._id)

    const yesterdayFileOrder = files.filter(file => {
        const createdAt = new Date(`${file.createdAt}`)
        if ((createdAt.getDate() - date.getDate()) === -1) {
            return true
        }
        return false
    }).map(file => file._id)

    const weekFileOrder = files.filter(file => {
        const createdAt = new Date(`${file.createdAt}`)
        if ((createdAt.getDate() - date.getDate()) >= -7 && (createdAt.getDate() - date.getDate()) <= -2) {
            return true
        }
        return false
    }).map(file => file._id)

    return (
        <MyFilesContainer>
            <TopBar open={open} setOpen={setOpen} tabname={'Recent'} searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
            <SideBar open={open} navPos={2} handleOpen={handleModalOpen} />
            <Body open={open}>
                <UploadModal open={modalOpen} handleClose={handleModalClose} />
                <BodyTop tabname={'Recent'} listOpen={listOpen} setListOpen={setListOpen} />
                {
                    listOpen ? <RecentListLayout
                        files={files}
                        todayFileOrder={todayFileOrder}
                        yesterdayFileOrder={yesterdayFileOrder}
                        weekFileOrder={weekFileOrder}
                    /> : <RecentCardLayout
                            files={files}
                            todayFileOrder={todayFileOrder}
                            yesterdayFileOrder={yesterdayFileOrder}
                            weekFileOrder={weekFileOrder} />
                }
            </Body>
        </MyFilesContainer>
    )
}

export default Recent
