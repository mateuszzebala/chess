import { range } from 'range'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import React from 'react'
import { Board } from '../../game/Chess'
import { useModal, useWindowEvent } from '../../utils/hooks'
import { ChooseAPiece } from '../modalForms/ChooseAPiece'
import { FaChessBoard } from 'react-icons/fa6'

const StyledChessBoard = styled.div`
    width: 700px;
    background-color: white;
    display: grid;
    grid-template-columns: repeat(8, calc(100% / 8));
    grid-template-rows: repeat(8, calc(100% / 8));
    box-shadow:
        ${({ theme }) => theme.utils.lightBoxShadow},
        0 0 100px -50px black;
    overflow: hidden;
    aspect-ratio: 1/1;
    border-radius: 30px;
    position: relative;
`

const StyledChessField = styled.div`
    background-color: ${({ $isWhite, theme }) => ($isWhite ? theme.colors.lightColor : theme.colors.darkColor)};
    transition: background-color 0.1s;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 60px;
    cursor: pointer;

    div {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    & svg {
        color: ${({ $pieceColor, theme }) => ($pieceColor == 'white' ? theme.colors.pieces.white : theme.colors.pieces.black)};
    }

    &:hover {
        background-color: ${({ $isWhite, theme }) => ($isWhite ? theme.colors.greyColor : theme.colors.greyerColor)};
    }
`

const StyledPiece = styled.div`
    position: absolute;
    top: ${({ $position }) => $position.y}px;
    left: ${({ $position }) => $position.x}px;
    width: ${({ $size }) => $size}px;
    height: ${({ $size }) => $size}px;
    span {
        font-size: 10px;
    }
`

const StyledDropPoint = styled.div`
    @keyframes anim {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(0.8);
        }
        100% {
            transform: scale(1);
        }
    }
    animation: anim 0.7s infinite ease-in-out;
    width: 45px;
    height: 45px;
    background-color: ${({ theme, $isWhite }) => ($isWhite ? theme.colors.greyerColor + '55' : theme.colors.greyColor + 'cc')};
    border-radius: 50%;
    box-shadow: 0 0 20px -10px ${({ theme }) => theme.colors.greyerColor};
`

const ChessField = ({
    canMoveOnly,
    activePiece,
    setActivePiece,
    board,
    letter,
    number,
    reverse,
    boardRect,
    showDropPoint,
    defaultPosition,
    column,
    row,
    onDropPieceOnOtherSquare,
    reload,
    reloadRect
}) => {
    const { square, icon } = board.getSquareAndIcon(letter, number, reverse)
    const [piecePosition, setPiecePosition] = React.useState(defaultPosition)
    const pieceRef = React.useRef()
    const [moving, setMoving] = React.useState(false)

    React.useEffect(() => {
        setPiecePosition(defaultPosition)
    }, [reload])

    const handleMouseMove = ({ clientX, clientY }) => {
        if (moving) {
            setPiecePosition({ x: clientX - boardRect.x - boardRect.width / 16, y: clientY - boardRect.y - boardRect.height / 16 })
        }
    }

    const handleMouseDown = () => {
        if (canMoveOnly == 'all' || canMoveOnly == square.piece.side.name) {
            reloadRect()
            setMoving(true)
            setActivePiece(square)
        }
    }

    const handleMouseUp = ({ clientX, clientY }) => {
        if (moving) {
            onDropPieceOnOtherSquare({
                x: Math.floor(((clientX - boardRect.x) / boardRect.width) * 8),
                y: Math.floor(((clientY - boardRect.y) / boardRect.width) * 8),
                square: square
            })
        }
        setMoving(false)
    }

    React.useEffect(() => {
        if (!moving) return
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseup', handleMouseUp)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp)
        }
    }, [moving])

    const handleSquareClick = ({ clientX, clientY }) => {
        if (activePiece) {
            onDropPieceOnOtherSquare({
                x: Math.floor(((clientX - boardRect.x) / boardRect.width) * 8),
                y: Math.floor(((clientY - boardRect.y) / boardRect.width) * 8),
                square: activePiece
            })
        }
    }

    return (
        <StyledChessField onClick={handleSquareClick} $pieceColor={square.piece ? square.piece.side.name : 'white'} $isWhite={!((column + row) % 2)}>
            {square && square.piece && (
                <StyledPiece onMouseDown={handleMouseDown} ref={pieceRef} $size={boardRect.width / 8} $position={piecePosition}>
                    {icon}
                </StyledPiece>
            )}
            {showDropPoint && <StyledDropPoint $isWhite={!((column + row) % 2)} />}
        </StyledChessField>
    )
}

ChessField.propTypes = {
    activePiece: PropTypes.any,
    setActivePiece: PropTypes.func,
    reverse: PropTypes.bool,
    board: PropTypes.instanceOf(Board),
    boardRect: PropTypes.any,
    letter: PropTypes.string,
    column: PropTypes.any,
    row: PropTypes.any,
    number: PropTypes.number,
    defaultPosition: PropTypes.any,
    onDropPieceOnOtherSquare: PropTypes.func,
    reload: PropTypes.any,
    showDropPoint: PropTypes.bool,
    reloadRect: PropTypes.func,
    canMoveOnly: PropTypes.string
}

export const ChessBoard = ({ black = false, board, reload, canMoveOnly = 'all' }) => {
    const boardRef = React.useRef()
    const [boardRect, setBoardRect] = React.useState({})
    const modal = useModal()
    const [columnRange] = React.useState(black ? ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].reverse() : ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'])
    const [rowRange] = React.useState(!black ? range(7, -1, -1) : range(0, 8))
    const [possibleMoves, setPossibleMoves] = React.useState([])
    const [activePiece, setActivePiece] = React.useState(null)

    React.useEffect(() => {
        if (!activePiece) {
            setPossibleMoves([])
            return
        }
        const moves = board.gameClient.validMoves.filter((move) => move.src.file == activePiece.file && move.src.rank == activePiece.rank)
        setPossibleMoves(moves ? (moves[0] ? moves[0].squares : []) : [])
    }, [activePiece])

    React.useEffect(() => {
        window.addEventListener('resize', () => {
            reload.next()
            reloadRect()
        })
    }, [])

    useWindowEvent('click', ({ clientX, clientY }) => {
        if (clientX < boardRect.x) setActivePiece(null)
        if (clientY < boardRect.y) setActivePiece(null)
        if (clientY > boardRect.bottom) setActivePiece(null)
        if (clientX > boardRect.right) setActivePiece(null)
    })

    const reloadRect = () => {
        setBoardRect(boardRef.current ? boardRef.current.getBoundingClientRect() : {})
    }

    React.useEffect(reloadRect, [boardRef])

    const squareSize = boardRect.width / 8

    return (
        <StyledChessBoard ref={boardRef}>
            {boardRect &&
                rowRange.map((number, row) => (
                    <React.Fragment key={number}>
                        {columnRange.map((letter, column) => (
                            <ChessField
                                canMoveOnly={canMoveOnly}
                                reload={reload}
                                defaultPosition={{
                                    x: column * squareSize,
                                    y: row * squareSize
                                }}
                                boardRect={boardRect}
                                reloadRect={reloadRect}
                                reverse={black}
                                column={column}
                                row={row}
                                key={`${letter}${number}`}
                                letter={letter}
                                number={number}
                                showDropPoint={!!possibleMoves.find((square) => square.file == letter && square.rank == number + 1)}
                                board={board}
                                onDropPieceOnOtherSquare={({ x, y, square: { file, rank } }) => {
                                    if (isNaN(x) || isNaN(y)) return
                                    if (x < 0 || x > 7 || y < 0 || y > 7) {
                                        reload.next()
                                        return
                                    }
                                    let letter, number
                                    if (!black) {
                                        letter = 'abcdefgh'.charAt(x)
                                        number = Math.abs(y - 8)
                                    } else {
                                        letter = 'hgfedcba'.charAt(x)
                                        number = y + 1
                                    }
                                    let modalIsOpen = false

                                    Object.keys(board.gameClient.notatedMoves).forEach((moveCode) => {
                                        const move = board.gameClient.notatedMoves[moveCode]
                                        if (!move) return
                                        const { dest, src } = move
                                        if (src.file == file && src.rank == rank) {
                                            if (dest.file == letter && dest.rank == number) {
                                                if (!modalIsOpen && (moveCode.endsWith('R') || moveCode.endsWith('Q') || moveCode.endsWith('N') || moveCode.endsWith('B'))) {
                                                    modalIsOpen = true
                                                    modal.create({
                                                        title: 'CHOOSE A PIECE',
                                                        form: ChooseAPiece,
                                                        submit: (piece) => {
                                                            const mv = moveCode.substring(0, moveCode.length - 1)
                                                            if (piece == 'knight') board.gameClient.move(mv + 'N')
                                                            if (piece == 'queen') board.gameClient.move(mv + 'Q')
                                                            if (piece == 'bishop') board.gameClient.move(mv + '=B')
                                                            if (piece == 'rook') board.gameClient.move(mv + 'R')
                                                            setPossibleMoves([])
                                                        },
                                                        icon: <FaChessBoard />
                                                    })
                                                } else if (!modalIsOpen) {
                                                    board.gameClient.move(moveCode)
                                                    setPossibleMoves([])
                                                }
                                            }
                                        }
                                    })
                                    reload.next()
                                }}
                                activePiece={activePiece}
                                setActivePiece={setActivePiece}
                            />
                        ))}
                    </React.Fragment>
                ))}
        </StyledChessBoard>
    )
}

ChessBoard.propTypes = {
    black: PropTypes.bool,
    board: PropTypes.instanceOf(Board),
    reload: PropTypes.any,
    canMoveOnly: PropTypes.string
}
