import styled from 'styled-components'
import PropTypes from 'prop-types'
import { CgSpinner } from 'react-icons/cg'

export const StyledButtonComponent = styled.button`
    background-color: ${({ theme, $secondary }) => ($secondary ? theme.colors.lightColor : theme.colors.darkColor)};
    color: ${({ theme, $secondary, $loading }) => ($secondary ? theme.colors.darkColor : theme.colors.lightColor) + ($loading ? '11' : 'FF')};
    border: 5px solid ${({ theme }) => theme.colors.darkColor};
    padding: 15px;
    font-size: 23px;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    gap: 10px;
    border-radius: ${({ $circle }) => ($circle ? '50%' : '8px')};
    font-weight: 700;
    min-height: 68px;
    width: auto;
    justify-content: center;
    position: relative;
    outline: 0 solid ${({ theme }) => theme.colors.darkColor}88;
    transition: outline-width 0.1s;
    &:hover,
    &:focus {
        outline-width: 5px;
    }
`

const StyledLoading = styled.div`
    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    & > * {
        animation: rotate 1s linear infinite;
    }

    position: absolute;
    color: ${({ theme, $secondary }) => ($secondary ? theme.colors.darkColor : theme.colors.lightColor)};
    font-size: 40px;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Button = ({ children = '', secondary = false, loading = false, circle = false, onClick = () => {}, ...props }) => {
    const handleClick = (e) => {
        e.preventDefault()
        !loading && onClick(e)
    }

    return (
        <StyledButtonComponent onClick={handleClick} $secondary={secondary} $loading={loading} $circle={circle} {...props}>
            {children}
            {loading && (
                <StyledLoading $secondary={secondary}>
                    <CgSpinner />
                </StyledLoading>
            )}
        </StyledButtonComponent>
    )
}

Button.propTypes = {
    children: PropTypes.any,
    secondary: PropTypes.bool,
    loading: PropTypes.bool,
    circle: PropTypes.bool,
    onClick: PropTypes.func
}
