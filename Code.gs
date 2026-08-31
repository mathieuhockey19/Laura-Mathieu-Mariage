function doGet() {
  return ContentService.createTextOutput("OK");
}


function doPost(e) {

  var ss = SpreadsheetApp.openById(
    "19P9NNva9R0Lku_rOMCgTYcQ-2xF7kXkhRkEMSj3evHc"
  );

  var sheet = ss.getSheetByName("Réponses RSVP");


  if (!sheet) {

    return ContentService
      .createTextOutput(
        JSON.stringify({
          ok: false,
          error: "Onglet Réponses RSVP introuvable"
        })
      )
      .setMimeType(
        ContentService.MimeType.JSON
      );

  }


  var data =
    JSON.parse(
      e.postData.contents
    );


  ensureHeaders_(sheet);


  sheet.appendRow([
    new Date(),
    data.prenom || "",
    data.nom || "",
    data.email || "",
    data.mercredi || "",
    data.jeudi || "",
    data.allergies || "",
    data.hebergement_reserve || "",
    data.hebergement || "",
    data.navette || "",
    data.commentaire || ""
  ]);


  return ContentService
    .createTextOutput(
      JSON.stringify({
        ok: true
      })
    )
    .setMimeType(
      ContentService.MimeType.JSON
    );

}


// ==============================
// EN-TÊTES DU GOOGLE SHEET
// ==============================

function ensureHeaders_(sheet) {

  var headers = [
    "Horodatage",
    "Prénom",
    "Nom",
    "E-mail",
    "Présent mercredi 8",
    "Présent jeudi 9",
    "Allergies / régime",
    "Hébergement réservé",
    "Nom hébergement",
    "Navette mercredi",
    "Commentaire invité"
  ];


  sheet
    .getRange(
      1,
      1,
      1,
      headers.length
    )
    .setValues([
      headers
    ]);

}
