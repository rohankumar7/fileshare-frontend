import React from 'react'
import styled from 'styled-components'
import FileList from './FileList'
import ErrorImg from '../../../assets/error.png'
import { useSelector } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'

const Container = styled.div`
    padding:16px;
    font-size:13px;
    color:#777;
`
const ImgCont = styled.div`
    position : relative;
    width:100%;
    height:82vh;
`
const ErrorMsg = styled.div`
    position:absolute;
    z-index:10;
    top:50%;
    left:50%;
    transform:translate(-50%,-80%);

`
const ErrorTxt = styled.div`
    font-weight : bold;
    font-size:16px;
    color:#777;
`

function ListLayout({ files, fileOrder }) {
    const loading = useSelector(state => state.loading)
    return (
        <div>
            { files.length === 0 ?
                <ImgCont>
                    <ErrorMsg>
                        {loading ? <CircularProgress /> :
                            <div>
                                <img alt='' src={ErrorImg} />
                                <ErrorTxt>No file found!</ErrorTxt>
                            </div>
                        }
                    </ErrorMsg>
                </ImgCont> :
            <Container>
                <table width='100%' style={{ borderCollapse: 'collapse' }}>
                    <tbody>
                        {
                            fileOrder.map(fileID => {
                                const file = files.find(file => file._id === fileID)
                                if (file) {
                                    return (<FileList key={file._id} file={file} />)
                                }
                            })
                        }
                    </tbody>
                </table>
            </Container> }
        </div>
    )
}

export default ListLayout
