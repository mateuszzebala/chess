import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledCurtain = styled.div`
    @keyframes fade-in {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes fade-out {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    animation: ${({ $toHide }) => ($toHide ? 'fade-out' : 'fade-in')} 0.1s linear forwards;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.darkColor}AA;
    z-index: 2;
`

export const Curtain = ({ toHide }) => {
    return <StyledCurtain $toHide={toHide}></StyledCurtain>
}

Curtain.propTypes = {
    toHide: PropTypes.bool
}
