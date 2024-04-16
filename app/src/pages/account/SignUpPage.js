import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { Button, Form, Input, Link, Typography } from '../../components/atoms'
import { useForm, useMessage } from '../../utils/hooks'
import { Flex, Wrapper } from '../../components/style'
import { ROUTES } from '../../router/routes'
import { useNavigate } from 'react-router-dom'
import { ENDPOINTS } from '../../api/endpoints'
import { useUser } from '../../user/User'

export const SignUpPage = () => {
    const message = useMessage()
    const navigate = useNavigate()
    const [, reloadUserData] = useUser()
    const form = useForm({
        url: ENDPOINTS.SIGNUP,
        onAnswer: (data) => {
            if (data.data.error) {
                message.create({ text: data.data.error, mode: 'error' })
            } else {
                message.create({ text: 'Account created!', mode: 'success' })
                reloadUserData()
                navigate(ROUTES.HOME.LINK())
            }
        }
    })

    return (
        <MainTemplate title="Sign up">
            <Flex width="100%" row justifyContent="center" alignItems="center" height="100vh">
                <Wrapper minWidth={'400px'}>
                    <Form column alignItems="stretch" justifyContent="center">
                        <Typography variant="h1">SIGN UP</Typography>
                        <Input label="Username" {...form.register('username')} />
                        <Input label="E-mail" {...form.register('email')} />
                        <Input label="First Name" {...form.register('first_name')} />
                        <Input label="Last Name" {...form.register('last_name')} />
                        <Input label="Password" type="password" {...form.register('password1')} />
                        <Input label="Password Again" type="password" {...form.register('password2')} />
                        <Button {...form.submitButton}>SIGN UP</Button>
                        <Link to={ROUTES.SIGNIN.LINK()}>SIGN IN</Link>
                    </Form>
                </Wrapper>
            </Flex>
        </MainTemplate>
    )
}
