import algoliasearch from 'https://cdn.jsdelivr.net/npm/algoliasearch@4.14.2/dist/algoliasearch-lite.esm.browser.js';
import dataLayer from './dataLayer';
import debounce from './debounce';

function searchGames() {

    const searchClient = algoliasearch('USEUDCDIBW', '38b0b3d7c092d72b7336390dee953fc8');
    const INDEX_NAME = 'prod_RoomSlots';
    const searchBox = document.querySelector('[algolia-search-box]');
    const searchResults = document.querySelector('[algolia-search-results]');
    const searchResultsList = searchResults.querySelector('.search-results__content');
    const searchResultsCount = searchResults.querySelector('#search-count');
    const searchResultsQuery = searchResults.querySelector('#search-query');
    const index = searchClient.initIndex(INDEX_NAME);

    const debouncedOnInput = debounce((e) => onInput(e));
    
    searchBox.addEventListener('input', debouncedOnInput);

    async function onInput(e) {
        const value = e.target.value;
        if (value.length == 0) {
            searchResultsList.innerHTML = '';
            searchResults.classList.remove('search-results--active');
            return;
        }
        searchResults.classList.add('search-results--active');
        const queryResponse = await queryGames(e.target.value);
        parseResults(queryResponse);
        dataLayer.push({ event: 'Hits Viewed' });
    }

    async function queryGames(query) {
        const response = await index.search(query, {
            userToken: player ? player.id : 0,
            clickAnalytics: true,
            hitsPerPage: 14,
        });

        return response;
    }

    function parseResults({ hits, nbHits, query, queryID }) {
        searchResultsCount.innerHTML = nbHits;
        searchResultsQuery.innerHTML = `"${query}"`;
        let output = `<ul data-insights-index="${INDEX_NAME}">`;
        hits.map((hit, arrayIndex) => {
            output += `<li>
                            <a 
                                data-algolia-hit
                                data-insights-object-id="${hit.objectID}"
                                data-insights-position="${arrayIndex + 1}"
                                data-insights-query-id="${queryID}"
                                href="${hit.link}" class="search-result">
                                <img src="https://revamp.casinobarcelona.es${hit.thumb}" alt="${hit.name}" class="search-result__image">
                                <div class="search-result__info">
                                    <div class="search-result__name">${hit._highlightResult.name.value}</div>
                                    <div class="search-result__provider">${hit._highlightResult.provider.value}</div>
                                </div>
                            </a>
                        </li>`;
        });
        output += '</ul>';
        searchResultsList.innerHTML = output;
    }
}

export default searchGames;