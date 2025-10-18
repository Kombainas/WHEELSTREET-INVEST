# Noise Texture Instructions

To add the noise texture overlay:

1. Download a small noise texture (128x128px or 256x256px)
2. Name it `noise.png` and place it in `/public/noise.png`

**Quick options:**

- Use an online noise generator: https://noisepng.com/
- Use Photoshop: Filter > Noise > Add Noise (Monochromatic, Gaussian)
- Use GIMP: Filters > Render > Clouds > Solid Noise

The noise texture should be:
- Grayscale/monochromatic
- Seamlessly tileable
- Small file size (ideally <50KB)
- 128x128 or 256x256 pixels

Current implementation uses opacity 0.06 in NoiseOverlay component.
