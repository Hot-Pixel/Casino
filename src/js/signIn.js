import JustValidate from "just-validate";

const recoverBtn = document.querySelector(".login__recoverBtn");
const loginBlocks = document.querySelectorAll(".login__block");
const loginSignIn = document.querySelector(".login__signIn");
const loginRecover = document.querySelector(".login__recover");

recoverBtn.addEventListener("click", () => {
  loginBlocks.forEach((block) => {
    block.classList.remove("active");
  });
  loginRecover.classList.add("active");
});

const nameValue = document.querySelector('input[name="user"]').value;
const passValue = document.querySelector('input[name="password"]').value;

console.log(nameValue);

const validation = new JustValidate(".login__form", {
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
  .addField("#user", [
    {
      rule: "minLength",
      value: 5,
      errorMessage: "Requiere mínimo 5 caracteres",
    },
    {
      rule: "maxLength",
      value: 20,
      errorMessage: "No puede tener más de 20 caracteres",
    },
    {
      rule: "required",
      errorMessage: "Este campo es obligatorio",
    },
  ])
  .addField("#password", [
    {
      rule: "password",
      errorMessage: "La contraseña debe estar formada por al menos una letra y un número",
    },
    {
      rule: "required",
      errorMessage: "Este campo es obligatorio",
    },
  ]);
