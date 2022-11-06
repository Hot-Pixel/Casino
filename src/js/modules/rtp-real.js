var monthsArray = [];
var monthsToShow = 6;

function formatDate(date) {
    return date.toISOString().replace('.000Z', '+00:00');
}

function compare(a, b) {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
}

function getMonths(endDate) {
    var monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    endDate = new Date(endDate);
    var d;
    var rtpRealHead = "<th>Juego</th>";

    for (var i = 0; i < monthsToShow; i++) {
        d = new Date(Date.UTC(endDate.getFullYear(), endDate.getMonth() - i, 1, 0, 0, 0));
        monthsArray.push(formatDate(d));
        rtpRealHead += "<th>" + monthNames[d.getMonth()] + " " + d.getFullYear() + "</th>"
        document.querySelector('#rtp-real-head').innerHTML = rtpRealHead;
    }
}

function fillRtpReal() {
    var maxDate = formatDate(new Date(0));
    var minDate = formatDate(new Date());
    fetch('https://api.casinobarcelona.es/api/slots?pagination=false', { headers: { 'Accept': 'application/json' } })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.sort(compare);
            document.querySelector('.rtp-loading').remove();
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < data[i].rtp.length; j++) {
                    if (data[i].rtp[j].date < minDate) {
                        minDate = data[i].rtp[j].date;
                    }
                    if (data[i].rtp[j].date > maxDate) {
                        maxDate = data[i].rtp[j].date;
                    }
                }
            }
            getMonths(maxDate);
            var rows = "";
            for (var i = 0; i < data.length; i++) {
                var slot = data[i];
                rows += `<tr><td>${slot.name}</td>`;
                for (var j = 0; j < monthsArray.length; j++) {
                    var rtp = slot.rtp.find(function (rtp) {
                        return rtp.date === monthsArray[j];
                    });
                    if (rtp && parseInt(rtp.value) > 0) {
                        rows += `<td>${rtp.value}%</td>`;
                    } else {
                        rows += `<td> - </td>`;
                    }
                }
                rows += "</tr>"
            }
            document.querySelector('#rtp-real-content').innerHTML = rows;
        })
}

export default fillRtpReal;
