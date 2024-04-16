import { FaRegChessBishop, FaRegChessKnight, FaRegChessQueen, FaRegChessRook } from 'react-icons/fa6'
import { Flex } from '../style'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledPiece = styled.button`
    color: ${({ theme }) => theme.colors.darkColor};
    background-color: transparent;
    border: 0;
    font-size: 60px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    padding: 20px;
    border-radius: 10px;
    transition: background-color 0.2s;
    &:hover {
        background-color: ${({ theme }) => theme.colors.greyColor};
    }
    span {
        font-size: 20px;
    }
`

export const ChooseAPiece = ({ submit }) => {
    return (
        <Flex row>
            <StyledPiece onClick={() => submit('knight')}>
                <FaRegChessKnight />
                <span>Knight</span>
            </StyledPiece>
            <StyledPiece onClick={() => submit('bishop')}>
                <FaRegChessBishop />
                <span>Bishop</span>
            </StyledPiece>
            <StyledPiece onClick={() => submit('rook')}>
                <FaRegChessRook />
                <span>Rook</span>
            </StyledPiece>
            <StyledPiece onClick={() => submit('queen')}>
                <FaRegChessQueen />
                <span>Queen</span>
            </StyledPiece>
        </Flex>
    )
}
ChooseAPiece.propTypes = {
    submit: PropTypes.func
}
