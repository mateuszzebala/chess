import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FiX } from 'react-icons/fi'
import React from 'react'
import { useModal } from '../../utils/hooks'
import { Curtain } from './Curtain'

export const StyledModal = styled.div`
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
    transform: translate(-50%, -50%);
    animation: ${({ $toHide }) => ($toHide ? 'fade-out' : 'fade-in')} 0.1s linear forwards;
    position: fixed;
    top: 50%;
    left: 50%;
    box-shadow: ${({ theme }) => theme.utils.lightBoxShadow};
    border-radius: 18px;
    background-color: ${({ theme }) => theme.colors.lightColor};
    z-index: 3;
`

export const StyledBar = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 30px;
    color: ${({ theme }) => theme.colors.darkColor};
    user-select: none;
    align-items: center;
    border-bottom: 0.1px solid ${({ theme }) => theme.colors.darkColor};
    gap: 20px;
    padding: 10px;
    .title {
        font-size: 20px;
        font-weight: 400;
    }
    .closeButton {
        background-color: transparent;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 0;
        padding: 5px;
        font-size: 30px;
        transition: background-color 0.1s;
        cursor: pointer;
        border-radius: 8px;
        &:hover {
            background-color: ${({ theme }) => theme.colors.greyColor};
        }
    }
`

export const StyledContent = styled.div`
    width: 100%;
    padding: 25px;
`

export const ModalsContext = React.createContext([])

export const Modal = ({ icon = '', title = '', children = '', close = () => {}, toHide = false }) => {
    return (
        <StyledModal $toHide={toHide}>
            <StyledBar>
                {icon || <span></span>}
                <span className="title">{title}</span>
                <button className="closeButton" onClick={close}>
                    <FiX />
                </button>
            </StyledBar>
            <StyledContent>{children}</StyledContent>
        </StyledModal>
    )
}

export const ModalGroup = () => {
    const [modals] = React.useContext(ModalsContext)
    const modalHook = useModal()
    const [showCurtain, setShowCuratin] = React.useState(false)

    React.useEffect(() => {
        if (modals.length == 0) {
            setTimeout(() => setShowCuratin(false), 200)
        } else {
            setShowCuratin(true)
        }
    }, [modals])

    return (
        <>
            {showCurtain && <Curtain toHide={modals.length === 0} />}
            {modals.map((modal) => {
                const { icon, ...modalProps } = modal
                return (
                    <Modal icon={icon} key={modalProps.id} {...modalProps} close={() => modalHook.hide(modalProps.id)}>
                        <modal.form {...modalProps} />
                    </Modal>
                )
            })}
        </>
    )
}

export const ModalLayer = ({ next }) => {
    const [modals, setModals] = React.useState([])
    return (
        <ModalsContext.Provider value={[modals, setModals]}>
            <ModalGroup />
            {next}
        </ModalsContext.Provider>
    )
}

ModalLayer.propTypes = {
    next: PropTypes.any
}

Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.element,
    icon: PropTypes.element,
    close: PropTypes.func,
    toHide: PropTypes.bool
}
