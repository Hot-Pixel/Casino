const LobbyApi = () => {
    const API_URL = 'https://api.casinobarcelona.es/api';
    const selector = ".lobby-api";
    const elements = document.querySelectorAll(selector);
    if(!elements) return;

    elements.forEach(element => {
        //preFetchApi(element);
        fetchApi(element);
    });

    function preFetchApi(element) {
        element.innerHTML = `Cargando`;
    }

    function fetchApi(element) {
        const filters = JSON.parse(element.dataset.filters);
        const filtersString = new URLSearchParams(filters).toString();
        fetch(`${API_URL}/rooms?${filtersString}`, { 'headers': { 'Accept': 'application/json' } })
            .then(response => response.json())
            .then(data => {
                renderData(element, data);
            })
            .catch(error => {
                element.innerHTML = `${error}`;
            })
            .finally(() => {
                postFetchApi(element);
            });
    }

    function postFetchApi(element) {
    }

    function getTemplate() {
        const itemTpl = document.getElementById('tpl-lobby-item');
        if (!itemTpl) return false;
        return itemTpl.content.cloneNode(true);
    }
    
    function renderData(element, rooms) {

        const roomsHtml = rooms.map(room => {
            const item = getTemplate();

            item.dataset.gameId = room.room_id;
            item.querySelector('.item__image').src = room.name.toLowerCase().replace(/ /g, '-').replace(/'/g, '').replace(/"/g, '').replace(/:/g, '').replace('---', '-') + '.webp';
            return item;
        }).join('');
        element.innerHTML = roomsHtml;
    }
}
LobbyApi();