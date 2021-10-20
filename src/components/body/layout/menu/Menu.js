import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Menu from '@material-ui/core/Menu'
import Divider from '@material-ui/core/Divider'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import LinkOutlinedIcon from '@material-ui/icons/LinkOutlined'
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined'
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined'
import ShareModal from './sharemodal/ShareModal'
import RenameModal from './RenameModal'
import { downloadFileAction, addToStarredAction, deleteFileAction, deleteSharedFileAction } from '../../../../redux/actions/files'
import { useDispatch } from 'react-redux'
import { useSetMessage, useResetMessage } from '../../../snackbar/MessageProvider'
import { useSnackbarHandleOpen } from '../../../snackbar/SnackbarProvider'

const useStyles = makeStyles((theme) => ({
    list: {
        width: '280px',
        padding: '4px 8px',
        fontSize: '14px',
    },
    listContainer: {
        padding: '0 0px',
        outline: 'none'
    },
    divider: {
        margin: '4px 0'
    },
    icon: {
        fontSize: '22px',
        margin: '0 0 0 14px'
    }
}))
export default function SimpleMenu({ anchorEl, handleClose, file }) {

    const [shareOpen, setshareOpen] = React.useState(false)
    const [renameOpen, setrenameOpen] = React.useState(false)
    const dispatch = useDispatch()
    const classes = useStyles()

    const setMessage = useSetMessage()
    const resetMessage = useResetMessage()
    const handleOpen = useSnackbarHandleOpen()

    const closeMenu = () => {
        handleClose()
    }
    const downloadFile = () => {

        dispatch(downloadFileAction(file._id))
            .then(data => {
                const url = window.URL.createObjectURL(new Blob([data]))
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', `${file.filename}`)
                document.body.appendChild(link)
                link.click()
            })
            .catch(error => console.log(error))
        closeMenu()
    }
    const starred = async () => {
        try {
            const res = await dispatch(addToStarredAction(file._id, file.starred))
            closeMenu()
            resetMessage()
            setMessage({ msg: `${res}`, type: 'success' })
            handleOpen()
        } catch (error) {
            closeMenu()
            resetMessage()
            setMessage({ msg: `${error.message}`, type: 'error' })
            handleOpen()
        }
    }
    const removeFile = async () => {
        try {
            const res = await dispatch(deleteFileAction(file._id))
            closeMenu()
            resetMessage()
            setMessage({ msg: `${res}`, type: 'success' })
            handleOpen()
        } catch (error) {
            closeMenu()
            resetMessage()
            if (error.status === 500)
                setMessage({ msg: `internal server error!`, type: 'error' })
            setMessage({ msg: `${error.message}`, type: 'error' })
            handleOpen()
        }
    }
    const removeSharedFile = async() => {
        try {
            const res = await dispatch(deleteSharedFileAction(file._id))
            closeMenu()
            resetMessage()
            setMessage({ msg: `${res}`, type: 'success' })
            handleOpen()
        } catch (error) {
            closeMenu()
            resetMessage()
            if (error.status === 500)
                setMessage({ msg: `internal server error!`, type: 'error' })
            setMessage({ msg: `${error.message}`, type: 'error' })
            handleOpen()
        }
    }
    return (
        <div>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        width: 'auto',
                        padding: '0',
                    },
                }}
            >
                <List component="nav" className={classes.listContainer}>

                    <ShareModal shareOpen={shareOpen} setshareOpen={setshareOpen} file={file} />
                    <RenameModal renameOpen={renameOpen} setrenameOpen={setrenameOpen} file={file} />

                    <ListItem button onClick={() => {
                        setshareOpen(true)
                        closeMenu()
                    }} className={classes.list}>
                        <ListItemIcon>
                            <PersonAddOutlinedIcon className={classes.icon} />
                        </ListItemIcon>
                        Share
                    </ListItem>
                    <ListItem button onClick={() => {
                        setshareOpen(true)
                        closeMenu()
                    }} className={classes.list}>
                        <ListItemIcon>
                            <LinkOutlinedIcon className={classes.icon} />
                        </ListItemIcon>
                        Get link
                    </ListItem>
                    {!file.shared && <ListItem button onClick={starred} className={classes.list}>
                        <ListItemIcon>
                            <StarBorderIcon className={classes.icon} />
                        </ListItemIcon>
                        {file.starred === false ? 'Add to Starred' : 'Remove from Starred'}
                    </ListItem>}
                    {!file.shared && <ListItem button onClick={() => {
                        setrenameOpen(true)
                        closeMenu()
                    }} className={classes.list}>
                        <ListItemIcon>
                            <CreateOutlinedIcon className={classes.icon} />
                        </ListItemIcon>
                        Rename
                    </ListItem>}
                    <Divider className={classes.divider} />
                    <ListItem button onClick={downloadFile} className={classes.list}>
                        <ListItemIcon>
                            <GetAppOutlinedIcon className={classes.icon} />
                        </ListItemIcon>
                        Download
                    </ListItem>
                    <Divider className={classes.divider} />
                    {file.shared ?
                        <ListItem button onClick={removeSharedFile} className={classes.list}>
                            <ListItemIcon>
                                <DeleteOutlineOutlinedIcon className={classes.icon} />
                            </ListItemIcon>
                        Remove
                    </ListItem> :
                        <ListItem button onClick={removeFile} className={classes.list}>
                            <ListItemIcon>
                                <DeleteOutlineOutlinedIcon className={classes.icon} />
                            </ListItemIcon>
                    Remove
                    </ListItem>}
                </List>
            </Menu>
        </div>
    );
}