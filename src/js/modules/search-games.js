import algoliasearch from 'https://cdn.jsdelivr.net/npm/algoliasearch@4.14.2/dist/algoliasearch-lite.esm.browser.js';
import debounce from './debounce';

function searchGames() {

    const searchClient = algoliasearch('USEUDCDIBW', '38b0b3d7c092d72b7336390dee953fc8');
    const searchBox = document.querySelector('[algolia-search-box]');
    const searchResults = document.querySelector('[algolia-search-results]');
    const index = searchClient.initIndex('prod_RoomSlots');

    const debouncedOnInput = debounce((e) => onInput(e));
    
    searchBox.addEventListener('input', debouncedOnInput);

    async function onInput(e) {
        const value = e.target.value;
        if (value.length == 0) {
            searchResults.innerHTML = '';
            searchResults.classList.remove('search-results--active');
            return;
        }
        searchResults.classList.add('search-results--active');
        const games = await queryGames(e.target.value);
        parseResults(games)
    }

    async function queryGames(query) {
        const { hits } = await index.search(query, {
            hitsPerPage: 14,
        });

        return hits;
    }

    function parseResults(hits) {
        console.log(hits)
        let output = '<div class="search-results__content"><ul>';
        hits.forEach(hit => {
            output += `<li>
                            <a href="${hit.link}" class="search-result">
                                <img src="https://revamp.casinobarcelona.es${hit.thumb}" alt="${hit.name}" class="search-result__image">
                                <div class="search-result__info">
                                    <div class="search-result__name">${hit.name}</div>
                                    <div class="search-result__provider">${hit.provider}</div>
                                </div>
                            </a>
                        </li>`;
        });
        output += '</ul></div>';
        searchResults.innerHTML = output;
    }
}

export default searchGames;