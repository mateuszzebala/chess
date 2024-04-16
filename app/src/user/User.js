import React from 'react'
import { FETCH } from '../api/api'
import { ENDPOINTS } from '../api/endpoints'

export const UserContext = React.createContext({})

export const useUser = () => {
    const [userData, setUserData] = React.useContext(UserContext)

    const reload = () => {
        FETCH(ENDPOINTS.GET_ACCOUNT_INFO).then((data) => {
            setUserData(data.data)
        })
    }

    return [userData, reload]
}
