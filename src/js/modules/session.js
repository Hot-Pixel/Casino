
function Session() {
    let init;
    let quering = false;
    let sessionEls = document.querySelectorAll('.sessionTime');

    function startTimeWeb1(delay) {
        init = new Date().getTime() - delay;
        let t = setTimeout(function () { startTimeWeb() }, 1000);

        window.addEventListener('focus', function () {
            console.log('Focus');
            verificaInactividad();
        });
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
                if (data.status == 'ok') {
                    console.log('Result ' + data.result);
                    quering = false;
                    if (!data.result) {
                        mpu('/inactividadWeb.htm');
                    }
                } else {
                    console.log('Error ' + data.error);
                    quering = false;
                }
            })
            .catch(err => {
                console.log(err);
                quering = false;
            });
    }

    function lastSessionInfo() {
        window.open('/logout.jsp', '_self');
    }

    return {
        startTimeWeb1,
        lastSessionInfo
    };

}

export default Session;