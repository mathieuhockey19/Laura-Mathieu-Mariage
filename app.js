const form = document.getElementById("rsvpForm");
const statusEl = document.getElementById("formStatus");
const hotelGrid = document.getElementById("hotelGrid");

if (Array.isArray(HOTELS) && HOTELS.length) {
  hotelGrid.innerHTML = HOTELS.map(h => `
  <article class="hotel-card">
    <p class="hotel-type">${h.type || "Hébergement"}</p>

    <h3>${h.name}</h3>

    <p class="hotel-meta">
      ${h.price ? `<strong>${h.price}</strong>` : ""}
    </p>

    ${h.note ? `<p>${h.note}</p>` : ""}

    ${h.phone ? `
      <p>
        📞 <a href="tel:${h.phone.replace(/\s/g, "")}">
          ${h.phone}
        </a>
      </p>
    ` : ""}

    ${h.url ? `
      <a href="${h.url}" target="_blank" rel="noopener">
        Site & réservation →
      </a>
    ` : ""}
  </article>
`).join("");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  statusEl.textContent = "Envoi en cours…";

  const data = Object.fromEntries(new FormData(form).entries());
  data.timestamp = new Date().toISOString();

  if (!GOOGLE_SCRIPT_URL) {
    const saved = JSON.parse(localStorage.getItem("demo_rsvp") || "[]");
    saved.push(data);
    localStorage.setItem("demo_rsvp", JSON.stringify(saved));
    statusEl.textContent = "Mode démo : réponse enregistrée uniquement sur cet appareil.";
    form.reset();
    return;
  }

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {"Content-Type": "text/plain;charset=utf-8"},
      body: JSON.stringify(data)
    });
    statusEl.textContent = "Merci ! Votre réponse a bien été enregistrée.";
    form.reset();
  } catch (err) {
    statusEl.textContent = "Une erreur est survenue. Merci de réessayer.";
  }
});
