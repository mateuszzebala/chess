import PropTypes from 'prop-types'
import styled from 'styled-components'
import { CgSpinner } from 'react-icons/cg'

const StyledLoading = styled.div`
    font-size: ${({ $size }) => $size * 100 + 'px'};
    color: ${({ theme }) => theme.colors.darkColor};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    svg {
        animation: rotate 1s linear infinite;
    }
`

export const Loading = ({ size = 1 }) => {
    return (
        <StyledLoading $size={size}>
            <CgSpinner />
        </StyledLoading>
    )
}

Loading.propTypes = {
    size: PropTypes.number
}
