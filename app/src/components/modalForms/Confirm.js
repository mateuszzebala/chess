import { Button, Typography } from '../atoms'
import PropTypes from 'prop-types'
import { Flex, Wrapper } from '../style'

export const Confirm = ({ submit, text }) => {
    return (
        <Flex column>
            {text && (
                <Wrapper maxWidth={300}>
                    <Flex row>
                        <Typography align="center" variant="span" fontSize={22}>
                            {text}
                        </Typography>
                    </Flex>
                </Wrapper>
            )}
            <Flex row equalSize>
                <Button secondary width100 onClick={() => submit(false)}>
                    NO
                </Button>
                <Button width100 onClick={() => submit(true)}>
                    YES
                </Button>
            </Flex>
        </Flex>
    )
}

Confirm.propTypes = {
    submit: PropTypes.func,
    text: PropTypes.string
}
