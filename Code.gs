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
      .createTextOutput(JSON.stringify({
        ok: false,
        error: "Onglet Réponses RSVP introuvable"
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.prenom || "",
    data.nom || "",
    data.email || "",
    data.jeudi || "",
    data.vendredi || "",
    data.repas || "",
    data.allergies || "",
    data.hebergement_reserve || "",
    data.hebergement || "",
    data.navette || "",
    ""
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
