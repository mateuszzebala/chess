import axios from 'axios'
import React from 'react'

export const API_URL = 'http://localhost:8000'
export const WS_API_URL = 'ws://localhost:8000'

const FETCHER = axios.create({
    baseURL: API_URL,
    method: 'POST',
    withCredentials: true,
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})

export const FETCH = (url, data = {}) => {
    const formData = new FormData()

    Object.keys(data).forEach((key) => {
        formData.append(key, data[key])
    })

    return FETCHER.post(url, formData)
}

export const useWebsocket = (url, options) => {
    const [websocket, setWebsocket] = React.useState(null)
    const { onError = () => {}, onClose = () => {}, onOpen = () => {}, onMessage = () => {} } = options

    React.useEffect(() => {
        setWebsocket(new WebSocket(`${WS_API_URL}/${url}`))
    }, [url])

    React.useEffect(() => {
        if (websocket) {
            websocket.addEventListener('message', onMessage)
            websocket.addEventListener('error', onError)
            websocket.addEventListener('close', onClose)
            websocket.addEventListener('open', (event) => {
                onOpen(event)
            })
            return () => {
                websocket.removeEventListener('message', onMessage)
                websocket.removeEventListener('error', onError)
                websocket.removeEventListener('close', onClose)
                websocket.removeEventListener('open', onOpen)
            }
        }
    }, [websocket])

    const send = (data) => {
        websocket.send(data)
    }

    return { websocket, send }
}
