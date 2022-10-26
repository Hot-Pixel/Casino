import { setFavStatus } from "./favHeart";

export default function gameLauncher() {
    const playBtns = document.querySelectorAll('.play-btn');
    const demoBtns = document.querySelectorAll('.demo-btn');
    const heartBtn = document.querySelector('#fav__btn');
    const maximizeBtn = document.querySelector('#maximize__btn');
    const minimizeBtn = document.querySelector('#minimize__btn');
    const closeBtn = document.querySelector('#close__btn');
    const gameIframe = document.querySelector('#gameIframe');
    const toggleAside = document.querySelector('#toggle-aside__btn');
    const screens = document.querySelector('.screens');

    playBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            startGame();
        });
    });

    demoBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            startGame(true);
        });
    });

    heartBtn.addEventListener('click', e => {
        heartBtn.classList.toggle('active');
        setFavStatus(e.target.dataset.gameId, heartBtn.classList.contains('active'));
    });

    maximizeBtn.addEventListener('click', () => {
        maximize();
    });

    minimizeBtn.addEventListener('click', () => {
        minimize();
    });

    closeBtn.addEventListener('click', () => {
        closeGame();
    });

    toggleAside.addEventListener('click', () => {
        toggleAside.classList.toggle('open');
        screens.classList.toggle('aside-open');
        triggerResize();
    });

    function startGame(demo = false) {
        document.body.classList.add('game-mode');
        if (demo) document.body.classList.add('game-mode--demo');
        triggerResize();
        gameIframe.src = "https://atoom.space";
    }
    
    function closeGame() {
        document.body.classList.remove('game-mode', 'game-mode--demo', 'game-mode--maximized');
        gameIframe.src = "";
    }

    function maximize() {
        document.body.classList.add('game-mode--maximized');
        window.dispatchEvent(new Event('resize'));
        triggerResize();
    }
    
    function minimize() {
        document.body.classList.remove('game-mode--maximized');
        triggerResize();
    }

    function triggerResize() {
        window.dispatchEvent(new Event('resize'));
    }

}