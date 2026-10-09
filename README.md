# website-mini

Mini version of my own website.

## Why?

This simple project was created because I needed to serve something minimalistic under my domain while creating a full version of my own website.

## UI Design / Figma

I designed this project in Figma.<br>
I highly recommend this tool, it's fun to work with!

<a href="https://www.figma.com/file/UjtPCXBBOQmR4cU5zhPyLU/Website-Mini?node-id=0%3A1" target="_blank">Take a look!</a>

## Favicons

The square black logo is the default icon. The SVG also contains a dark-mode
media query, and `src/favicon.js` switches the SVG, PNG and ICO links to the white
logo when the system prefers dark mode, including when the preference changes.
Explicit file switching covers Safari versions that ignore SVG media queries.

PNG fallbacks are provided at 16, 32 and 48 pixels, and each ICO contains all three
sizes. The Apple touch icon (180 pixels) and manifest icons (192 and 512 pixels)
use the default black logo. Safari pinned tabs use a monochrome square SVG mask
with transparent initials. The build also publishes the default `favicon.ico`
and `apple-touch-icon.png` at the site root for automatic discovery. Both language
versions use the same icon configuration.
