import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

const StyledLink = styled.a`
    color: ${({ theme }) => theme.colors.darkColor};
    font-size: 20px;
    cursor: pointer;
`

export const Link = ({ children, to }) => {
    const navigate = useNavigate()
    const handleClick = (e) => {
        e.preventDefault()
        navigate(to)
    }
    return <StyledLink onClick={handleClick}>{children}</StyledLink>
}

Link.propTypes = {
    children: PropTypes.any,
    to: PropTypes.string
}
