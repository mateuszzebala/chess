import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const StyledScroll = styled.div`
    overflow: scroll;
    position: relative;
    border-radius: 4px;
    padding: 0;
    &::-webkit-scrollbar {
        height: 0;
        width: 0;
    }
`

export const Scroll = ({ children }) => {
    return <StyledScroll>{children}</StyledScroll>
}

Scroll.propTypes = {
    children: PropTypes.any
}
