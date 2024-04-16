import styled from 'styled-components'
import React from 'react'
import PropTypes from 'prop-types'
import { Button, Typography } from '../atoms'
import { ButtonGroup } from '../atoms/ButtonGroup'
import { Flex, Padding } from '../style'
import { Scroll } from '../style/Scroll'
import { useInterval } from '../../utils/hooks'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'
import { GameButton } from './GameButton'
import { useNavigate } from 'react-router'
import { ROUTES } from '../../router/routes'

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

const StyledContent = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap: 30px;
    transition: min-width 0.2s;
    padding: 20px;
    overflow: hidden;
`

export const NewGamePanel = ({ submit }) => {
    const [color, setColor] = React.useState('random')
    const [tab, setTab] = React.useState('existing')
    const [time, setTime] = React.useState(10)
    const [waitingForOpponent, setWaitingForOpponent] = React.useState(false)
    const [freeGames, setFreeGames] = React.useState([])
    const [gameId, setGameId] = React.useState(null)
    const navigate = useNavigate()

    const handleRefresh = () => {
        if (tab == 'existing') {
            FETCH(ENDPOINTS.GET_FREE_GAMES).then((data) => {
                setFreeGames(data.data.games)
            })
        }
    }

    React.useEffect(() => {
        if (gameId != null) {
            const interval = setInterval(() => {
                FETCH(ENDPOINTS.GET_GAME_STATUS, { id: gameId }).then((data) => {
                    if (data.data.gameId == null) navigate(ROUTES.HOME.LINK())

                    if (data.data.players > 1) {
                        submit()
                        navigate(ROUTES.GAME.LINK(gameId))
                    }
                })
            }, 1000)
            return () => clearInterval(interval)
        }
    }, [gameId])

    useInterval(handleRefresh, 1000)

    React.useEffect(handleRefresh, [])

    const handleCreateGame = () => {
        FETCH(ENDPOINTS.CREATE_NEW_GAME, {
            time,
            color: color
        }).then((data) => {
            setGameId(data.data.gameId)
        })
        setWaitingForOpponent(true)
    }

    const handleCancelCreateGame = () => {
        FETCH(ENDPOINTS.CANCEL_NEW_GAME, {
            id: gameId
        }).then(() => {
            setGameId(null)
        })
        setWaitingForOpponent(false)
    }

    return (
        <StyledWrapper>
            <StyledContent>
                <ButtonGroup disabled={waitingForOpponent} buttons={{ existing: 'Existing', create: 'Create' }} value={tab} setValue={setTab} />
                {tab === 'create' && (
                    <Flex column alignItems="stretch">
                        <ButtonGroup disabled={waitingForOpponent} buttons={{ white: 'White', random: 'Random', black: 'Black' }} value={color} setValue={setColor} />
                        <ButtonGroup disabled={waitingForOpponent} buttons={{ 3: '3min', 10: '10min', 30: '30min' }} value={time} setValue={setTime} />
                        <Button loading={waitingForOpponent} onClick={handleCreateGame}>
                            CREATE GAME
                        </Button>
                        {waitingForOpponent && (
                            <Typography variant="h3" align="center">
                                Waiting for opponent...
                            </Typography>
                        )}
                        {waitingForOpponent && (
                            <Button secondary onClick={handleCancelCreateGame}>
                                CANCEL
                            </Button>
                        )}
                    </Flex>
                )}
                {tab === 'existing' && (
                    <>
                        <Scroll>
                            <Padding>
                                <Flex column alignItems="stretch" gap={8}>
                                    {freeGames.map((game) => {
                                        return <GameButton onClick={submit} key={game.id} game={game} />
                                    })}
                                    {freeGames.length === 0 ? <Typography variant="h3">There is no game :(</Typography> : ''}
                                </Flex>
                            </Padding>
                        </Scroll>
                    </>
                )}
            </StyledContent>
        </StyledWrapper>
    )
}

NewGamePanel.propTypes = {
    submit: PropTypes.func
}
