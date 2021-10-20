import React from 'react'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import StarOutlineOutlinedIcon from '@material-ui/icons/StarOutlineOutlined'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined'
import PeopleOutlinedIcon from '@material-ui/icons/PeopleOutlined'
import AddIcon from '../../assets/add.png'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/actions/auth'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    list: {
        width: '256px',
        height: '40px',
        fontSize: '13px',
        fontWeight: '700',
        color: '#777',
    },
    listContainer: {
        outline: 'none',
    },
    divider: {
        margin: '4px 0'
    },
    icon: {
        fontSize: '22px',
        margin: '0 0 0 14px'
    }
}))

const New = styled.div`
    display:flex;
    width:120px;
    max-height:47px;
    align-items:center;
    border-radius : 30px;
    box-shadow : 0 0 4px rgba(0,0,0,0.2);
    margin:8px 0 16px 8px;
    cursor:pointer;
    &:hover{
        box-shadow : 0 0 6px 2px rgba(0,0,0,0.2);
    }
`
const NewImg = styled.img`
    height:45px;
    border-radius:30px;
`
const NewText = styled.p`
    font-size:14px;
    font-weight:700;
`
function SideBarMenu({ navPos, handleOpen }) {

    const history = useHistory()
    const dispatch = useDispatch()
    const classes = useStyles()
    const [selectedIndex, setSelectedIndex] = React.useState(navPos);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    }
    const logOut = () => {
        dispatch(logout())
            .then(status => {
                if (status) history.push('/')
                else return
            })
    }
    return (
        <List component="nav" className={classes.listContainer}>
            <New onClick={handleOpen}>
                <NewImg src={AddIcon} />
                <NewText>New</NewText>
            </New>
            <Link to='/myfiles' style={{ textDecoration: 'none' }}>
                <ListItem button selected={selectedIndex === 0}
                    onClick={(event) => handleListItemClick(event, 0)} className={classes.list}>
                    <ListItemIcon>
                        <DescriptionOutlinedIcon style={{ fontSize: '20px', margin: '0 0 0 8px' }} />
                    </ListItemIcon>
                        My Files
                </ListItem>
            </Link>
            <Link to='/shared-with-me' style={{ textDecoration: 'none' }}>
                <ListItem button selected={selectedIndex === 1}
                    onClick={(event) => handleListItemClick(event, 1)} className={classes.list}>
                    <ListItemIcon>
                        <PeopleOutlinedIcon style={{ fontSize: '20px', margin: '0 0 0 8px' }} />
                    </ListItemIcon>
                        Shared with me
                </ListItem>
            </Link>
            <Link to='/recent' style={{ textDecoration: 'none' }}>
                <ListItem button selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 2)} className={classes.list}>
                    <ListItemIcon>
                        <AccessTimeIcon style={{ fontSize: '20px', margin: '0 0 0 8px' }} />
                    </ListItemIcon>
                        Recent
                </ListItem>
            </Link>
            <Link to='/starred' style={{ textDecoration: 'none' }}>
                <ListItem button selected={selectedIndex === 3}
                    onClick={(event) => handleListItemClick(event, 3)} className={classes.list}>
                    <ListItemIcon>
                        <StarOutlineOutlinedIcon style={{ fontSize: '20px', margin: '0 0 0 8px' }} />
                    </ListItemIcon>
                        Starred
                </ListItem>
            </Link>
            <ListItem button selected={selectedIndex === 4}
                onClick={(event) => {
                    handleListItemClick(event, 4)
                    logOut()
                }} className={classes.list}>
                <ListItemIcon>
                    <ExitToAppIcon style={{ fontSize: '20px', margin: '0 0 0 8px' }} />
                </ListItemIcon>
                        Logout
                </ListItem>
        </List>
    )
}

export default SideBarMenu
