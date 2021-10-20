import React from 'react'
import styled from 'styled-components'
import ViewListOutlinedIcon from '@material-ui/icons/ViewListOutlined'
import ViewModuleOutlinedIcon from '@material-ui/icons/ViewModuleOutlined'
import IconButton from '@material-ui/core/IconButton'

const Top = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    height:48px;
    border-bottom:1px solid #ddd;
`
const TabName = styled.span`
    font-size:14px;
    font-weight:500;
    float:left;
    margin-left:16px;
`

function BodyTop({ tabname, listOpen, setListOpen }) {
    return (
        <Top>
            <TabName>{tabname}</TabName>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {listOpen ?
                    <IconButton onClick={() => setListOpen(false)} size='medium' style={{ margin: '0 16px 0 0' }}>
                        <ViewModuleOutlinedIcon style={{ fontSize: '24px' }} />
                    </IconButton>
                    :
                    <IconButton onClick={() => setListOpen(true)} size='medium' style={{ margin: '0 16px 0 0' }}>
                        <ViewListOutlinedIcon style={{ fontSize: '24px' }} />
                    </IconButton>}
            </div>
        </Top>
    )
}

export default BodyTop
