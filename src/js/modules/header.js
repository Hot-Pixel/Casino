const popUpCloseBtn = document.querySelector('.popUpBalance__closeBtn');
const popUpOpenBtn = document.querySelector('.popUpBalance__openBtn');
const popUpMenu = document.querySelector('.popUpBalance');

const popUpAction = () => {
    popUpOpenBtn.addEventListener('click', () => {
        popUpMenu.getElementsByClassName.display = 'block';
    })

    popUpCloseBtn.addEventListener('click', () => {
        popUpMenu.getElementsByClassName.display = 'none';
    })
}

export default popUpAction;