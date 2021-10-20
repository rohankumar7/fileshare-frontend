import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import { renameFileAction } from '../../../../redux/actions/files'
import CircularProgress from '@material-ui/core/CircularProgress'

import { useDispatch } from 'react-redux'
import { useSetMessage, useResetMessage } from '../../../snackbar/MessageProvider'
import { useSnackbarHandleOpen } from '../../../snackbar/SnackbarProvider'
const textStyle = {
  fontSize: '14px',
  fontFamily: 'Quicksand',
  background: '#fff',
  lineHeight: '20px',
  padding: '6px 12px',
  fontWeight: '400',
  color: '#172b4d',
  display: 'block',
  whiteSpace: 'pre-wrap',
  width: '95%',
  border: '2px solid #0079bf',
  outline: 'none',
  resize: 'none',
  borderRadius: '3px',
  '&::placeholder': {
    fontFamily: 'Quicksand',
    fontSize: '14px',
    letterSpacing: 'normal',
    fontWeight: '400',
    color: '#5e6c84',
  }
}
export default function RenameModal({ renameOpen, setrenameOpen, file }) {

  const dispatch = useDispatch()
  const [filename, setFileName] = React.useState(file.filename)
  const [loader, setLoader] = React.useState(false)

  const setMessage = useSetMessage()
  const resetMessage = useResetMessage()
  const handleOpen = useSnackbarHandleOpen()

  const rename = async () => {
    setLoader(true)
    if (filename === '') {
      setFileName(file.filename)
      setrenameOpen(false)
      setLoader(false)
      return
    }
    if (filename === file.filename) {
      setFileName(file.filename)
      setrenameOpen(false)
      setLoader(false)
      return
    }
    try {
      const res = await dispatch(renameFileAction(filename, file._id))
      setLoader(false)
      resetMessage()
      setMessage({ msg: `${res}`, type: 'success' })
      handleOpen()
      setFileName(file.filename)
      setrenameOpen(false)
    } catch (error) {
      setLoader(false)
      resetMessage()
      setMessage({ msg: `${error.message}`, type: 'error' })
      handleOpen()
      setrenameOpen(false)
    }
  }
  return (
    <div>
      <Dialog
        maxWidth='sm'
        fullWidth={true}
        open={renameOpen}
        hideBackdrop={true}
        onClose={() => {
          setrenameOpen(false)
          setFileName(file.filename)
        }}
      >
        <div style={{ padding: '16px 24px', fontSize: '22px', fontWeight: '500' }}>rename file</div>
        <DialogContent>
          <input style={textStyle} type='text' value={filename} onChange={(e) => setFileName(e.target.value)} onFocus={(e) => e.target.select()} />
          <span style={{ margin: '4px 0', fontSize: '13px', color: 'red' }}>Note - do not change the file extension.</span>
        </DialogContent>
        <DialogActions>
          <Button size='small' onClick={() => {
            setFileName(file.filename)
            setrenameOpen(false)
          }} style={{ color: '#4286f4' }}>
            Cancel
          </Button>
          <Button disabled={loader} size='small' style={{ color: '#4286f4' }} onClick={() => rename()} color="primary" variant='text'>
            {loader ? <CircularProgress color='primary' style={{ height: '22px', width: '22px' }} /> : 'Done'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}