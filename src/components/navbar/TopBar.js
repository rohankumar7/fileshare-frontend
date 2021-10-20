import React from 'react'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import ClearIcon from '@material-ui/icons/Clear'
import Avatar from '@material-ui/core/Avatar'
import { ReactComponent as Logo } from '../../assets/logo.svg'
import { useSelector } from 'react-redux'
import Tooltip from '@material-ui/core/Tooltip'

const TopBarConatiner = styled.div`
    position:relative;
    display: flex;
    flex-direction:row;
    justify-content:flex-start;
    align-items : center;
    width:100%;
    height :64px;
    border-bottom: 1px solid #ddd;
`
const LogoContainer = styled.div`
    display: flex;
    flex-direction:row;
    justify-content:flex-start;
    align-items : center;
`
const LogoText = styled.p`
    font-weight:500;
    font-size:22px;
    color:#777;
    margin: 0 8px;
`
const SearchContainer = styled.div`
    display: flex;
    flex-direction:row;
    justify-content:flex-start;
    align-items : center;
    position:relative;
    height:46px;
    width:720px;
    background-color:#eee;
    border-radius:5px;
    margin:0 0 0 42px;
    @media(max-width:1081px){
        display : none;
    }
`
const SearchInput = styled.input`
  height: 30px;
  font-size: 16px;
  padding:0px;
  box-sizing: border-box;
  color: #111;
  border-radius: 3px;
  border: none;
  background: #eee;
  width: 100%;
  font-weight: 400;
  outline: none;
  font-family:Quicksand;
`
const SearchContainerSmall = styled.div`
    display : none;
    position:absolute;
    z-index : 100;
    left:-28px;
    height:46px;
    width:96%;
    background-color:#fff;
    border-radius:5px;
    margin:0 0 0 42px;
    @media(max-width:1081px){
        display: ${props => props.search ? 'flex' : 'none'};
    flex-direction:row;
    justify-content:flex-start;
    align-items : center;
    }
`
const SearchInputSmall = styled.input`
  height: 30px;
  font-size: 16px;
  width:100%;
  padding:0px 8px;
  box-sizing: border-box;
  color: #111;
  border-radius: 3px;
  border: none;
  background: #fff;
  width: 100%;
  font-weight: 400;
  outline: none;
  font-family:Quicksand;
`
const AvatarContainer = styled.div`
    position: absolute;
    display:flex;
    align-items:center;
    right:24px;
`
const SearchDiv = styled.div`
    display : none;
    @media(max-width:1081px){
        display : block;
    }
`
function TopBar({ open, setOpen, searchOpen, setSearchOpen, search, setSearch, tabname }) {
    const user = useSelector(state => state.currentUser)
    return (
        <TopBarConatiner>
            <LogoContainer>
                <IconButton style={{ margin: '0 8px' }} onClick={() => setOpen(!open)}>
                    <MenuIcon />
                </IconButton>
                <Logo style={{ height: '42px', width: '42px' }} />
                <LogoText>Fileshare</LogoText>
            </LogoContainer>
            { tabname === 'Recent' ? '' : <><SearchContainer>
                <IconButton style={{ margin: '0 8px' }}>
                    <SearchIcon />
                </IconButton>
                <SearchInput placeholder='Search for File' value={search} onChange={(e) => setSearch(e.target.value)}/>
            </SearchContainer>
            <SearchContainerSmall search={searchOpen}>
                <SearchInputSmall type='text' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search for File' autoFocus />
                <IconButton onClick={() => setSearchOpen(false)} style={{ margin: '0 8px' }}>
                    <ClearIcon />
                </IconButton>
            </SearchContainerSmall></> }
            <AvatarContainer>
                <SearchDiv>
                    <IconButton onClick={() => setSearchOpen(true)} style={{ margin: '0 8px' }}>
                        <SearchIcon />
                    </IconButton>
                </SearchDiv>
                <Tooltip title={user.email} placement="bottom">
                    <Avatar style={{background:'#4286f4'}} alt={user.name.toUpperCase()} >{user.name[0].toUpperCase()}</Avatar>
                </Tooltip>
            </AvatarContainer>
        </TopBarConatiner>
    )
}

export default TopBar
