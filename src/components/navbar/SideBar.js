import React from 'react'
import SideBarMenu from './SideBarMenu'
import styled from 'styled-components'

const Sidebar = styled.div`
    position:absolute;
    background-color:#fff;
    z-index:10;
    height:90%;
    width:256px;
    border-right:1px solid #ddd;
    transform : ${props => props.open ? 'none' : 'translateX(-256px)'};
    transition : transform .3s;
    @media(max-width:1081px){
        transform : ${props => !props.open ? 'none' : 'translateX(-256px)'};
    }
`
function SideBar({open,navPos,handleOpen}) {
    return (
        <Sidebar open={open}>
            <SideBarMenu navPos={navPos} handleOpen={handleOpen} />
        </Sidebar>
    )
}

export default SideBar
