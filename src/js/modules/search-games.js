import algoliasearch from 'https://cdn.jsdelivr.net/npm/algoliasearch@4.14.2/dist/algoliasearch-lite.esm.browser.js';

function searchGames() {

    const searchClient = algoliasearch('USEUDCDIBW', '38b0b3d7c092d72b7336390dee953fc8');
    const searchBox = document.querySelector('[algolia-search-box]');
    const searchResults = document.querySelector('[algolia-search-results]');
    const index = searchClient.initIndex('prod_RoomSlots');

    searchBox.addEventListener('input', async (e) => {
        const value = e.target.value;
        if(value.length == 0) {
            searchResults.innerHTML = '';
            searchResults.classList.remove('search-results--active');
            return;
        } 
        searchResults.classList.add('search-results--active');
        const games = await queryGames(e.target.value);
        console.log(games)
        parseResults(games)
    });
    
    async function queryGames(query) {
        const { hits } = await index.search(query, {
            hitsPerPage: 10,
        });

        return hits;
    }
    
    function parseResults(hits) {
        console.log(hits)
        let output = '<ul>';
        hits.forEach(hit => {
            output += `<li><a href="${hit.link}"><img src="https://revamp.casinobarcelona.es${hit.thumb}" alt="${hit.name}"></a></li>`;
        });
        output += '</ul>';
        searchResults.innerHTML = output;
    }
}


export default searchGames;