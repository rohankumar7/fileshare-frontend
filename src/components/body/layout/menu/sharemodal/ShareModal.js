import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import styled from 'styled-components'
import Divider from '@material-ui/core/Divider'

import Link from './Link'
import Share from './Share'

const LinkContainer = styled.div``

const RowFlexRev = styled.div`
    display : flex;
    justify-content:flex-start;
    flex-direction : row-reverse;
    align-items:center;
`
const Space = styled.div`
    height:16px;
`
export default function ShareModal({ shareOpen, setshareOpen, file }) {
    return (
        <div>
            <Dialog
                open={shareOpen}
                fullWidth={true}
                maxWidth='sm'
                hideBackdrop={true}
                onClose={() => setshareOpen(false)}
            >
                <DialogContent>
                    <LinkContainer>
                        <Share file={file} />
                        <Divider />
                        <Link file={file} />
                        <RowFlexRev>
                            <Button variant='contained' size='small' style={{ backgroundColor: '#4286f4' }} onClick={() => setshareOpen(false)} color="primary" autoFocus>
                                Done
                            </Button>
                        </RowFlexRev>
                        <Space />
                    </LinkContainer>
                </DialogContent>
            </Dialog>
        </div>
    );
}