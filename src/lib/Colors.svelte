<script>
    import { toast } from "svelte-french-toast" // For toast notifications (optional)
    import {
        convertOklchToHex,
        convertOklchToHsl,
        convertOklchToRgba,
    } from "./colorUtils"

    // Define the color families and their steps
    const colorFamilies = [
        "red",
        "flame",
        "orange",
        "amber",
        "yellow",
        "lime",
        "green",
        "mint",
        "emerald",
        "teal",
        "cyan",
        "sky",
        "blue",
        "indigo",
        "violet",
        "purple",
        "fuchsia",
        "blush",
        "pink",
        "blossom",
        "rose",
        "slate",
        "gray",
        "zinc",
        "neutral",
        "stone",
    ]

    // Define the steps for each color family
    const steps = [
        50, 75, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700,
        750, 800, 850, 900, 925, 950, 975,
    ]

    // Selected color format (default: hex)
    let selectedFormat = "hex"

    // Function to copy color value to clipboard
    async function copyColorToClipboard(colorValue, hexColor, step) {
        try {
            await navigator.clipboard.writeText(colorValue)
            toast.success(`Copied: ${colorValue}`, {
                iconTheme: {
                    primary: hexColor, // Use the Hex color value for the icon
                    secondary: step >= 500 ? "#FFFFFF" : "#000000", // White or black based on the step
                },
            })
        } catch (error) {
            toast.error("Failed to copy color")
        }
    }

    // Function to get the color value in the selected format
    function getColorValue(family, step) {
        const oklchValue = getComputedStyle(document.documentElement)
            .getPropertyValue(`--color-${family}-${step}`)
            .trim()
        switch (selectedFormat) {
            case "hex":
                return convertOklchToHex(oklchValue)
            case "hsl":
                return convertOklchToHsl(oklchValue)
            case "rgba":
                return convertOklchToRgba(oklchValue)
            case "token":
                return `${family}-${step}` // Return the token format
            case "oklch":
                return oklchValue // Return the raw OKLCH value
            default:
                return oklchValue // Fallback to raw OKLCH value
        }
    }
</script>

<!-- Dropdown to select color format -->
<div class="format-selector">
    <label for="color-format">Color Format:</label>
    <select id="color-format" bind:value={selectedFormat}>
        <option value="token">Token</option>
        <option value="hex">Hex</option>
        <option value="hsl">HSL</option>
        <option value="rgba">RGBA</option>
        <option value="oklch">OKLCH</option>
    </select>
</div>

<!-- Color grid -->
<div class="container flex max-w-full flex-col gap-y-20 overflow-scroll">
    {#each colorFamilies as family}
        <div class="flex gap-4">
            {#each steps as step}
                <div
                    class="color-box {step >= 500
                        ? 'text-white'
                        : 'text-black'}"
                    style="background-color: var(--color-{family}-{step})"
                    on:click={() => {
                        const colorValue = getColorValue(family, step)
                        const hexColor = convertOklchToHex(
                            getComputedStyle(document.documentElement)
                                .getPropertyValue(`--color-${family}-${step}`)
                                .trim()
                        )
                        copyColorToClipboard(colorValue, hexColor, step)
                    }}
                >
                    {family}-{step}
                </div>
            {/each}
        </div>
    {/each}
</div>

<style>
    .container {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        padding: 20px;
    }

    .color-box {
        width: 100px;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        font-size: 12px;
        text-align: center;
        cursor: pointer;
    }

    .format-selector {
        margin-bottom: 20px;
        font-size: 14px;
    }

    .format-selector label {
        margin-right: 10px;
    }

    .format-selector select {
        padding: 5px;
        border-radius: 4px;
        border: 1px solid #ccc;
    }
</style>
