import React from 'react'
import { ModalsContext } from '../components/atoms/Modal'
import { FiAlertOctagon } from 'react-icons/fi'
import { FETCH } from '../api/api'
import { MessageContext } from '../components/atoms/Message'

export const useLoading = (defaultValue = false) => {
    const [loading, setLoading] = React.useState(defaultValue)

    const start = () => setLoading(true)
    const stop = () => setLoading(false)

    return {
        is: loading,
        start,
        stop,
        toggle: () => setLoading((prev) => !prev)
    }
}

export const useModal = () => {
    const [modals, setModals] = React.useContext(ModalsContext)

    const defaultIcon = <FiAlertOctagon />

    const create = ({ title, form, icon = defaultIcon, submit = () => {}, ...otherProps }) => {
        const id = Math.random()
        const newModal = {
            title,
            form,
            icon,
            toHide: false,
            submit: (value) => {
                hide(id)
                submit(value)
            },
            id,
            ...otherProps
        }
        setModals((prev) => [...prev, newModal])
    }

    const hide = (id) => {
        setModals((prev) =>
            prev.map((modal) => {
                if (modal.id == id) {
                    modal.toHide = true
                }
                return modal
            })
        )

        setTimeout(() => setModals((prev) => prev.filter((modal) => modal.id !== id)), 100)
    }

    return { modals, setModals, create, hide }
}

export const useReload = () => {
    const [reloadValue, setReloadValue] = React.useState(0)

    const next = () => setReloadValue((prev) => prev + 1)

    return {
        reloadValue,
        next
    }
}

export const useForm = ({ url = null, onAnswer = () => {}, onAnswerError = () => {} }) => {
    if (!url) throw new Error('Url should be not empty')

    const [values, setValues] = React.useState({})
    const [error, setError] = React.useState(null)
    const loading = useLoading()

    const handleSubmit = () => {
        FETCH(url, values)
            .then((data) => {
                loading.stop()
                onAnswer(data)
            })
            .catch((err) => {
                loading.stop()
                onAnswerError(err)
            })
    }

    return {
        register: (name, defaultValue = '') => {
            if (!Object.keys(values).includes(name)) {
                setValues((prev) => ({ ...prev, [name]: defaultValue }))
            }
            return {
                value: values[name],
                onChange: (event) => setValues((prev) => ({ ...prev, [name]: event.target.value })),
                setValue: (value) => setValues((prev) => ({ ...prev, [name]: value }))
            }
        },
        submitButton: {
            onClick: (event) => {
                event.preventDefault()
                loading.start()
                handleSubmit()
            },
            loading: loading.is
        },
        onSubmit: (event) => {
            event.preventDefault()
            loading.start()
            handleSubmit()
        },
        error,
        setError,
        clear: () => {
            setValues({})
        }
    }
}

export const useInterval = (func = () => {}, time = 1000, dependency = []) => {
    React.useEffect(() => {
        func()
        const interval = setInterval(func, time)
        return () => {
            clearInterval(interval)
        }
    }, dependency)
}

export const useMessage = () => {
    const [messages, setMessages] = React.useContext(MessageContext)

    const create = ({ text = '', mode = 'normal' }) => {
        const id = Math.random()
        const newMessage = {
            text,
            mode,
            toHide: false,
            close: () => {
                hide(id)
            },
            id
        }
        setMessages((prev) => [...prev, newMessage])
        setTimeout(() => hide(id), 10000)
    }

    const hide = (id) => {
        setMessages((prev) =>
            prev.map((message) => {
                if (message.id == id) {
                    message.toHide = true
                }
                return message
            })
        )

        setTimeout(() => setMessages((prev) => prev.filter((message) => message.id !== id)), 200)
    }

    return { messages, setMessages, create, hide }
}

export const useWindowEvent = (event, func) => {
    React.useEffect(() => {
        window.addEventListener(event, func)
        return () => {
            window.removeEventListener(event, func)
        }
    }, [event, func])
}
