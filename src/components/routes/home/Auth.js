import React from 'react'
import styled from 'styled-components'
import Login from './Login'
import Register from './Register'
import { ReactComponent as Logo } from '../../../assets/logo.svg'


const contStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)'
}
const LogoText = styled.p`
    font-weight:500;
    font-size:22px;
    color:#777;
    margin: 0 8px;
`
function Home() {
    const [open, setOpen] = React.useState(true)
    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', padding: '16px' }}>
                <Logo style={{ height: '42px', width: '42px' }} />
                <LogoText>Fileshare</LogoText>
            </div>
            <div style={contStyle}>
                {open ? <Login setOpen={setOpen} /> :
                    <Register setOpen={setOpen} />}
            </div>
        </div>
    )
}

export default Home
