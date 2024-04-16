import PropTypes from 'prop-types'
import styled from 'styled-components'
import { stringIsNumber } from '../../utils/cssUtils'

const StyledWrapper = styled.div`
    max-width: ${({ $maxWidth }) => (stringIsNumber($maxWidth) ? $maxWidth + 'px' : $maxWidth)};
    max-height: ${({ $maxHeight }) => (stringIsNumber($maxHeight) ? $maxHeight + 'px' : $maxHeight)};
    min-width: ${({ $minWidth }) => (stringIsNumber($minWidth) ? $minWidth + 'px' : $minWidth)};
    min-height: ${({ $minHeight }) => (stringIsNumber($minHeight) ? $minHeight + 'px' : $minHeight)};
`

export const Wrapper = ({ maxWidth = 'unset', maxHeight = 'unset', minWidth = 0, minHeight = 0, children }) => {
    return (
        <StyledWrapper $maxWidth={maxWidth} $maxHeight={maxHeight} $minWidth={minWidth} $minHeight={minHeight}>
            {children}
        </StyledWrapper>
    )
}

Wrapper.propTypes = {
    maxWidth: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
    maxHeight: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
    minWidth: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
    minHeight: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
    children: PropTypes.element
}
