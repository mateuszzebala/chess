import styled from 'styled-components'
import PropTypes from 'prop-types'
import React from 'react'
import { FiX } from 'react-icons/fi'

const StyledMessage = styled.div`
    transition: transform 0.2s;
    transform: translateX(${({ $toHide }) => ($toHide ? '100%' : '0')});
    background-color: ${({ theme, $mode }) => ($mode == 'error' ? theme.colors.errorColor : $mode == 'success' ? theme.colors.successColor : theme.colors.darkColor)};
    color: ${({ theme, $mode }) => ($mode == 'error' ? theme.colors.lightColor : $mode == 'success' ? theme.colors.darkColor : theme.colors.lightColor)};
    padding: 15px;
    border-radius: 10px;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const StyledMessageText = styled.span`
    padding: 0 10px;
`

const StyledCloseButton = styled.button`
    padding: 5px;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: 0;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.2s;
    color: ${({ theme, $mode }) => ($mode == 'error' ? theme.colors.lightColor : $mode == 'success' ? theme.colors.darkColor : theme.colors.lightColor)};
    &:hover,
    &:focus {
        background-color: ${({ theme }) => theme.colors.lightColor}44;
    }
`

export const Message = ({ text, mode = 'normal', close = () => {}, toHide = false }) => {
    return (
        <StyledMessage $mode={mode} $toHide={toHide}>
            <StyledMessageText>{text}</StyledMessageText>
            <StyledCloseButton onClick={close} $mode={mode}>
                <FiX />
            </StyledCloseButton>
        </StyledMessage>
    )
}

export const MessageContext = React.createContext([])

const StyledMessagesWrapper = styled.div`
    position: fixed;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: min(100vw, 400px);
    padding: 10px;
    gap: 5px;
`

export const MessageGroup = () => {
    const [messages] = React.useContext(MessageContext)

    return (
        <StyledMessagesWrapper>
            {messages.map((message) => {
                return <Message key={message.id} text={message.text} mode={message.mode} close={message.close} toHide={message.toHide} />
            })}
        </StyledMessagesWrapper>
    )
}

export const MessageLayer = ({ next }) => {
    const [messages, setMessages] = React.useState([])
    return (
        <MessageContext.Provider value={[messages, setMessages]}>
            <MessageGroup />
            {next}
        </MessageContext.Provider>
    )
}

MessageLayer.propTypes = {
    next: PropTypes.any
}

Message.propTypes = {
    text: PropTypes.string,
    mode: PropTypes.string,
    close: PropTypes.func,
    toHide: PropTypes.bool
}
