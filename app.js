const form = document.getElementById("rsvpForm");
const statusEl = document.getElementById("formStatus");

const navetteFieldset = document.getElementById("navetteFieldset");

const mercrediInputs = document.querySelectorAll(
  'input[name="mercredi"]'
);

const navetteInputs = document.querySelectorAll(
  'input[name="navette"]'
);


/* =====================================================
   GESTION DES NAVETTES
===================================================== */

function updateNavetteFieldset() {

  const mercredi =
    document.querySelector(
      'input[name="mercredi"]:checked'
    )?.value;


  // Si la personne ne vient pas mercredi,
  // la partie navette devient non obligatoire.

  if (mercredi === "Non") {

    navetteInputs.forEach((input) => {

      input.required = false;
      input.checked = false;
      input.disabled = true;

    });


    if (navetteFieldset) {
      navetteFieldset.classList.add(
        "disabled-fieldset"
      );
    }

  } else {

    navetteInputs.forEach((input) => {

      input.required = true;
      input.disabled = false;

    });


    if (navetteFieldset) {
      navetteFieldset.classList.remove(
        "disabled-fieldset"
      );
    }

  }

}


/* Mise à jour dès que la présence du mercredi change */

mercrediInputs.forEach((input) => {

  input.addEventListener(
    "change",
    updateNavetteFieldset
  );

});



/* =====================================================
   ENVOI DU RSVP
===================================================== */

form.addEventListener(
  "submit",
  async (e) => {

    e.preventDefault();


    statusEl.textContent =
      "Envoi en cours…";


    const data =
      Object.fromEntries(
        new FormData(form).entries()
      );


    data.timestamp =
      new Date().toISOString();


    /*
      Si la personne est absente mercredi,
      on indique clairement que la navette
      ne la concerne pas.
    */

    if (data.mercredi === "Non") {

      data.navette =
        "Non concerné - absent mercredi";

    }


    /*
      Sécurité :
      vérifie que l'URL Apps Script existe.
    */

    if (
      typeof GOOGLE_SCRIPT_URL === "undefined" ||
      !GOOGLE_SCRIPT_URL
    ) {

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

            "Content-Type":
              "text/plain;charset=utf-8"

          },

          body:
            JSON.stringify(data)

        }
      );


      statusEl.textContent =
        "Merci ! Votre réponse a bien été enregistrée ❤️";


      form.reset();


      updateNavetteFieldset();


    } catch (error) {

      console.error(
        "Erreur RSVP :",
        error
      );


      statusEl.textContent =
        "Une erreur est survenue. Merci de réessayer ou de nous contacter directement.";

    }

  }
);



/* =====================================================
   INITIALISATION
===================================================== */

updateNavetteFieldset();
