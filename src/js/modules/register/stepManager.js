import validateRegister from "./validateRegister";

export default function stepManager() {
    const registerWindow = document.querySelector('.register__window');
    let currentStep = parseInt(registerWindow.dataset.currentStep);
    const nextBtn = document.querySelector('.register__action--next');
    const prevBtn = document.querySelector('.register__action--prev');

    nextBtn.addEventListener('click', async e => {
        e.preventDefault();
        const isValid = await validateRegister().validateStep(currentStep);
        if(!isValid) return;
        
        if(currentStep === 1) savePreregister();

        currentStep++;
        registerWindow.dataset.currentStep = currentStep;
    });

    prevBtn.addEventListener('click', e => {
        e.preventDefault();
        currentStep--;
        registerWindow.dataset.currentStep = currentStep;
    });
}