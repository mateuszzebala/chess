import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { stringIsNumber } from '../../utils/cssUtils'

const StyledFlex = styled.div`
    display: flex;
    flex-direction: ${({ $flexDirection }) => $flexDirection};
    justify-content: ${({ $justifyContent }) => $justifyContent};
    align-items: ${({ $alignItems }) => $alignItems};
    gap: ${({ $gap }) => $gap}px;
    padding: ${({ $padding }) => $padding}px;
    width: ${({ $width }) => (stringIsNumber($width) ? $width + 'px' : $width)};
    height: ${({ $height }) => (stringIsNumber($height) ? $height + 'px' : $height)};
    ${({ $equalSize }) =>
        $equalSize &&
        css`
            & > * {
                flex: 1;
            }
        `}
`

export const Flex = ({
    height = 'auto',
    width = '100%',
    equalSize = false,
    padding = false,
    column = false,
    row = false,
    gap = 20,
    alignItems = 'center',
    justifyContent = 'center',
    children = ''
}) => {
    if (!column && !row) throw new Error('Flex component should have prop column of row set to true')
    return (
        <StyledFlex
            $width={width}
            $height={height}
            $equalSize={equalSize}
            $padding={padding === true ? 10 : padding === false ? 0 : padding}
            $gap={gap}
            $alignItems={alignItems}
            $justifyContent={justifyContent}
            $flexDirection={column ? 'column' : 'row'}>
            {children}
        </StyledFlex>
    )
}

Flex.propTypes = {
    width: PropTypes.any,
    height: PropTypes.any,
    column: PropTypes.bool,
    row: PropTypes.bool,
    equalSize: PropTypes.bool,
    gap: PropTypes.number,
    alignItems: PropTypes.string,
    justifyContent: PropTypes.string,
    children: PropTypes.any,
    padding: PropTypes.number
}
