import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledPadding = styled.div`
    padding: ${({ $padding }) => $padding}px;
`

export const Padding = ({ value = 10, children = '' }) => {
    return <StyledPadding $padding={value}>{children}</StyledPadding>
}

Padding.propTypes = {
    children: PropTypes.element,
    value: PropTypes.number
}
