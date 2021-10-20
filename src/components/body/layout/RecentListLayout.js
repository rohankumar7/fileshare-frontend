import React from 'react'
import styled from 'styled-components'
import FileList from '../layout/FileList'

const Container = styled.div`
    padding:16px;
    font-size:13px;
    color:#777;
`
const Category = styled.div`
    font-weight : bold;
    font-size : 14px;
    color : #999;
    margin-top:16px;
    width:100%;
`

function RecentListLayout({ files, todayFileOrder, yesterdayFileOrder, weekFileOrder }) {

    return (
        <Container>
            {
                todayFileOrder.length > 0 &&
                <div>
                    <Category>Today</Category>
                    <table width='100%' style={{ borderCollapse: 'collapse' }}>
                        <tbody>
                            {
                                todayFileOrder.map(fileID => {
                                    const file = files.find(file => file._id === fileID)
                                    if (file) {
                                        return (<FileList key={file._id} file={file} />)
                                    }
                                })
                            }
                        </tbody>
                    </table>
                </div>
            }
            {
                yesterdayFileOrder.length > 0 &&
                <div>
                    <Category>Yesterday</Category>
                    <table width='100%' style={{ borderCollapse: 'collapse' }}>
                        <tbody>
                            {
                                yesterdayFileOrder.map(fileID => {
                                    const file = files.find(file => file._id === fileID)
                                    if (file) {
                                        return (<FileList key={file._id} file={file} />)
                                    }
                                })
                            }
                        </tbody>
                    </table>
                </div>
            }
            {
                weekFileOrder.length > 0 &&
                <div>
                    <Category>Last week</Category>
                    <table width='100%' style={{ borderCollapse: 'collapse' }}>
                        <tbody>
                            {
                                weekFileOrder.map(fileID => {
                                    const file = files.find(file => file._id === fileID)
                                    if (file) {
                                        return (<FileList key={file._id} file={file} />)
                                    }
                                })
                            }
                        </tbody>
                    </table>
                </div>
            }
        </Container>
    )
}

export default RecentListLayout
