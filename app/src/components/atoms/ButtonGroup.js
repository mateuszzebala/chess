import styled from 'styled-components'
import PropTypes from 'prop-types'
import React from 'react'

const StyledWrapper = styled.div`
    display: flex;
    width: 100%;
`

const StyledButton = styled.button`
    flex: 1;
    background-color: ${({ theme, $active }) => ($active ? theme.colors.darkColor : theme.colors.lightColor)};
    color: ${({ theme, $active }) => ($active ? theme.colors.lightColor : theme.colors.darkColor)};
    border: 5px solid ${({ theme }) => theme.colors.darkColor};
    transition:
        background-color 0.2s,
        color 0.2s;
    border-left: none;
    font-size: 23px;
    padding: 15px 20px;
    font-weight: 100;
    min-height: 70px;
    cursor: pointer;
    &:first-child {
        border-left: 5px solid ${({ theme }) => theme.colors.darkColor};
        border-radius: 8px 0 0 8px;
    }
    &:last-child {
        border-radius: 0 8px 8px 0;
    }
    &:hover,
    &:focus {
        z-index: 40;
    }
`

export const ButtonGroup = ({ buttons = {}, value = null, setValue = () => {}, disabled = false }) => {
    return (
        <StyledWrapper>
            {Object.keys(buttons).map((button) => (
                <StyledButton key={button} onClick={() => !disabled && setValue(button)} $active={value == button}>
                    {buttons[button]}
                </StyledButton>
            ))}
        </StyledWrapper>
    )
}

ButtonGroup.propTypes = {
    buttons: PropTypes.any,
    value: PropTypes.any,
    setValue: PropTypes.func,
    disabled: PropTypes.bool
}
