import React from 'react'
import { MainTemplate } from '../templates/MainTemplate'
import { ChessBoard } from '../components/organisms/ChessBoard'
import { GamePanel } from '../components/organisms/GamePanel'
import styled from 'styled-components'
import { Board } from '../game/Chess'
import { useLoading, useMessage, useReload } from '../utils/hooks'
import { FETCH, useWebsocket } from '../api/api'
import { ENDPOINTS, WEBSOCKET_ENDPOINTS } from '../api/endpoints'
import { useNavigate, useParams } from 'react-router'
import { ROUTES } from '../router/routes'
import { Loading } from '../components/atoms'

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
    height: 100vh;
    width: 100%;
`

const StyledPlayer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 30px;
    padding: 0 30px;
    h1 {
        margin: 0;
        color: ${({ theme }) => theme.colors.darkColor};
        font-size: 30px;
        font-weight: 900;
    }
`

export const GamePage = () => {
    const reload = useReload()
    const [hiddenRightPanel, setHiddenRightPanel] = React.useState(false)
    const { id } = useParams()
    const [playing, setPlaying] = React.useState(false)
    const navigate = useNavigate()
    const message = useMessage()
    const loading = useLoading(true)
    const [gameParams, setGameParams] = React.useState(null)
    const board = React.useRef(new Board(id))

    const { websocket } = useWebsocket(WEBSOCKET_ENDPOINTS.GAME, {
        onOpen: () => {
            websocket.send(
                JSON.stringify({
                    gameId: id
                })
            )
        },
        onMessage: (event) => {
            const data = JSON.parse(event.data)
            if (data.moveAlgebraic && board.current.gameClient.notatedMoves[data.moveAlgebraic]) {
                board.current.gameClient.move(data.moveAlgebraic)
            }
            if (data.message) {
                message.create({ text: data.message, mode: data.mode ? data.mode : 'normal' })
            }
            reload.next()
        }
    })

    React.useEffect(() => {
        if (gameParams) {
            board.current = new Board(id)
            board.current.setWebsocket(websocket)
            board.current.setPlayer(gameParams.your_color)
            gameParams.moves.forEach((move) => {
                board.current.gameClient.move(move)
            })
            reload.next()
            loading.stop()
        }
    }, [gameParams])

    React.useEffect(() => {
        if (playing) {
            FETCH(ENDPOINTS.GET_GAME_PARAMS, { id }).then((data) => {
                if (data.data.error) {
                    message.create({ text: data.data.error, mode: 'error' })
                    navigate(ROUTES.HOME.LINK())
                } else {
                    setGameParams(data.data)
                }
            })
        }
    }, [playing])

    React.useEffect(() => {
        FETCH(ENDPOINTS.GET_GAME_STATUS, { id }).then((data) => {
            if (data.data.gameId == null) {
                navigate(ROUTES.HOME.LINK())
            }
            if (data.data.players === 1 && data.data.you_in_game === false) {
                FETCH(ENDPOINTS.JOIN_TO_GAME, { id }).then((data) => {
                    if (!data.data.you_in_game) navigate(ROUTES.HOME.LINK())
                    setPlaying(true)
                })
            } else if (data.data.you_in_game) {
                setPlaying(true)
            }
        })
    }, [id])

    return (
        <MainTemplate title="Game">
            {playing && (
                <>
                    <StyledWrapper>
                        {loading.is && <Loading />}
                        {!loading.is && (
                            <>
                                <StyledPlayer>
                                    <h1>{gameParams.your_color == 'white' ? gameParams.black.username : gameParams.white.username}</h1>
                                    <h1>00:00</h1>
                                </StyledPlayer>
                                <ChessBoard canMoveOnly={gameParams.your_color} black={gameParams.your_color === 'black'} board={board.current} reload={reload} />
                                <StyledPlayer>
                                    <h1>{gameParams.your_color == 'white' ? gameParams.white.username : gameParams.black.username}</h1>
                                    <h1>00:00</h1>
                                </StyledPlayer>
                            </>
                        )}
                    </StyledWrapper>
                    <GamePanel board={board.current} reload={reload} hidden={hiddenRightPanel} setHidden={setHiddenRightPanel} />
                </>
            )}
        </MainTemplate>
    )
}
