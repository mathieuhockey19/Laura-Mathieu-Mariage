const form = document.getElementById("rsvpForm");
const statusEl = document.getElementById("formStatus");

const navetteFieldset = document.getElementById("navetteFieldset");
const mercrediInputs = document.querySelectorAll(
  'input[name="mercredi"]'
);
const navetteInputs = document.querySelectorAll(
  'input[name="navette"]'
);


// ==============================
// GESTION NAVETTE
// ==============================

function updateNavetteFieldset() {

  const mercredi =
    document.querySelector(
      'input[name="mercredi"]:checked'
    )?.value;


  // Si absent mercredi :
  // aucune réponse navette n'est demandée
  if (mercredi === "Non") {

    navetteInputs.forEach((input) => {
      input.required = false;
      input.checked = false;
      input.disabled = true;
    });

    navetteFieldset.classList.add("disabled-fieldset");

  } else {

    navetteInputs.forEach((input) => {
      input.required = true;
      input.disabled = false;
    });

    navetteFieldset.classList.remove("disabled-fieldset");

  }

}


mercrediInputs.forEach((input) => {

  input.addEventListener(
    "change",
    updateNavetteFieldset
  );

});


// ==============================
// ENVOI DU RSVP
// ==============================

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  statusEl.textContent = "Envoi en cours…";


  const data =
    Object.fromEntries(
      new FormData(form).entries()
    );


  data.timestamp =
    new Date().toISOString();


  // Si la personne ne vient pas mercredi,
  // on enregistre explicitement son statut navette.
  if (data.mercredi === "Non") {

    data.navette =
      "Non concerné - absent mercredi";

  }


  // Sécurité si Google Apps Script
  // n'est pas configuré
  if (!GOOGLE_SCRIPT_URL) {

    statusEl.textContent =
      "Le formulaire RSVP n'est pas encore connecté. Merci de réessayer plus tard.";

    return;

  }


  try {

    await fetch(
      GOOGLE_SCRIPT_URL,
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(data)
      }
    );


    statusEl.textContent =
      "Merci ! Votre réponse a bien été enregistrée ❤️";


    form.reset();

    updateNavetteFieldset();


  } catch (error) {

    console.error(error);

    statusEl.textContent =
      "Une erreur est survenue. Merci de réessayer ou de nous contacter directement.";

  }

});


// Initialisation
updateNavetteFieldset();
