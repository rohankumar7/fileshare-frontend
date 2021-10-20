import React from 'react'
import FileCard from './FileCard'
import styled from 'styled-components'
import ErrorImg from '../../../assets/error.png'
import { useSelector } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'

const Container = styled.div`
    display : flex;
    flex-direction:row;
    justify-content : flex-start;
    align-items:center;
    flex-wrap : wrap;
    padding:8px;
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
function CardLayout({ files, fileOrder }) {
    const loading = useSelector(state => state.loading)
    return (
        <div>
            { files.length === 0 ?
                <ImgCont>
                    <ErrorMsg>
                        { loading ? <CircularProgress /> :
                            <div>
                                <img alt='' src={ErrorImg} />
                                <ErrorTxt>No file found!</ErrorTxt>
                            </div>
                        }
                    </ErrorMsg>
                </ImgCont> :
                <Container>
                    {
                        fileOrder.map(fileID => {
                            const file = files.find(file => file._id === fileID)
                            if (file) {
                                return (<FileCard key={file._id} file={file} />)
                            }
                        })
                    }
                </Container>}
        </div>
    )
}

export default CardLayout
