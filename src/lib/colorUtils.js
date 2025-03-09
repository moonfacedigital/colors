import Color from "colorjs.io"

/**
 * Convert OKLCH to Hex
 * @param {string} oklchValue - The OKLCH value (e.g., "oklch(0.5 0.2 30)")
 * @returns {string} - The Hex color value (e.g., "#FF0000")
 */
export function convertOklchToHex(oklchValue) {
    try {
        const color = new Color(oklchValue)
        return color.to("srgb").toString({ format: "hex" })
    } catch (error) {
        console.error("Error converting OKLCH to Hex:", error)
        return "#000000" // Fallback to black
    }
}

/**
 * Convert OKLCH to HSL
 * @param {string} oklchValue - The OKLCH value (e.g., "oklch(0.5 0.2 30)")
 * @returns {string} - The HSL color value (e.g., "hsl(0, 100%, 50%)")
 */
export function convertOklchToHsl(oklchValue) {
    try {
        const color = new Color(oklchValue)
        return color.to("hsl").toString({ format: "hsl" })
    } catch (error) {
        console.error("Error converting OKLCH to HSL:", error)
        return "hsl(0, 0%, 0%)" // Fallback to black
    }
}

/**
 * Convert OKLCH to RGBA
 * @param {string} oklchValue - The OKLCH value (e.g., "oklch(0.5 0.2 30)")
 * @returns {string} - The RGBA color value (e.g., "rgba(255, 0, 0, 1)")
 */
export function convertOklchToRgba(oklchValue) {
    try {
        const color = new Color(oklchValue)
        return color.to("srgb").toString({ format: "rgba" })
    } catch (error) {
        console.error("Error converting OKLCH to RGBA:", error)
        return "rgba(0, 0, 0, 1)" // Fallback to black
    }
}
