function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("RSVP");

  if (!sheet) {
    sheet = ss.insertSheet("RSVP");
    sheet.appendRow([
      "Date réponse","Prénom","Nom","Email","Jeudi 2 sept.","Vendredi 3 sept.",
      "Allergies / régime","Hébergement réservé ?","Hébergement","Navette"
    ]);
  }

  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.prenom || "",
    data.nom || "",
    data.email || "",
    data.jeudi || "",
    data.vendredi || "",
    data.allergies || "",
    data.hebergement_reserve || "",
    data.hebergement || "",
    data.navette || ""
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ok:true}))
    .setMimeType(ContentService.MimeType.JSON);
}
