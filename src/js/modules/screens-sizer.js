export default function screensSizer() {
    const screensBar = document.querySelector('.screensBar');
    const screens = document.querySelector('.screens');

    window.addEventListener('load', resizeScreens);
    window.addEventListener('resize', resizeScreens);
    
    function resizeScreens() {
        let newHeight = 'auto';
        if(window.innerWidth > 1280) {
            newHeight = `calc(100vh - ${screensBar.offsetTop + screensBar.offsetHeight}px)`;
        }
        screens.style.height = newHeight;
    }
}