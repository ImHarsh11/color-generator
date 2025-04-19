document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("saved-colors-container");
  const savedColors = JSON.parse(localStorage.getItem("savedColors")) || [];

  savedColors.forEach(color => {
    const card = document.createElement("div");
    card.className = "color-card";
    card.style.backgroundColor = color.hex;

    const nameEl = document.createElement("p");
    nameEl.textContent = color.name;
    nameEl.style.fontWeight = "bold";

    const hexEl = document.createElement("p");
    hexEl.textContent = color.hex;

    card.appendChild(nameEl);
    card.appendChild(hexEl);
    container.appendChild(card);
  });
});
