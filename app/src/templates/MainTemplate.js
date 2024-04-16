import PropTypes from 'prop-types'
import styled from 'styled-components'
import { NavBar } from '../components/organisms/NavBar'
import React from 'react'

const StyledTemplate = styled.main`
    display: flex;
    align-items: flex-start;
    overflow: hidden;
`

export const MainTemplate = ({ children, title = '' }) => {
    React.useEffect(() => {
        document.title = 'Chess' + (title ? ` - ${title}` : '')
    }, [title])

    return (
        <StyledTemplate>
            <NavBar />
            {children}
        </StyledTemplate>
    )
}

MainTemplate.propTypes = {
    title: PropTypes.string,
    children: PropTypes.any
}
