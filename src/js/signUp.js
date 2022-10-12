const registryBlocks = document.querySelectorAll('.registry__block');
const registryStep1 = document.querySelector('.registry__step1');
const registryStep2 = document.querySelector('.registry__step2');
const registryStep3 = document.querySelector('.registry__step3');
const registryStep4 = document.querySelector('.registry__step4');
const registryStep2Btn = document.querySelectorAll('.registry__btnStep2');
const registryStep3Btn = document.querySelectorAll('.registry__btnStep3');
const registryStep4Btn = document.querySelectorAll('.registry__btnStep4');
const registryStep1BackBtn = document.querySelectorAll('.registry__btnStep1-back');
const registryStep2BackBtn = document.querySelectorAll('.registry__btnStep2-back');
const registryStep3BackBtn = document.querySelectorAll('.registry__btnStep3-back');

registryStep2Btn.forEach( (btn) => {
    btn.addEventListener('click', () => {
        registryBlocks.forEach( (block) => {
            block.classList.remove('active');
        });
        registryStep2.classList.add('active');
    });
})

registryStep3Btn.forEach( (btn) => {
    btn.addEventListener('click', () => {
        registryBlocks.forEach( (block) => {
            block.classList.remove('active');
        });
        registryStep3.classList.add('active');
    });
})

registryStep4Btn.forEach( (btn) => {
    btn.addEventListener('click', () => {
        registryBlocks.forEach( (block) => {
            block.classList.remove('active');
        });
        registryStep4.classList.add('active');
    });
})

registryStep1BackBtn.forEach( (btn) => {
    btn.addEventListener('click', () => {
        registryBlocks.forEach( (block) => {
            block.classList.remove('active');
        });
        registryStep1.classList.add('active');
    });
})

registryStep2BackBtn.forEach( (btn) => {
    btn.addEventListener('click', () => {
        registryBlocks.forEach( (block) => {
            block.classList.remove('active');
        });
        registryStep2.classList.add('active');
    });
})

registryStep3BackBtn.forEach( (btn) => {
    btn.addEventListener('click', () => {
        registryBlocks.forEach( (block) => {
            block.classList.remove('active');
        });
        registryStep3.classList.add('active');
    });
})