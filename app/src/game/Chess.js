import { FaRegChessQueen, FaRegChessBishop, FaRegChessKing, FaRegChessPawn, FaRegChessKnight, FaRegChessRook } from 'react-icons/fa6'
import chessLib from 'chess'
import { capture as captureAudio, move as moveAudio, castle as castleAudio, check as checkAudio } from './AudioPlayer'

export const Pieces = {
    queen: { name: 'Queen', weight: 8, icon: <FaRegChessQueen /> },
    king: { name: 'King', weight: 0, icon: <FaRegChessKing /> },
    bishop: { name: 'Bishop', weight: 3, icon: <FaRegChessBishop /> },
    knight: { name: 'Knight', weight: 3, icon: <FaRegChessKnight /> },
    pawn: { name: 'Pawn', weight: 1, icon: <FaRegChessPawn /> },
    rook: { name: 'Rook', weight: 5, icon: <FaRegChessRook /> },
    empty: { name: 'Empty', weight: null, icon: '' }
}

export const numbersToPositionString = (column, row) => {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    return `${letters[column]}${row}`
}

export class Board {
    constructor(id) {
        this.id = id
        this.player = null
        this.moveOf = 'white'
        this.gameClient = chessLib.create({ PGN: true })
        this.listOfMoves = []
        this.gameClient.on('move', this.onMove.bind(this))
        this.gameClient.on('capture', this.onCapture.bind(this))
        this.gameClient.on('check', this.onCheck.bind(this))
        this.gameClient.on('castle', this.onCastle.bind(this))
    }

    setPlayer(player) {
        this.player = player
    }

    setWebsocket(websocket) {
        this.websocket = websocket
    }

    onCapture() {
        captureAudio()
    }
    onCheck() {
        checkAudio()
    }
    onCastle() {
        castleAudio()
    }

    onMove(move) {
        this.websocket.send(
            JSON.stringify({
                moveAlgebraic: move.algebraic,
                option: 'move',
                color: this.player,
                gameId: this.id,
                moveOf: this.moveOf
            })
        )
        this.listOfMoves.push({ algebraic: move.algebraic, name: move.postSquare.piece.type, color: move.postSquare.piece.side.name })
        this.playAudio(move)
    }

    toggleMove() {
        this.moveOf = this.moveOf == 'white' ? 'black' : 'white'
    }

    isMyMove() {
        return this.moveOf === this.player
    }

    getSquare(column, row) {
        const status = this.gameClient.getStatus()
        return status.board.squares[row * 8 + column]
    }

    getSquareAndIcon(letter, number) {
        const status = this.gameClient.getStatus()
        const square = status.board.squares.find((sqr) => sqr.file == letter && sqr.rank == number + 1)
        return {
            square,
            icon: square.piece ? getIconByPiece(square.piece.type) : null
        }
    }
    playAudio() {
        moveAudio()
    }
}

export const getIconByPiece = (piece) => {
    return Object.values(Pieces).find((p) => p.name.toLowerCase() === piece.toLowerCase()).icon
}
