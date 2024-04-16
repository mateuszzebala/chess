import { Button, Input, Typography } from '../atoms'
import PropTypes from 'prop-types'
import { Flex, Wrapper } from '../style'
import React from 'react'

export const Prompt = ({ submit, text, ...props }) => {
    const [value, setValue] = React.useState('')
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
            <Flex row alignItems="center">
                <Input {...props} value={value} setValue={setValue} /> <Button onClick={submit}>OK</Button>
            </Flex>
        </Flex>
    )
}

Prompt.propTypes = {
    submit: PropTypes.func,
    text: PropTypes.string
}
