
function Session() {
    let init;
    let quering = false;
    let sessionEls = document.querySelectorAll('.sessionTime');

    function startTimeWeb1(delay) {
        init = new Date().getTime() - delay;
        let t = setTimeout(function () { startTimeWeb() }, 1000);
    }

    function startTimeWeb() {
        let actual = new Date();
        let horas = checkTime(actual.getHours());
        let minutos = checkTime(actual.getMinutes());
        let segundos = checkTime(actual.getSeconds());

        let today = new Date().getTime();
        let delta = Math.floor((today - init) / 1000);
        let seconds = checkTime(delta % 60);
        let minutes = checkTime(Math.floor(delta / 60) % 60);
        let hours = checkTime(Math.floor(delta / (60 * 60)) % 60);
        try {
            sessionEls.forEach(function (el) {
                el.innerHTML = hours + ":" + minutes + ":" + seconds;
            });
            let t = setTimeout(function () { startTimeWeb() }, 500);
        } catch (e) {
            console.log(e);
        }
        if (delta % 60 == 0 && (minutes > 0 || hours > 0) && !quering) {
            console.log("Verificamos inactividad");
            quering = true;
            verificaInactividad();
        }
    }

    function checkTime(i) {
        if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
        return i;
    }

    function verificaInactividad() {
        fetch('/session.jsp')
            .then(res => res.json())
            .then(data => {
                console.log('Result ' + data.result);
                quering = false;
                if (!data.result) {
                    mpu({
                        title: 'Sesión caducada',
                        body: 'Por tu seguridad hemos procedido a desconectarte debido al prolongado estado de inactividad.',
                        onClose: () => {
                            window.location.href = '/logout.jsp';
                        }
                    });
                }
            })
            .catch(err => {
                console.log(err);
                quering = false;
            });
    }

    function logout() {
        if (window.location.href.includes("sportncoheader")) {
            console.log("Sending CLOSING message");
            parent.postMessage({ "method": "CLOSING" }, "https://apuestas.casinobarcelona.es/");
        }
        window.location.href = '/logout.jsp';
    }

    // TODO: Make lastSessionInfo popup
    function lastSessionInfo() {

        const url = "/servlet/sessionSummary?rnd=" + new Date();
        fetch(url, {
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(json => {
                console.log(json);
                if (json.result == "ok" && json.data.length > 0) {
                    if (window.location.href.includes("sportncoheader")) {
                        console.log("Sending OPENING message");
                        parent.postMessage({ "method": "OPENING" }, "https://apuestas.casinobarcelona.es/");
                    }
                    let table = "<div id='tablecontainer'><table class='tables' id='resumenSession'><thead>";
                    table += "<tr><th>Juego</th><th>Apostado</th><th>Ganado</th></tr></thead><tbody>";
                    for (var i = 0; i < json.data.length; i++) {
                        var wagers = json.data[i].wagers;
                        var winnings = json.data[i].winnings;

                        table += "<tr><td title='Juego'>" + json.data[i].room_name + "</td><td title='Apostado'>" + wagers.formatMoney(2) + "</td><td title='Ganado'>" + winnings.formatMoney(2) + "</td></tr>";
                    }
                    table += "</tbody></table></div>";
                    mpu({
                        title: 'Resumen de la sesión',
                        body: table,
                        onClose: () => {
                            logout();
                        }
                    });
                } else {
                    logout();
                }
            });
    }

    return {
        startTimeWeb1,
        lastSessionInfo,
        logout
    };
    
}

export function bindLogoutButtons() {
    let logoutButtons = document.querySelectorAll('[data-logout]');
    logoutButtons.forEach(function (button) {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            lastSessionInfo();
        });
    });
}

export default Session;
