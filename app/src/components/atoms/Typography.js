import PropTypes from 'prop-types'
import { useTheme } from 'styled-components'

export const Typography = ({ children, variant = 'span', fontSize, bold, align = 'left' }) => {
    const theme = useTheme()
    const Variant = variant
    return <Variant style={{ margin: 0, textAlign: align, color: theme.colors.darkColor, fontSize: fontSize, fontWeight: bold ? 'bold' : 'auto' }}>{children}</Variant>
}

Typography.propTypes = {
    children: PropTypes.any,
    variant: PropTypes.string,
    fontSize: PropTypes.number,
    bold: PropTypes.bool,
    align: PropTypes.string
}
