function LiveRoulette() {
    const API_URL = 'https://api.casinobarcelona.es';

    const numbers = {
        '0': { color: 'green' },
        '1': { color: 'red' },
        '2': { color: 'black' },
        '3': { color: 'red' },
        '4': { color: 'black' },
        '5': { color: 'red' },
        '6': { color: 'black' },
        '7': { color: 'red' },
        '8': { color: 'black' },
        '9': { color: 'red' },
        '10': { color: 'black' },
        '11': { color: 'black' },
        '12': { color: 'red' },
        '13': { color: 'black' },
        '14': { color: 'red' },
        '15': { color: 'black' },
        '16': { color: 'red' },
        '17': { color: 'black' },
        '18': { color: 'red' },
        '19': { color: 'red' },
        '20': { color: 'black' },
        '21': { color: 'red' },
        '22': { color: 'black' },
        '23': { color: 'red' },
        '24': { color: 'black' },
        '25': { color: 'red' },
        '26': { color: 'black' },
        '27': { color: 'red' },
        '28': { color: 'black' },
        '29': { color: 'black' },
        '30': { color: 'red' },
        '31': { color: 'black' },
        '32': { color: 'red' },
        '33': { color: 'black' },
        '34': { color: 'red' },
        '35': { color: 'black' },
        '36': { color: 'red' },
    };
    
    fetchResultsFromAPI();
    startRealTimeUpdates();   
    
    function fetchResultsFromAPI() {
        fetch(`${API_URL}/api/lobby_roulettes`, { headers: { 'accept': 'application/json' } })
            .then(res => res.json())
            .then(data => {
                data.forEach(lobby => {
                    processEvent(lobby, "updateResults");
                    processEvent(lobby, "updateDealer");
                    processEvent(lobby, "updatePlayers");
                })
            })
    }
    
    function startRealTimeUpdates() {
        fetch(`${API_URL}/websocket/discover`).then(response => {
            const hubUrl = response.headers.get('Link').match(/<([^>]+)>;\s+rel=(?:mercure|"[^"]*mercure[^"]*")/)[1];
            const hub = new URL(hubUrl);
            hub.searchParams.append('topic', '/playtech_roulette_results');
    
            const eventSource = new EventSource(hub);
            eventSource.addEventListener("updateResults", function(e) {
                processEvent(JSON.parse(e.data), "updateResults");
            })
            eventSource.addEventListener("updateDealer", function(e) {
                processEvent(JSON.parse(e.data), "updateDealer");
            })
            eventSource.addEventListener("updatePlayers", function(e) {
                processEvent(JSON.parse(e.data), "updatePlayers");
            })
        });
    }
    
    function processEvent(event, type) {
        //Object to array
        event.casinoIds = Object.keys(event.casinoIds).map((key) => event.casinoIds[key]);
    
        for (var i = 0; i < event.casinoIds.length; i++) {
            var casinoId = event.casinoIds[i];
            var rouletteElm = document.querySelector('[data-lobby-id="' + casinoId + '"]');
            if(!rouletteElm) return;

            switch (type) {
                case "updateResults":
                    processLastResults(event, rouletteElm);
                    break;
                case "updateDealer":
                    processDealer(event, rouletteElm);
                    break;
                case "updatePlayers":
                    processActiveUsers(event, rouletteElm);
                    break;
                default:
                    break;
            }
            // processLimits(event, rouletteElm);
            // processProvider(event, rouletteElm);
        }
    }
    
    function processLastResults(data, element)  {
        let resultOutput = "";
        resultOutput += `<div class='ruletaResult ruletaResult--${numbers[data.lastResult].color}'>${data.lastResult}</div>`;
        for (let i = 0; i < 3; i++) {
            const result = data.lastResults[i];
            resultOutput += `<div class='ruletaResult ruletaResult--${numbers[result].color}'>${result}</div>`;
        }
        element.querySelector('.ruletaResultWrapper').innerHTML = resultOutput;
    }
    
    function processActiveUsers(data, element) {
        if(data.playersOnline === 0) return false;

        const usersWrapperEl = element.querySelector('.users');
        const usersValEl = element.querySelector('.users-value');
        usersWrapperEl.classList.remove('d-none')
        usersValEl.innerHTML = data.playersOnline;
    } 
    
    function processDealer(data, element) {
        const dealerNameEl = element.querySelector('.card__croupier');
        const dealerImageEl = element.querySelector('.card__img-crupier');

        if (!data.dealerName || data.dealerName === "Auto" || data.dealerName === "Quantum Automatica") {    
            dealerNameEl.innerHTML = "";
            return false;
        }    
        
        // Ignore if new dealer is same as current
        if(dealerNameEl.text === data.dealerName) return false;
        
        if (data.dealerImage) {
            dealerImageEl.src = data.dealerImage;
        } 
        
        /*Default dealer image personalizada para Ruleta Lightning*/
        if (!data.dealerImage && data.evolutionId === "LightningSpain01") {
            dealerImageEl.src = "/img/ruleta/pareja_lightning.png";
        }

        /*Default dealer image personalizada para Ruleta Bola Rápida en Vivo*/
        else if (!data.dealerImage && data.evolutionId === "oqa3v7a2t25ydg5e") {
            dealerImageEl.src = "/img/ruleta/pareja2.png";
        }

        /*Si no hay dealer y es de Evolution, poner imagen defaultDealer*/
        else if (!data.dealerImage && data.evolutionId) {
            dealerImageEl.src = "/img/ruleta/pareja1.png";
        }     

        /*Default image para Playtech*/
        else if (!data.dealerImage && data.dealerName) {
            dealerImageEl.src = "/img/ruleta/crupiers_playtech.png";
        }

        /*Hide Dealer Name if = 'Ruleta Relámpago*/
        if(data.dealerName === "Ruleta Relámpago") {
            data.dealerName = ""
        }
    
        dealerNameEl.text = data.dealerName;
    }
    
    function processLimits(data, element) {
        if(data.limitFrom < 1) {
            return false;
        }
        const formatter = new Intl.NumberFormat('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        element.find('.limits').removeClass('hidden');
        element.find('.limits-from .value').text(formatter.format(data.limitFrom / 100));
        element.find('.limits-to .value').text(formatter.format(data.limitTo / 100));
    }
    
    function processProvider(data, element) {
        if(data.playtechId) element.addClass('playtech')
        if(data.evolutionId) element.addClass('evolution')
    }
}

export default LiveRoulette;