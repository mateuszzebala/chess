import PropTypes from 'prop-types'

export const Nested = ({ layers, children }) => {
    let lastElement = children
    layers.reverse().forEach((Element) => {
        lastElement = <Element next={lastElement} />
    })
    return lastElement
}

Nested.propTypes = {
    children: PropTypes.any,
    layers: PropTypes.any
}
