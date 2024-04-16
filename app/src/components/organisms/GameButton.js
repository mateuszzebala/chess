import PropTypes from 'prop-types'
import styled from 'styled-components'
import String from 'string'
import { FaRegChessRook, FaRegClock, FaRegUser } from 'react-icons/fa6'
import { useNavigate } from 'react-router'
import { ROUTES } from '../../router/routes'

const StyledButton = styled.button`
    background-color: ${({ theme }) => theme.colors.lightColor};
    border: 0;
    padding: 15px;
    font-size: 18px;
    border-radius: 8px;
    font-weight: bold;
    display: inline-flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
    justify-content: space-between;
    cursor: pointer;
    outline: 0 solid ${({ theme }) => theme.colors.greyColor}88;
    transition: outline-width 0.1s;
    &:hover,
    &:focus {
        background-color: ${({ theme }) => theme.colors.greyColor};
        outline-width: 5px;
    }
    span {
        display: inline-flex;
        gap: 10px;
        align-items: center;
    }
`

export const GameButton = ({ game, onClick }) => {
    const navigate = useNavigate()

    const handleGoToGame = () => {
        onClick()
        navigate(ROUTES.GAME.LINK(game.id))
    }

    return (
        <StyledButton onClick={handleGoToGame}>
            <span>
                <FaRegUser /> {game.player}
            </span>
            <span>
                <FaRegClock /> {game.time} minutes
            </span>
            <span>
                <FaRegChessRook /> {String(game.color).capitalize().toString()}
            </span>
        </StyledButton>
    )
}

GameButton.propTypes = {
    game: PropTypes.any,
    onClick: PropTypes.func
}
