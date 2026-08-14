function doGet() {
  return ContentService.createTextOutput("OK");
}

function doPost(e) {

  var ss = SpreadsheetApp.openById("https://docs.google.com/spreadsheets/d/19P9NNva9R0Lku_rOMCgTYcQ-2xF7kXkhRkEMSj3evHc/edit?gid=0#gid=0");
  var sheet = ss.getSheetByName("Réponses RSVP");

  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),                      // Date réponse
    data.prenom || "",              // Prénom
    data.nom || "",                 // Nom
    data.email || "",               // Email
    data.jeudi || "",               // Présence jeudi
    data.vendredi || "",            // Présence vendredi
    data.repas || "",               // Repas
    data.allergies || "",           // Allergies / régime
    data.hebergement_reserve || "", // Hébergement réservé ?
    data.hebergement || "",         // Nom hébergement
    data.navette || "",             // Navette
    ""                               // Commentaire
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
