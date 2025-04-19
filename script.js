// Select all containers and their internal color-name & hcode spans
const containers = document.querySelectorAll(".container");

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    changeAllColors();
  }
});
document.getElementById("btnForGenerator").addEventListener("click", () => {
  changeAllColors();
});

function changeAllColors() {
  containers.forEach((container) => {
    const hslColor = getCoolorsStyleColor();
    const hexColor = hslToHex(hslColor.h, hslColor.s, hslColor.l);

    container.style.backgroundColor = `hsl(${hslColor.h}, ${hslColor.s}%, ${hslColor.l}%)`;

    const colorNameEl = container.querySelector(".color-name");
    const hcodeEl = container.querySelector(".hcode");
    hcodeEl.textContent = hexColor.toUpperCase();
    fetch(`https://www.thecolorapi.com/id?hex=${hexColor.slice(1)}`)
      .then((res) => res.json())
      .then((data) => {
        const colorName = data.name.value;
        colorNameEl.textContent = colorName.toUpperCase();
      })
      .catch((err) => {
        colorNameEl.textContent = "Unknown";
      });
  });
  
}

// Generate aesthetic Coolors-style HSL colors
function getCoolorsStyleColor() {
  const hue = Math.floor(Math.random() * 360); // Full color wheel
  const saturation = 60 + Math.random() * 30; // 60–90% for vividness

  // Randomly decide if it's a light or dark color
  const isDark = Math.random() < 0.5;

  const lightness = isDark
    ? 20 + Math.random() * 15 // Dark range: 20–35%
    : 65 + Math.random() * 20; // Light range: 65–85%

  return { h: hue, s: saturation, l: lightness };
}

// Convert HSL to HEX (for TheColorAPI)
function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) [r, g, b] = [c, x, 0];
  else if (60 <= h && h < 120) [r, g, b] = [x, c, 0];
  else if (120 <= h && h < 180) [r, g, b] = [0, c, x];
  else if (180 <= h && h < 240) [r, g, b] = [0, x, c];
  else if (240 <= h && h < 300) [r, g, b] = [x, 0, c];
  else if (300 <= h && h < 360) [r, g, b] = [c, 0, x];

  const toHex = (n) => {
    const hex = Math.round((n + m) * 255).toString(16);
    return hex.padStart(2, "0");
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

