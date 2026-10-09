const colorScheme = window.matchMedia('(prefers-color-scheme: dark)');
const icons = [
  ['favicon-ico', new URL('./assets/favicon-white.ico', import.meta.url).href],
  ['favicon-16', new URL('./assets/favicon-white-16x16.png', import.meta.url).href],
  ['favicon-32', new URL('./assets/favicon-white-32x32.png', import.meta.url).href],
  ['favicon-48', new URL('./assets/favicon-white-48x48.png', import.meta.url).href],
  ['favicon-svg', new URL('./assets/favicon-white.svg', import.meta.url).href],
].map(([id, darkHref]) => {
  const element = document.getElementById(id);
  return { element, defaultHref: element.href, darkHref };
});

// Explicit URLs also cover browsers that ignore media queries in SVG favicons.
const updateIcons = () => {
  icons.forEach(({ element, defaultHref, darkHref }) => {
    const href = colorScheme.matches ? darkHref : defaultHref;
    if (element.href !== href) {
      element.href = href;
    }
  });
};

updateIcons();

if (colorScheme.addEventListener) {
  colorScheme.addEventListener('change', updateIcons);
} else {
  // Safari 13 and older expose the legacy MediaQueryList listener API.
  colorScheme.addListener(updateIcons);
}
