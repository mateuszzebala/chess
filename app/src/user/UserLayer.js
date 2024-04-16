import PropTypes from 'prop-types'
import { UserContext } from './User'
import React from 'react'
import { FETCH } from '../api/api'
import { ENDPOINTS } from '../api/endpoints'

export const UserLayer = ({ next }) => {
    const [userData, setUserData] = React.useState(null)

    React.useEffect(() => {
        FETCH(ENDPOINTS.GET_ACCOUNT_INFO).then((data) => {
            setUserData(data.data)
        })
    }, [])

    return <UserContext.Provider value={[userData, setUserData]}>{userData && next}</UserContext.Provider>
}

UserLayer.propTypes = {
    next: PropTypes.any
}
