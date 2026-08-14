// URL Google Apps Script pour enregistrer les RSVP.
// On la renseignera ensemble lors de la mise en ligne.
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyCvYap8OcwFnMY1g72n2AC1emPg05QORZVYs5uFPLWLZ4yrOOzgow_hbwXpk7Ja22gDA/exec";

// Hébergements : on complétera cette liste après les réponses des établissements.
const HOTELS = [
  {
    name: "Camping Monplaisir Provence",
    type: "Camping & locations",
    price: "€",
    phone: "04 90 92 22 70",
    note: "Réservation directe selon les disponibilités.",
    url: "https://www.camping-monplaisir.fr/"
  },
  {
    name: "Camping Pegomas | Pausado",
    type: "Camping & mobil-homes",
    price: "€",
    phone: "04 86 86 10 30",
    note: "Mobil-homes et solutions adaptées aux groupes.",
    url: "https://pegomas.pausado.com/"
  },
  {
    name: "Camping Le Parc de la Bastide",
    type: "Camping & mobil-homes",
    price: "€",
    phone: "06 67 57 67 80",
    note: "Une des options les plus économiques de notre sélection.",
    url: "https://www.parcdelabastide.com/"
  },
  {
    name: "Mas de Nicolas",
    type: "Camping & mobil-homes",
    price: "€",
    phone: "04 90 92 27 05",
    note: "Mobil-homes à Saint-Rémy-de-Provence.",
    url: "https://www.camping-masdenicolas.com/"
  },
  {
    name: "Hôtel Van Gogh",
    type: "Hôtel 3★",
    price: "€",
    phone: "04 90 92 14 02",
    note: "Une option hôtelière accessible à Saint-Rémy.",
    url: "https://www.hotel-vangogh.com/"
  },
  {
    name: "Hostellerie Le Chalet Fleuri",
    type: "Hôtel",
    price: "€€",
    phone: "04 90 92 03 62",
    note: "Hôtel à Saint-Rémy-de-Provence.",
    url: "https://www.hotel-lechaletfleuri.com/"
  },
  {
    name: "Mas Saint Joseph",
    type: "Hôtel 3★",
    price: "€€",
    phone: "04 90 92 13 43",
    note: "Parking, piscine et proximité du centre.",
    url: "https://www.masjoseph.com/"
  },
  {
    name: "Résidences de Métifiot",
    type: "Studios & appartements",
    price: "€€",
    phone: "04 90 92 65 46",
    note: "Une bonne option pour ceux qui souhaitent rester plusieurs nuits.",
    url: "https://www.metifiot-provence.com/"
  },
  {
    name: "Hôtel Gounod",
    type: "Hôtel",
    price: "€€",
    phone: "04 90 92 06 14",
    note: "16 chambres étaient disponibles lors de notre prise de contact. Pas d'acompte et annulation possible jusqu'à 48 h avant l'arrivée.",
    url: "https://hotel-gounod.com/"
  },
  {
    name: "Le Castelet des Alpilles",
    type: "Hôtel 3★",
    price: "€€",
    phone: "04 90 92 07 21",
    note: "Hôtel proche du centre de Saint-Rémy.",
    url: "https://www.hotel-castelet-alpilles.fr/"
  },
  {
    name: "Mas des Carassins",
    type: "Hôtel de charme",
    price: "€€",
    phone: "04 90 92 15 48",
    note: "Réservation directe auprès de l'établissement selon les disponibilités.",
    url: "https://www.masdescarassins.com/"
  },
  {
    name: "Hôtel du Soleil & Spa",
    type: "Hôtel 3★ & appartements",
    price: "€€",
    phone: "04 90 92 00 63",
    note: "Hôtel et appartements à Saint-Rémy-de-Provence.",
    url: "https://www.hotelsoleil.com/"
  },
  {
    name: "Le Saint-Rémy",
    type: "Hôtel 5★",
    price: "€€€",
    phone: "04 84 51 04 51",
    note: "Pour ceux qui souhaitent se faire plaisir.",
    url: "https://www.le-saint-remy.fr/"
  }
];
