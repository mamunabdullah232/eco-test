window.GREEN_ARMY_PLANTS = Array.from({ length: 48 }, function(_, index){
  return {
    id: "ZG" + String(index + 1).padStart(2, "0"),
    plantName: "Plant species to be updated",
    scientificName: "Record after plantation",
    donorName: "To be updated",
    plantedBy: "To be updated",
    maintenancePerson: "To be updated",
    plantationDate: "28 May 2026",
    location: "Niz Baruajhar",
    status: "Planned for plantation",
    lastUpdated: "22 Jun 2026",
    photo: "",
    note: "QR label prepared before the plantation drive. Plant species, planter, caretaker and photograph will be recorded after planting."
  };
});

window.XOHOPATHI_PLANTS = window.GREEN_ARMY_PLANTS;
