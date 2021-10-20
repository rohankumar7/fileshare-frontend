import React from 'react'
import styled from 'styled-components'
import FileCard from '../layout/FileCard'

const Container = styled.div`
    display : flex;
    flex-direction:row;
    justify-content : flex-start;
    align-items:center;
    flex-wrap : wrap;
    padding:8px;
`
const Category = styled.div`
    font-weight : bold;
    font-size : 14px;
    color : #999;
    margin:16px 16px 0 16px;
`

function RecentCardLayout({ files, todayFileOrder, yesterdayFileOrder, weekFileOrder }) {

    return (
        <div>
            {
                todayFileOrder.length > 0 &&
                <div>
                    <Category>Today</Category>
                    <Container>
                        {
                            todayFileOrder.map(fileID => {
                                const file = files.find(file => file._id === fileID)
                                if (file) {
                                    return (<FileCard key={file._id} file={file} />)
                                }
                            })
                        }
                    </Container>
                </div>
            }
            {
                yesterdayFileOrder.length > 0 &&
                <div>
                    <Category>Yesterday</Category>
                    <Container>
                        {
                            yesterdayFileOrder.map(fileID => {
                                const file = files.find(file => file._id === fileID)
                                if (file) {
                                    return (<FileCard key={file._id} file={file} />)
                                }
                            })
                        }
                    </Container>
                </div>
            }
            {
                weekFileOrder.length > 0 &&
                <div>
                    <Category>Last week</Category>
                    <Container>
                        {
                            weekFileOrder.map(fileID => {
                                const file = files.find(file => file._id === fileID)
                                if (file) {
                                    return (<FileCard key={file._id} file={file} />)
                                }
                            })
                        }
                    </Container>
                </div>
            }
        </div>
    )
}

export default RecentCardLayout

