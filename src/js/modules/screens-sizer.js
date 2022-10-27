export default function screensSizer() {
    const screensBar = document.querySelector('.screensBar');
    const screens = document.querySelector('.screens');
    const mobileBar = document.querySelector('.header__mobile--bottom');
    const screenOnline = document.querySelector('.screen--online');

    window.addEventListener('load', resizeScreens);
    window.addEventListener('resize', resizeScreens);
    
    function resizeScreens() {
        let newHeight = 'auto';
        let elementToResize = screens;
        console.log('resizing screens');
        
        if(window.innerWidth > 1280) {
            newHeight = `calc(100vh - ${screensBar.offsetTop + screensBar.offsetHeight}px)`;
        } else if(document.body.classList.contains('game-mode')) {
            console.log('game-mode');
            elementToResize = screenOnline;
            newHeight = `calc(100vh - ${screensBar.offsetTop + screensBar.offsetHeight + mobileBar.offsetHeight}px)`;
        }
        elementToResize.style.height = newHeight;
    }
}