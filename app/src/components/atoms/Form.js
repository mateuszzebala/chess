import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Flex, Padding } from '../style'

const StyledForm = styled.form`
    width: 100%;
`

export const Form = ({ row, column = true, children, onSubmit = () => {}, ...props }) => {
    return (
        <StyledForm onSubmit={onSubmit}>
            <Padding>
                <Flex alignItems="stretch" row={row} column={column} {...props}>
                    {children}
                </Flex>
            </Padding>
        </StyledForm>
    )
}

const StyledError = styled.span`
    color: ${({ theme }) => theme.colors.errorColor};
    font-size: 20px;
`

export const FormError = ({ show, children }) => {
    return show ? <StyledError>{children}</StyledError> : ''
}

FormError.propTypes = {
    show: PropTypes.any,
    children: PropTypes.any
}

Form.propTypes = {
    children: PropTypes.any,
    row: PropTypes.bool,
    column: PropTypes.bool,
    onSubmit: PropTypes.func
}
