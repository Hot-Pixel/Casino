function compare(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

function fillRtpTeorico() {
  fetch('https://www.casinobarcelona.es/json_slots_extended_casinobarcelona.json', { headers: { 'Accept': 'application/json' } })
    .then(response => response.json())
    .then(data => {
      data.slots.sort(compare);
      var rows = "";
      for (var i = 0; i < data.slots.length; i++) {
        var slot = data.slots[i];
        rows += `<tr><td>${slot.name}</td><td>${slot.minbet}</td><td>${slot.maxbet}</td><td>${slot.rtp}</td></tr>`;
      }
      document.querySelector('#rtp-content').innerHTML = rows;
  });
}

export default fillRtpTeorico;
