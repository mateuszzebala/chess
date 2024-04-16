export const stringIsNumber = (str) => {
    const number = parseFloat(str)
    return number.toString() === str
}
