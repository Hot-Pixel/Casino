import { J as JustValidate } from './just-validate.es-0e317883.js';

const registryBlocks = document.querySelectorAll('.registry__block');
const registryStep1 = document.querySelector('.registry__step1');
const registryStep2 = document.querySelector('.registry__step2');
const registryStep3 = document.querySelector('.registry__step3');
const registryStep4 = document.querySelector('.registry__step4');
const registryStep2Btn = document.querySelector('.registry__btnStep2');
const registryStep3Btn = document.querySelector('.registry__btnStep3');
const registryStep4Btn = document.querySelector('.registry__btnStep4');
const registryStep1BackBtn = document.querySelector('.registry__btnStep1-back');
const registryStep2BackBtn = document.querySelector('.registry__btnStep2-back');
document.querySelector('.registry__btnStep3-back');

registryStep2Btn.addEventListener('click', () => {
    registryBlocks.forEach( (block) => {
        block.classList.remove('active');
    });
    registryStep2.classList.add('active');
});

registryStep3Btn.addEventListener('click', () => {
    registryBlocks.forEach( (block) => {
        block.classList.remove('active');
    });
    registryStep3.classList.add('active');
});

registryStep4Btn.addEventListener('click', () => {
    registryBlocks.forEach( (block) => {
        block.classList.remove('active');
    });
    registryStep4.classList.add('active');
});

registryStep1BackBtn.addEventListener('click', () => {
    registryBlocks.forEach( (block) => {
        block.classList.remove('active');
    });
    registryStep1.classList.add('active');
});

registryStep2BackBtn.addEventListener('click', () => {
    registryBlocks.forEach( (block) => {
        block.classList.remove('active');
    });
    registryStep2.classList.add('active');
});


const validation = new JustValidate(".stepOne__form", {
    errorFieldCssClass: "is-invalid",
    errorFieldStyle: {
      border: '1px solid #E99C00',
    },
    errorLabelCssClass: 'is-label-invalid',
    errorLabelStyle: {
      color: '#E99C00',
      fontSize: '12px',
      marginTop: '10px'
    },
  });

  validation
    .addField("#name", [
      {
        rule: "required",
        errorMessage: "Este campo es obligatorio",
      },
    ])
    .addField("#dni", [
      {
        rule: "customRegexp",
        value: '/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/',
        errorMessage: "El DNI debe contener 8 números y una letra",
      },
      {
        rule: "required",
        errorMessage: "Este campo es obligatorio",
      },
    ])
    .addField("#firstSurname", [
      {
        rule: "required",
        errorMessage: "Este campo es obligatorio",
      },
    ])
    .addField("#email", [
      {
        rule: "email",
        errorMessage: "No es un correo electrónico válido",
      },
      {
        rule: "required",
        errorMessage: "Este campo es obligatorio",
      },
    ])
    .addField("#secondSurname", [
      {
        rule: "required",
        errorMessage: "Este campo es obligatorio",
      },
    ])
    .addField("#phone", [
      {
        rule: "number",
        errorMessage: "El teléfono sólo puede contener números",
      },
      {
        rule: "required",
        errorMessage: "Este campo es obligatorio",
      },
    ]);
//# sourceMappingURL=signUp.js.map
