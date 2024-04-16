import { Route, Routes } from 'react-router-dom'
import PropTypes from 'prop-types'
import { ROUTES } from './routes'

export const RouterLayer = () => {
    return (
        <Routes>
            {Object.values(ROUTES).map((route) => (
                <Route key={route.PATH} path={route.PATH} element={<route.PAGE />} />
            ))}
        </Routes>
    )
}

RouterLayer.propTypes = {
    next: PropTypes.any
}
