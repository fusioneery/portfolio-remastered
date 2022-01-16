export const hexToRGBA = (hex, alpha = 1) => {
  try {
    const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16))
    return `rgba(${r},${g},${b},${alpha})`
  } catch (error) {
    console.log(error, hex)
    debugger
  }
}
