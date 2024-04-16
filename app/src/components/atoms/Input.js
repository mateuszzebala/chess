import styled from 'styled-components'
import PropTypes from 'prop-types'
import React from 'react'

export const StyledInputWrapper = styled.div`
    background-color: ${({ theme, $disabled }) => ($disabled ? theme.colors.greyColor : theme.colors.lightColor)};
    display: flex;
    justify-content: space-between;
    justify-content: center;
    align-items: stretch;
    border: 5px solid ${({ theme }) => theme.colors.darkColor};
    gap: 0;
    border-radius: 8px;
    min-height: 68px;
    outline: 0 solid ${({ theme }) => theme.colors.darkColor}88;
    position: relative;
    transition: outline-width 0.1s;
    outline-width: ${({ $isFocused }) => ($isFocused ? '5px' : '0')};
    overflow: hidden;
`

const StyledLabelAndInput = styled.div`
    display: inline-flex;
    flex-direction: column;
    width: 100%;
    padding: ${({ $haveLabel }) => ($haveLabel ? '18px 0px 7px 10px' : '12px 0px 12px 10px')};
    overflow: hidden;
    white-space: nowrap;
`

const StyledIcon = styled.div`
    display: grid;
    place-items: center;
    width: 60px;
    font-size: 30px;
    color: ${({ theme }) => theme.colors.darkColor};
`

export const StyledInputComponent = styled.input`
    border: 0;
    outline: 0;
    font-size: 23px;
    font-weight: 200;
    flex: 1;
    width: 100%;
    color: ${({ theme }) => theme.colors.darkColor};
`

export const StyledInputLabel = styled.span`
    position: absolute;
    color: ${({ theme, $labelOnTop }) => theme.colors.darkColor + ($labelOnTop ? 'ff' : '88')};
    user-select: none;
    font-weight: 200;
    cursor: text;
    transition:
        top 0.1s,
        font-size 0.1s,
        transform 0.1s,
        color 0.1s;
    top: ${({ $labelOnTop }) => ($labelOnTop ? '5px' : '50%')};
    left: 15px;
    transform: translateY(${({ $labelOnTop }) => ($labelOnTop ? '0' : '-50%')});
    font-size: ${({ $labelOnTop }) => ($labelOnTop ? '13px' : '20px')};
`

const StyledFileInput = styled.label`
    font-size: 20px;
    display: flex;
    width: 250px;
    padding: 5px;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.darkColor};
    text-overflow: ellipsis;
`

export const Input = ({ icon = null, label = '', value = '', setValue = () => {}, type = 'text', disabled = false, ...props }) => {
    const [labelOnTop, setLabelOnTop] = React.useState(value != '')
    const [isFocused, setIsFocused] = React.useState(false)
    const inputRef = React.useRef()

    const handleChange = ({ target }) => {
        setValue(target.value)
    }

    const handleFocus = () => {
        setLabelOnTop(true)
        setIsFocused(true)
    }

    const handleBlur = ({ target }) => {
        setLabelOnTop(target.value != '')
        setIsFocused(false)
    }

    const focusInput = () => {
        inputRef.current.focus()
    }

    if (type == 'file') {
        return (
            <StyledInputWrapper $disabled={disabled} onClick={focusInput} $isFocused={isFocused}>
                <StyledLabelAndInput $haveLabel={!!label}>
                    {label && (
                        <StyledInputLabel onClick={focusInput} $labelOnTop={labelOnTop}>
                            {label}
                        </StyledInputLabel>
                    )}
                    <StyledInputComponent
                        style={{ display: 'none' }}
                        {...props}
                        disabled={disabled}
                        ref={inputRef}
                        type="file"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        value={value}
                        onChange={handleChange}
                    />
                    <StyledFileInput
                        tabIndex={0}
                        onClick={() => {
                            inputRef.current.click()
                        }}>
                        {inputRef.current && value && inputRef.current.files ? inputRef.current.files[0].name : 'Choose a file'}
                    </StyledFileInput>
                </StyledLabelAndInput>
                {icon && <StyledIcon>{icon}</StyledIcon>}
            </StyledInputWrapper>
        )
    }

    return (
        <StyledInputWrapper $disabled={disabled} onClick={focusInput} $isFocused={isFocused}>
            <StyledLabelAndInput $haveLabel={!!label}>
                {label && (
                    <StyledInputLabel onClick={focusInput} $labelOnTop={labelOnTop}>
                        {label}
                    </StyledInputLabel>
                )}
                <StyledInputComponent {...props} disabled={disabled} type={type} ref={inputRef} onFocus={handleFocus} onBlur={handleBlur} value={value} onChange={handleChange} />
            </StyledLabelAndInput>
            {icon && <StyledIcon>{icon}</StyledIcon>}
        </StyledInputWrapper>
    )
}

Input.propTypes = {
    label: PropTypes.string,
    icon: PropTypes.element,
    value: PropTypes.string,
    setValue: PropTypes.func,
    disabled: PropTypes.bool,
    type: PropTypes.string
}
