export default function screensSizer() {
    const screensBar = document.querySelector('.screensBar');
    const screen = document.querySelector('.screen');
    const aside = document.querySelector('.asideSlots');

    window.addEventListener('load', resizeScreens);
    window.addEventListener('resize', resizeScreens);
    
    function resizeScreens() {
        let newHeight = 'auto';
        if(window.innerWidth > 1280) {
            newHeight = `calc(100vh - ${screensBar.offsetTop + screensBar.offsetHeight}px)`;
        }
        screen.style.height = newHeight;
        aside.style.height = newHeight;
    }
}