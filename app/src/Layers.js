import React from 'react'
import { Nested } from './components/atoms/Nested'
import { RouterLayer } from './router/RouterLayer'
import { ModalLayer } from './components/atoms/Modal'
import { MessageLayer } from './components/atoms/Message'
import { UserLayer } from './user/UserLayer'

const layers = [RouterLayer, ModalLayer, MessageLayer, UserLayer]

export const Layers = () => {
    return <Nested layers={layers} />
}
