const form = document.getElementById("rsvpForm");
const statusEl = document.getElementById("formStatus");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  statusEl.textContent = "Envoi en cours…";

  const data = Object.fromEntries(new FormData(form).entries());
  data.timestamp = new Date().toISOString();

  // Sécurité : si l'URL Google Apps Script n'est pas configurée
  if (!GOOGLE_SCRIPT_URL) {
    statusEl.textContent =
      "Le formulaire RSVP n'est pas encore connecté. Merci de réessayer plus tard.";
    return;
  }

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(data)
    });

    statusEl.textContent =
      "Merci ! Votre réponse a bien été enregistrée.";

    form.reset();

  } catch (err) {
    console.error(err);

    statusEl.textContent =
      "Une erreur est survenue. Merci de réessayer.";
  }
});
