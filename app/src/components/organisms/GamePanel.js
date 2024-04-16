import styled from 'styled-components'
import { Button } from '../atoms'
import { Flex } from '../style'
import React from 'react'
import { Scroll } from '../style/Scroll'
import { Confirm } from '../modalForms'
import { useModal } from '../../utils/hooks'
import { FaChessBoard } from 'react-icons/fa6'
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md'
import PropTypes from 'prop-types'

const StyledWrapper = styled.div`
    background-color: ${({ theme }) => theme.utils.greyColor};
    box-shadow: ${({ theme }) => theme.utils.normalBoxShadow};
    transition:
        transform 0.2s,
        width 0.2s,
        min-width 0.2s;
    transform: translateX(${({ $hidden }) => ($hidden ? '100%' : '0')});
    width: ${({ $hidden }) => ($hidden ? '0px' : 'auto')};
    min-width: ${({ $hidden }) => ($hidden ? '0px' : '400px')};
`

const StyledHideButton = styled.button`
    position: fixed;
    top: 50%;
    left: -40px;
    font-size: 30px;
    box-shadow: ${({ theme }) => theme.utils.normalBoxShadow};
    width: 40px;
    border: 0;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px 0 0 10px;
    cursor: pointer;
    height: 50px;

    transition: background-color 0.2s;
    background-color: ${({ theme }) => theme.colors.lightColor};
    outline: 0 solid ${({ theme }) => theme.colors.greyColor};
    &:hover,
    &:focus {
        background-color: ${({ theme }) => theme.colors.greyColor};
    }
    > svg {
        transition: transform 0.2s;
        transform: rotate(${({ $hidden }) => ($hidden ? '180deg' : '0deg')});
    }
`

const StyledMoves = styled.table`
    width: 100%;
    border-collapse: collapse;
`

const StyledMove = styled.tr`
    color: ${({ $color, theme }) => ($color == 'white' ? theme.colors.pieces.white : theme.colors.pieces.black)};
    td {
        max-height: 40px;
        width: 50%;
        padding: 10px;
        border: 3px solid ${({ theme }) => theme.colors.darkColor};
        text-align: center;
        vertical-align: center;
        font-weight: bold;
    }
`

const StyledContent = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: 30px;
    transition: min-width 0.2s;
    min-width: ${({ $hidden }) => ($hidden ? '0' : '400px')};
    padding: 20px;
    height: 100vh;
    overflow: hidden;
`

export const GamePanel = ({ hidden, setHidden, reload, board }) => {
    const [moves, setMoves] = React.useState([])

    const modal = useModal()

    React.useEffect(() => {
        setMoves(board.listOfMoves)
    }, [reload])

    return (
        <StyledWrapper $hidden={hidden}>
            <StyledHideButton $hidden={hidden} onClick={() => setHidden((prev) => !prev)}>
                <MdOutlineKeyboardDoubleArrowRight />
            </StyledHideButton>
            <StyledContent $hidden={hidden}>
                <Scroll>
                    <StyledMoves>
                        <tbody>
                            {moves.map((move, index) => (
                                <StyledMove $color={move.color} key={index}>
                                    <td>{move.name}</td>
                                    <td>{move.algebraic}</td>
                                </StyledMove>
                            ))}
                        </tbody>
                    </StyledMoves>
                </Scroll>
                <Flex row gap={10}>
                    <Button
                        onClick={() => {
                            modal.create({
                                form: Confirm,
                                title: 'DRAW',
                                text: 'Are you sure you want to propose a draw?',
                                icon: <FaChessBoard />,
                                submit: () => {}
                            })
                        }}
                        secondary>
                        Draw?
                    </Button>
                    <Button
                        onClick={() => {
                            modal.create({
                                form: Confirm,
                                title: 'RESIGN',
                                text: 'Are you sure you want to resign?',
                                icon: <FaChessBoard />,
                                submit: () => {}
                            })
                        }}>
                        Resign!
                    </Button>
                </Flex>
            </StyledContent>
        </StyledWrapper>
    )
}

GamePanel.propTypes = {
    hidden: PropTypes.bool,
    setHidden: PropTypes.func,
    reload: PropTypes.any,
    board: PropTypes.any
}
