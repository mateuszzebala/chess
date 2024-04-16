import React from 'react'
import { MainTemplate } from '../templates/MainTemplate'
import { Button, Form, Input, Typography } from '../components/atoms'
import { useForm, useMessage } from '../utils/hooks'
import { ENDPOINTS } from '../api/endpoints'
import { Flex, Padding, Wrapper } from '../components/style'
import { ButtonGroup } from '../components/atoms/ButtonGroup'
import { useUser } from '../user/User'

export const OptionsPage = () => {
    const [tab, setTab] = React.useState('account')
    const [user] = useUser()
    const message = useMessage()
    const changeDataForm = useForm({
        url: ENDPOINTS.CHANGE_ACCOUNT_INFO,
        onAnswer: (data) => {
            data.data.error && message.create({ text: data.data.error, mode: 'error' })
            !data.data.error && message.create({ text: 'Data saved!', mode: 'success' })
        }
    })

    const changePasswordForm = useForm({
        url: ENDPOINTS.CHANGE_ACCOUNT_PASSWORD,
        onAnswer: (data) => {
            if (!data.data.error) {
                changePasswordForm.clear()
                message.create({ text: 'Password changed!', mode: 'success' })
            } else {
                changePasswordForm.setError(data.data.error)
                message.create({ text: data.data.error, mode: 'error' })
            }
        }
    })

    return (
        <MainTemplate title="Options">
            <Flex column justifyContent="space-between" height="100vh">
                <Padding value={40}>
                    <Wrapper minWidth={800}>
                        <Flex column>
                            <ButtonGroup buttons={{ account: 'Change Account Data', password: 'Change Password', game: 'Game Options' }} value={tab} setValue={setTab} />
                            {user && tab == 'account' && (
                                <Form onSubmit={changeDataForm.onSubmit} column>
                                    <Typography variant="h1">ACCOUNT</Typography>
                                    <Input {...changeDataForm.register('username', user.username)} label="Username" />
                                    <Input {...changeDataForm.register('email', user.email)} label="E-mail" />
                                    <Input {...changeDataForm.register('first_name', user.first_name)} label="First Name" />
                                    <Input {...changeDataForm.register('last_name', user.last_name)} label="Last Name" />
                                    <Button {...changeDataForm.submitButton}>SAVE</Button>
                                </Form>
                            )}
                            {user && tab == 'password' && (
                                <Form onSubmit={changePasswordForm.onSubmit} column>
                                    <Typography variant="h1">PASSWORD</Typography>
                                    <Input type="password" {...changePasswordForm.register('old_password', user.old_password)} label="Old Password" />
                                    <Input type="password" {...changePasswordForm.register('new_password1', user.new_password1)} label="New Password" />
                                    <Input type="password" {...changePasswordForm.register('new_password2', user.new_password2)} label="Again New Password" />
                                    <Button {...changePasswordForm.submitButton}>CHANGE</Button>
                                </Form>
                            )}
                            {user && tab == 'game' && (
                                <Form column>
                                    <Typography variant="h1">GAME OPTIONS</Typography>
                                    <Button>SAVE</Button>
                                </Form>
                            )}
                            <span></span>
                        </Flex>
                    </Wrapper>
                </Padding>
            </Flex>
        </MainTemplate>
    )
}
