export default function screensSizer() {
    const screensBar = document.querySelector('.screensBar');
    const screens = document.querySelector('.screens');
    const screenElms = document.querySelectorAll('.screen');
    const mobileBar = document.querySelector('.header__mobile--bottom');
    const screenOnline = document.querySelector('.screen--online');

    window.addEventListener('load', resizeScreens);
    window.addEventListener('resize', resizeScreens);

    function resizeScreens() {
        let newHeight = 'auto';
        let elementToResize = screens;

        const headerHeight = screensBar.offsetTop + screensBar.offsetHeight;

        if (window.innerWidth > 1280) {
            newHeight = `calc(100vh - ${headerHeight}px)`;
        } else if (document.body.classList.contains('game-mode')) {
            elementToResize = screenOnline;
            newHeight = `calc(100vh - ${headerHeight + mobileBar.offsetHeight}px)`;
        }
        screenElms.forEach(screen => {
            screen.style.height = newHeight;
            screen.style.top = `${screensBar.offsetTop}px`;
        });
    }
}