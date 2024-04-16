import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { Button, Form, Input, Link, Typography } from '../../components/atoms'
import { useForm, useMessage } from '../../utils/hooks'
import { ENDPOINTS } from '../../api/endpoints'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../router/routes'
import { Flex, Wrapper } from '../../components/style'
import { useUser } from '../../user/User'

export const SignInPage = () => {
    const navigate = useNavigate()
    const message = useMessage()
    const [, reloadUserData] = useUser()

    const form = useForm({
        url: ENDPOINTS.SIGNIN,
        onAnswer: (data) => {
            if (data.data.success) {
                reloadUserData()
                navigate(ROUTES.HOME.LINK())
                message.create({ text: 'Login successful!', mode: 'success' })
            } else {
                message.create({ text: 'Bad username or password!', mode: 'error' })
            }
        }
    })

    return (
        <MainTemplate title="Sign In">
            <Flex width="100%" row justifyContent="center" alignItems="center" height="100vh">
                <Wrapper minWidth={'400px'}>
                    <Form column alignItems="stretch" justifyContent="center">
                        <Typography variant="h1">SIGN IN</Typography>
                        <Input label="Username" {...form.register('username')} />
                        <Input label="Password" type="password" {...form.register('password')} />
                        <Button {...form.submitButton}>SIGN IN</Button>
                        <Link to={ROUTES.SIGNUP.LINK()}>SIGN UP</Link>
                    </Form>
                </Wrapper>
            </Flex>
        </MainTemplate>
    )
}
