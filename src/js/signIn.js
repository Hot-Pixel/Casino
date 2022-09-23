const recoverBtn = document.querySelector('.login__recoverBtn');
const loginBlocks = document.querySelectorAll('.login__block');
const loginSignIn = document.querySelector('.login__signIn')
const loginRecover = document.querySelector('.login__recover')

console.log(loginRecover)

recoverBtn.addEventListener('click', () => {
    loginBlocks.forEach( (block) => {
        block.classList.remove('active');
    });
    loginRecover.classList.add('active');
});