import PropTypes from 'prop-types'
import { Flex, Wrapper } from '../style'
import styled from 'styled-components'
import { FaCrown, FaRegSadTear } from 'react-icons/fa'
import { Button } from '../atoms'

const StyledBg = styled.div`
    background-color: ${({ $win, theme }) => ($win ? theme.colors.successColor : theme.colors.greyColor)};
    color: ${({ theme }) => theme.colors.darkColor};
    padding: 20px;
    border-radius: 10px;
    h1 {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        flex-direction: column;
        font-size: 40px;
        font-weight: 900;
    }
`

export const EndGame = ({ win = true, submit }) => {
    return (
        <Wrapper minWidth={'400px'}>
            <Flex column alignItems="stretch">
                <StyledBg $win={win}>
                    <Flex column>
                        <h1>
                            {win ? (
                                <>
                                    <FaCrown />
                                    You win!
                                </>
                            ) : (
                                <>
                                    <FaRegSadTear />
                                    You lose!
                                </>
                            )}
                        </h1>
                    </Flex>
                </StyledBg>
                <Flex row equalSize>
                    <Button onClick={() => submit('rematch')} secondary>
                        REMATCH
                    </Button>
                    <Button onClick={() => submit('homepage')}>HOME PAGE</Button>
                </Flex>
            </Flex>
        </Wrapper>
    )
}

EndGame.propTypes = {
    win: PropTypes.bool,
    submit: PropTypes.func
}
