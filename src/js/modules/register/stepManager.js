import { savePreregister } from "./preregister";
import validateRegister from "./validateRegister";

export default function stepManager() {
    const registerContent = document.querySelector('.register__content');
    let currentStep = parseInt(registerContent.dataset.currentStep);
    const nextBtn = document.querySelector('.register__action--next');
    const prevBtn = document.querySelector('.register__action--prev');

    nextBtn.addEventListener('click', async e => {
        e.preventDefault();
        const isValid = await validateRegister().validateStep(currentStep);
        if(!isValid) return;
        
        if(currentStep === 1) savePreregister();

        currentStep++;
        registerContent.dataset.currentStep = currentStep;
    });

    prevBtn.addEventListener('click', e => {
        e.preventDefault();
        currentStep--;
        registerContent.dataset.currentStep = currentStep;
    });
}