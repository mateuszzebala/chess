import styled from 'styled-components'
import { FiHome, FiPieChart, FiPlus, FiToggleRight, FiUserCheck, FiUserMinus, FiUserPlus } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../router/routes'
import { FaChessRook, FaRegChessRook } from 'react-icons/fa6'
import { useModal } from '../../utils/hooks'
import { NewGamePanel } from './NewGamePanel'
import { useUser } from '../../user/User'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'

const StyledNavBar = styled.div`
    height: 100vh;
    background-color: ${({ theme }) => theme.colors.lightColor};
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
    box-shadow: 0 0 40px -20px ${({ theme }) => theme.colors.darkColor};
`

const StyledIcon = styled.div`
    font-size: 60px;
    color: ${({ theme }) => theme.colors.darkColor};
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const StyledLinks = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`

const StyledLink = styled.button`
    display: flex;
    flex-direction: column;
    gap: 10px;
    cursor: pointer;
    font-size: 35px;
    background-color: transparent;
    border: 0;
    width: 100px;
    aspect-ratio: 1/1;
    align-items: center;
    justify-content: center;
    transition:
        background-color 0.2s,
        outline-width 0.2s;
    border-radius: 10px;
    outline: 0 solid ${({ theme }) => theme.colors.greyColor}88;
    &:hover,
    &:focus {
        background-color: ${({ theme }) => theme.colors.greyColor};
        outline-width: 5px;
    }
    span {
        font-size: 15px;
        text-transform: uppercase;
    }
`

export const NavBar = () => {
    const navigate = useNavigate()
    const modal = useModal()

    const [user, setUser] = useUser()

    return (
        <StyledNavBar>
            <StyledIcon onClick={() => navigate(ROUTES.HOME.LINK())}>
                <FaRegChessRook />
            </StyledIcon>
            <StyledLinks>
                {user.is_logged_in ? (
                    <>
                        <StyledLink onClick={() => navigate(ROUTES.HOME.LINK())}>
                            <FiHome />
                            <span>Home</span>
                        </StyledLink>
                        <StyledLink onClick={() => modal.create({ title: 'Create a new game!', icon: <FaChessRook />, form: NewGamePanel })}>
                            <FiPlus />
                            <span>Game</span>
                        </StyledLink>
                        <StyledLink>
                            <FiPieChart />
                            <span>Stats</span>
                        </StyledLink>
                        <StyledLink onClick={() => navigate(ROUTES.OPTIONS.LINK())}>
                            <FiToggleRight />
                            <span>Options</span>
                        </StyledLink>
                        <StyledLink
                            onClick={() => {
                                FETCH(ENDPOINTS.SIGNOUT).then(() => {
                                    setUser({})
                                    navigate(ROUTES.HOME.LINK())
                                })
                            }}>
                            <FiUserMinus />
                            <span>SIGN OUT</span>
                        </StyledLink>
                    </>
                ) : (
                    <>
                        <StyledLink onClick={() => navigate(ROUTES.SIGNIN.LINK())}>
                            <FiUserCheck />
                            <span>SIGN IN</span>
                        </StyledLink>
                        <StyledLink onClick={() => navigate(ROUTES.SIGNUP.LINK())}>
                            <FiUserPlus />
                            <span>SIGN UP</span>
                        </StyledLink>
                    </>
                )}
            </StyledLinks>
            <span></span>
        </StyledNavBar>
    )
}

NavBar.propTypes = {}
