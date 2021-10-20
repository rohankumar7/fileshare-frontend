import React, { useEffect, useState } from 'react'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import IconButton from '@material-ui/core/IconButton'

function Pagination({ total, itemsPerPage, currentPage, setCurrentPage }) {
    const [totalPages, setTotalPages] = useState(0)
    useEffect(() => {
        if (total > 0 && itemsPerPage > 0)
            setTotalPages(Math.ceil(total / itemsPerPage))
    }, [total, itemsPerPage])

    const onButtonClick = type => {
        if (type === 'prev') {
            if (currentPage === 1) {
                setCurrentPage(1)
            } else {
                setCurrentPage(currentPage - 1)
            }
        } else if (type === 'next') {
            if (Math.ceil(total / itemsPerPage) === currentPage) {
                setCurrentPage(currentPage)
            } else {
                setCurrentPage(currentPage + 1)
            }
        }
    }
    return (
        <div>
            { total > 0 && <div>
                <IconButton onClick={() => onButtonClick('prev')}><ChevronLeftIcon /></IconButton>
                {`${currentPage} / ${totalPages}`}
                <IconButton onClick={() => onButtonClick('next')}><ChevronRightIcon /></IconButton>
            </div>}
        </div>
    )
}

export default Pagination
